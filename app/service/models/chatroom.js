let request = require('../../common/request');
let Chat = require('../../work/models/chat');
let Tool = require('../../../utils/tool');
let Config = require('../config');
//处理返回结果
function formatResult(rsArray) {
    let result={
    	errcode :'200',
    	errmsg :'success',
    	data: rsArray
    }   
    return result;
}
function formatErr(rsArray) {
    let result={
    	errcode :'0',
    	errmsg :'fail',
    	data: rsArray
    }   
    return result;
}
let Chatroom ={
	getChatDetail: (param) => {
		return new Promise((resolve, reject)=> {
			Chat.findUserChat(param).then(data=>{
				resolve(formatResult(data));
			}).catch(err=>{
				reject(formatErr(err))
			})
		})
	},
	getChatUserList: () => {
		return new Promise((resolve, reject)=> {
			Chat.findChatList().then(info=>{
				if(!info.length) resolve(formatResult(info))
				let j=0;
				for(let i=0;i<info.length;i++){
	        		Chat.findUserLastestNews({userId:info[i].FromUserId},i).then((result)=>{
	        			info[i].CreateTime=result[0].CreateTime;
	        			info[i].PicUrl= result[0].PicUrl;
	        			info[i].MsgType=result[0].MsgType;
	        			info[i].Content= result[0].Content;
	        			if(j == info.length-1) {
	        				resolve(formatResult(info))
	        			}
	        			j+=1;
	        		}).catch(()=>{
	        			resolve(formatResult(info))
	        		})
	        	}
			}).catch(err=>{
				reject(formatErr(err))
			})
		})
	},
	setChatOrder: (param) => {
		return new Promise((resolve, reject)=> {
			let searchObj = {
				userId:param.ToUserId,
				time:param.CreateTime,
				isPast:true
			}
			Chat.findUserChat(searchObj).then(data=>{
				if(data && data.length){
					Chatroom.createOrder(param,data).then((result)=>{
						param.Content='工单已创建：'+result.orderNo;
						param.CreateTime = Tool.formatTime(new Date());
						Chat.addChat(param)
						resolve(result)
					})
				}else{
					reject(formatErr('没有聊天记录无法创建工单'))
				}
			}).catch(err=>{
				reject(formatErr(err))
			})

			
		})
	},
	createOrder: (param,collections) => {
		return new Promise((resolve, reject)=> {
			let timestamp = (new Date().getTime()) + '',
				userCode = param.FromUserId,
				keyCode = 'spdPortal';
			let verification = Tool.getmd5(userCode+timestamp+keyCode);
			let url= '/module-workflow/workorder/order/wxSave?timestamp='+timestamp+'&userCode='+userCode+'&verification='+verification,htmlStr='';
			collections.map((item,index)=>{
				if(item.MsgType=='text'){
					htmlStr+=`<div><p>${item.CorpID?'':'运维-'}${item.FromUserName}：${item.Content}</p></div>`
				}else if(item.MsgType=='image') {
					htmlStr+=`<div><p>${item.CorpID?'':'运维-'}${item.FromUserName}：</p><p><img src="${Config.ORDER_PICURL+item.PicPath.substr(9)}" style="height:40px;"/></p></div>`
				}
			})
			let data={
				applicantName:param.ToUserName,
				questionInfo:htmlStr,
				title:'运维达人-'+Tool.formatTime(new Date())
			}
			console.log(data)
			request.postHttp(Config.ORDER_IP,url,data,Config.ORDER_PORT).then((result) =>{
			    if (result && result.errcode=='200') {
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

module.exports = Chatroom;