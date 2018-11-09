let Config = require('../config');
let request = require('../../common/request');
let loggerObj = require('../../../utils/logger');//log日志记录
let Logger = loggerObj.wechat;
let CustomService ={
	//创建会话
	createChat: (param) => {
		return new Promise((resolve, reject)=> {
			let url = '/cgi-bin/appchat/create?access_token=' + global.APP_TOKEN;
			request.postHttps('qyapi.weixin.qq.com',url,param).then((result) =>{
				Logger.info(result);
			    if (result && result.errcode==Config.APP_SUCCESS) {
			        resolve(result);
			    }else{
			    	reject(result);
			    }
			}).catch((err)=>{
				Logger.info(err);
				reject(err)
			})
		})
	},
	//获取群会话
	getChat: (chatid) => {
		return new Promise((resolve, reject)=> {
			let url = 'https://qyapi.weixin.qq.com/cgi-bin/appchat/get?access_token='+Config.APP_TOKEN+'&chatid='+chatid;
			request.getHttp(url).then((result) => {
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
	//推送消息
	sendChat: (param) => {
		return new Promise((resolve, reject)=> {
			let url = '/cgi-bin/appchat/send?access_token=' + global.APP_TOKEN;
			Logger.info(url);
			Logger.info(param);
			request.postHttps('qyapi.weixin.qq.com',url,param).then((result) =>{
				Logger.info(result);
			    if (result && result.errcode==Config.APP_SUCCESS) {
			        resolve(result);
			    }else{
			    	reject(result);
			    }
			}).catch((err)=>{
				Logger.info(err);
				reject(err)
			})
		})
	},


	
}
module.exports = CustomService;