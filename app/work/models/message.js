let Config = require('../config');
Config.APP_TOKEN=global.APP_TOKEN;
let request = require('../../common/request');
let wxCrypto = require('../../common/wxCrypto');
let Chat = require('./chat'),
	ChatRoom = require('../../service/models/chatroom');
let loggerObj = require('../../../utils/logger');//log日志记录
let Logger = loggerObj.wechat;
let Tool = require('../../../utils/tool');
let Message ={
	//模板推送消息
	sendMsg: (sendData) => {
		return new Promise((resolve, reject)=> {
			let url = '/cgi-bin/message/send?access_token=' + Config.APP_TOKEN;
			let data = {
			   "touser": sendData.frId,
			   "msgtype": "text",
			   "agentid": Config.AGENT_ID,
			   "text": {
			   		"content":sendData.title+"\n"+sendData.content+"\n"+sendData.createTime+"\n<a href=\""+sendData.templateUrl+"\">查看详情</a>",		            
			   },
			   "safe":0
			}
			request.postHttps('qyapi.weixin.qq.com',url,data).then((result) =>{
			    if (result && result.errcode==Config.APP_SUCCESS) {
			        resolve(result);
			    }else{
			    	reject(result);
			    }
			}).catch((err)=>{
				reject(err)
			})
		})
	},
	/**运维达人应用专属接口**/
	//获取运维达人应用ACCESS_TOKEN
	getAgentAccessToken: () => {
		return new Promise((resolve, reject)=> {
			let url = 'https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=' + Config.S_ID + '&corpsecret=' +Config.S_SECRET;
			let currentTime = new Date().getTime();
			if (Config.Agent_TOKEN && Config.Agent_TokenTime && currentTime <= Config.Agent_TokenTime + 7200 * 1000) {
			    resolve(Config.Agent_TOKEN);
			    return;
			}
			request.getHttps(url).then((result) =>{
			    if (result && result.errcode==Config.APP_SUCCESS) {
			        Config.Agent_TOKEN = result.access_token;
			        Config.Agent_TokenTime = currentTime;
			        resolve(Config.Agent_TOKEN);
			    }else{
			    	reject(result);
			    }
			}).catch((err)=>{
				reject(err)
			})
		})
	},
	getUserInfo: (userid) => {
		return new Promise((resolve, reject)=> {
			request.getHttps('https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token='+Config.Agent_TOKEN+'&userid='+userid).then((result) =>{
			    if (result && result.errcode==Config.APP_SUCCESS) {
			        resolve(result);
			    }else{
			    	reject(result);
			    }
			}).catch((err)=>{
				reject(err)
			})
		})
	},
	getUserDepartment: (did) => {
		return new Promise((resolve, reject)=> {
			request.getHttps('https://qyapi.weixin.qq.com/cgi-bin/department/list?access_token='+Config.Agent_TOKEN+'&id='+did).then((result) =>{
			    if (result && result.errcode==Config.APP_SUCCESS) {
			    	console.log(result.department)
			        resolve(result.department[0]);
			    }else{
			    	reject(result);
			    }
			}).catch((err)=>{
				reject(err)
			})
		})
	},
	//获取服务器信息
	getMsg: (msg) => {
		return new Promise((resolve, reject)=> {
			let wx = new wxCrypto();
			let message = wx.decrypt(msg.Encrypt)
			let MsgType = getXMLNodeValue('MsgType',message);
			console.log('MsgType:'+MsgType)
			let datajson={
				CorpID:getXMLNodeValue('ToUserName',message),//企业微信CorpID
				FromUserId:getXMLNodeValue('FromUserName',message),//成员UserID
				//CreateTime:Tool.formatTime(new Date((getXMLNodeValue('CreateTime',message,true)-0)*1000)),
				CreateTime:Tool.formatTime(new Date()),
				MsgType:getXMLNodeValue('MsgType',message),
				MsgId:getXMLNodeValue('MsgId',message,true),
				Platform:'wxwork'
			}
			if(MsgType=='text'){
				datajson.Content=getXMLNodeValue('Content',message);
			}else if(MsgType=='image'){
				datajson.PicUrl=getXMLNodeValue('PicUrl',message);
				datajson.MediaId=getXMLNodeValue('MediaId',message);
			}else{
				let xmlstr=`<xml><ToUserName><![CDATA[${datajson.FromUserId}]]></ToUserName><FromUserName><![CDATA[${datajson.CorpID}]]></FromUserName><CreateTime>${getXMLNodeValue('CreateTime',message,true)}</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[暂支持图片，文字格式]]></Content></xml>`
				datajson.Content='暂时只支持图片文字格式';
				datajson.MsgType='text'
				Message.autoReplyMsg(datajson);
				resolve({
					errcode:'100',
					errmsg:'not support now',
					data:'暂时只支持图片文字格式',
					xml:xmlstr
				})
				return;
			}
			Message.getUserInfo(datajson.FromUserId).then(result=>{
				datajson.FromUserName = result.name;
				datajson.FromUserAvatar = result.avatar;
				datajson.FromUserMobile = result.mobile;
				Message.getUserDepartment(result.department[0]).then(departmentInfo=>{
					datajson.FromUserDepartment = departmentInfo.name;
					Chat.addChat(datajson).then(()=>{
						//下载网络图片到本地
						if(datajson.PicUrl){
							request.getPicToBase64(datajson.PicUrl).then((rs) =>{
							    if (rs && rs.errcode==Config.APP_SUCCESS) {
							    	let filepath = "./public/images/"+Tool.formatDate(new Date())+"/"+datajson.FromUserId+"_"+datajson.CreateTime.substr(11)+".png";
							        Message.downMedia(filepath,rs.data)
							        Chat.updateChat(datajson,rs.data,filepath)
							    }
							}).catch((err)=>{})
						}
					})
				})
			}).catch(err=>{})
			resolve({
				errcode:Config.APP_SUCCESS,
				errmsg:'success',
				data:datajson
			})
		})
	},
	//校验服务器信息
	validMsg: (msg) => {
		return new Promise((resolve, reject)=> {
			let wx = new wxCrypto();
			let message = wx.decrypt(msg.echostr)
			resolve(message)
		})
	},
	replyMsg: (sendData) => {
		return new Promise((resolve, reject)=> {
			let url = '/cgi-bin/message/send?access_token=' + Config.Agent_TOKEN;
			let data = {
			   "touser": sendData.ToUserId,
			   "agentid": Config.S_AID,
			   "safe":0
			}
			sendData.CreateTime=Tool.formatTime(new Date());
			if(sendData.MsgType=="text"){
				data["msgtype"] = "text";
				data["text"]={
					"content" : sendData.Content
				}
				if(sendData.Content=='创建工单'){
					Chat.addChat(sendData);
					ChatRoom.setChatOrder(sendData).then(rs=>{
						sendData.Content = '已生成工单：'+ rs.orderNo
						Message.replyMsg(sendData);
						resolve(rs)
					})
					return;
				}
			}
			if(sendData.MsgType=="image"){
				data["msgtype"] = "image";
				Message.uploadMedia(sendData).then(rs=>{
					data["image"]={
						"media_id" : rs.media_id
					}
					sendData.PicPath=rs.filepath;
					request.postHttps('qyapi.weixin.qq.com',url,data).then((result) =>{
					    if (result && result.errcode==Config.APP_SUCCESS) {
					    	Chat.addChat(sendData);
					        resolve(result);
					    }else{
					    	reject(result);
					    }
					}).catch((err)=>{
						reject(err)
					})
					
				}).catch()
				return;
			}

			request.postHttps('qyapi.weixin.qq.com',url,data).then((result) =>{
			    if (result && result.errcode==Config.APP_SUCCESS) {
			    	Chat.addChat(sendData);
			        resolve(result);
			    }else{
			    	reject(result);
			    }
			}).catch((err)=>{
				reject(err)
			})
		})
	},
	autoReplyMsg: (sendData) => {
		return new Promise((resolve, reject)=> {
			let url = '/cgi-bin/message/send?access_token=' + Config.Agent_TOKEN;
			let data = {
			   "touser": sendData.FromUserId,
			   "agentid": Config.S_AID,
			   "safe":0
			}
			sendData.CreateTime=Tool.formatTime(new Date());
			if(sendData.MsgType=="text"){
				data["msgtype"] = "text";
				data["text"]={
					"content" : sendData.Content
				}
			}
			request.postHttps('qyapi.weixin.qq.com',url,data).then((result) =>{
			    if (result && result.errcode==Config.APP_SUCCESS) {
			        resolve(result);
			    }else{
			    	reject(result);
			    }
			}).catch((err)=>{
				reject(err)
			})
		})
	},
	uploadMedia: (sendData) => {
		return new Promise((resolve, reject)=> {
			let _today = Tool.formatDate(new Date()),imgData=sendData.PicUrl;
			let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
			let dataBuffer = new Buffer(base64Data, 'base64');
			let filepath = "./public/images/"+_today+"/"+sendData.FromUserId+"_"+sendData.CreateTime.substr(11)+".png";
			writeFile(filepath,dataBuffer,(err)=>{
				if(err){
				 	console.log(err)
				 	reject(err)
				}else{
					console.log("保存图片成功！");
					uploadToWechat(filepath,sendData.FromUserId+"_"+sendData.CreateTime.substr(11)+".png").then((result)=>{
						result.filepath=filepath;
						resolve(result)
					}).catch((e)=>{
						reject(e)
					})

				}
			})
		})
	},
	downMedia: (filepath,base64)=>{
		let base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
		let dataBuffer = new Buffer(base64Data, 'base64');
		writeFile(filepath,dataBuffer,(err)=>{
			if(err){
			 	console.log(err)
			}else{
				console.log("保存图片成功！");
			}
		})

	}

}
var mkdirp = require('mkdirp');
var fs = require('fs');
var getDirName = require('path').dirname;

function writeFile(path, contents, cb) {
  mkdirp(getDirName(path), function (err) {
    if (err) return cb(err);
    fs.writeFile(path, contents, cb);
  });
}

function uploadToWechat(filepath,filename) {
	return new Promise((resolve, reject)=> {
		let rq = require('request');
		rq.post({
			url:'https://qyapi.weixin.qq.com/cgi-bin/media/upload?access_token=' + Config.Agent_TOKEN+'&type=image', 
			formData: {
				buffer: {
					value: fs.readFileSync(filepath),
				    options: {
				      filename:filename,
				      contentType: 'image/png'
				    }
				}
			}
		}, function optionalCallback(err, httpResponse, result) {
		  if (err) {
		  	reject(err);
		  }
		  resolve(JSON.parse(result));
		})
	})

}

function getXMLNodeValue(node_name,xml,NoCDATA){
	xml=xml+'';
    let tmp = xml.split("<"+node_name+">");
    let _tmp = tmp[1].split("</"+node_name+">");
    if(NoCDATA) return _tmp[0];
    let con =_tmp[0].split("![CDATA[")[1];
    let _con = con.substring(0,con.length-3)
    return _con;
}
module.exports = Message;