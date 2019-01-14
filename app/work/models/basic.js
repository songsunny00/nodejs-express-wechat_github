let Config = require('../config'),
	crypto = require('crypto'),
	request = require('../../common/request');
let wxCrypto = require('../../common/wxCrypto');
let loggerObj = require('../../../utils/logger');//log日志记录
let Logger = loggerObj.wechat;
let time = 7200 * 1000,getTokenResult,getTicketResult;
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//日期格式处理
function formatDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('-');
}

function getTimesTamp() {
  return parseInt(new Date().getTime() / 1000) + '';
}

function getNonceStr() {
  return Math.random().toString(36).substr(2, 15);
}
let Basic ={
	//获取企业微信应用ACCESS_TOKEN
	getWorkAccessToken: () => {
		return new Promise((resolve, reject)=> {
			let url = 'https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=' + Config.APP_ID + '&corpsecret=' + Config.AGENT_SECRET;
			let currentTime = new Date().getTime();
			if (Config.APP_TOKEN && Config.APP_TokenTime && currentTime <= Config.APP_TokenTime + time) {
			    resolve(getTokenResult);
			    return;
			}
			request.getHttps(url).then((result) =>{
			    if (result && result.errcode==Config.APP_SUCCESS) {
			    	getTokenResult = result;
			        Config.APP_TOKEN = result.access_token;
			        global.APP_TOKEN = result.access_token;
			        Config.APP_TokenTime = currentTime;
			        resolve(result);
			    }else{
			    	reject(result);
			    }
			}).catch((err)=>{
				reject(err)
			})
		})
	},
	//获取微信用户userId 
	getWorkUserId:(code) => {
		return new Promise((resolve, reject)=> {
			let url = 'https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token='+Config.APP_TOKEN+'&code='+code;
			request.getHttps(url).then((result) => {
			    if (result && result.errcode==Config.APP_SUCCESS) {
			    	Logger.info('user_id:'+result.UserId);
			    	Logger.info(result)
			      	resolve(result);
			    }else{
			    	reject(result);
			    }
			}).catch((err)=>{
				reject(err)
			})
		})
	},
	//获取微信用户UserInfo
	// getWorkUserInfo: (user_ticket) => {
	// 	return new Promise((resolve, reject)=> {
	// 		let url = '/cgi-bin/user/getuserdetail?access_token=' + Config.APP_TOKEN;
	// 		request.postHttps('qyapi.weixin.qq.com',url,{"user_ticket": user_ticket}).then((result) => {
	// 			if (result && result.errcode==Config.APP_SUCCESS) {
	// 				resolve(result);
	// 			}else{
	// 				reject(result);
	// 			}
	// 		}).catch((err)=>{
	// 			reject(err)
	// 		})
	// 	})
	// },
	getWorkUserInfo: (userid) => {
		return new Promise((resolve, reject)=> {
			request.getHttps('https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token='+Config.APP_TOKEN+'&userid='+userid).then((result) =>{
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
			request.getHttps('https://qyapi.weixin.qq.com/cgi-bin/department/list?access_token='+Config.APP_TOKEN+'&id='+did).then((result) =>{
			    if (result && result.errcode==Config.APP_SUCCESS) {
			    	console.log(result.department)
			    	if(result.department[0]) {
			    		result.department[0].errcode = '200';
			    		result.department[0].errmsg = 'success';
			    	}
			        resolve(result.department[0]);
			    }else{
			    	reject(result);
			    }
			}).catch((err)=>{
				reject(err)
			})
		})
	},
	//获取微信用户UserInfo
	getNewTicket: () =>{
		return new Promise((resolve, reject)=> {
			let url = 'https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=' + Config.APP_TOKEN;
			let currentTime = new Date().getTime();
			if (Config.APP_TICKET && Config.APP_TicketTime && currentTime <= Config.APP_TicketTime + time) {
			    resolve(getTicketResult);
			    return;
			}
			request.getHttps(url).then((result) =>{
			    if (result && result.errcode==Config.APP_SUCCESS) {
			      Config.APP_TICKET = result.ticket;
			      Config.APP_TicketTime = new Date().getTime();
			      getTicketResult = result;
			      resolve(result);
			    }else{
					reject(result);
				}
			}).catch((err)=>{
				reject(err)
			})
		})
	},
	//获取微信用户UserInfo
	getSignature: (ticket, url) => {
		return new Promise((resolve, reject)=> {
			let timestamp = getTimesTamp(),noncestr = getNonceStr();
			let str = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + url;
			var signature = crypto.createHash('sha1').update(str).digest('hex');
			resolve({
				errcode:Config.APP_SUCCESS,
				errmsg:'success',
				data:{
				    appId: Config.APP_ID,
				    timestamp: timestamp,
				    nonceStr: noncestr,
				    signature: signature
				}
			});

		});
	}	
}
module.exports = Basic;