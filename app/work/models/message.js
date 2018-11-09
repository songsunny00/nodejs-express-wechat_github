let Config = require('../config');
Config.APP_TOKEN=global.APP_TOKEN;
let request = require('../../common/request');
// let loggerObj = require('../../../utils/logger');//log日志记录
// let Logger = loggerObj.wechat;
let Message ={
	//模板推送消息
	sendMsg: (sendData) => {
		return new Promise((resolve, reject)=> {
			let url = '/cgi-bin/message/send?access_token=' + Config.APP_TOKEN;
			let data = {
			   "touser": sendData.frId,
			   "msgtype": "news",
			   "agentid": 1000003,
			   "news": {
			       "articles":[
			           {
			               "title": sendData.title+"  "+sendData.taskName,
			               // "thumb_media_id":"7599825869194530",
			               // "author":sendData.handleName,
			               // "content_source_url":sendData.templateUrl,
			               // "content":"任务名称:"+sendData.taskName+"/n当前办理人:"+sendData.handleName+"/n创建时间:"+sendData.createTime,
			               // "digest":sendData.remark?sendData.remark:""
			               "description": " 当前办理人:"+sendData.handleName+" 创建时间:"+sendData.createTime,
			               "url": sendData.templateUrl
			           }  
			       ]
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
	}
	
}
module.exports = Message;