let Config = require('../config'),
	crypto = require('crypto'),
	request = require('../../common/request');
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
	//获取微信ACCESS_TOKEN
	getWechatAccessToken: () => {
		return new Promise((resolve, reject)=> {
			let url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + Config.APP_ID + '&secret=' + Config.APP_SECRET;
			let currentTime = new Date().getTime();
			if (Config.APP_TOKEN && Config.APP_TokenTime && currentTime <= Config.APP_TokenTime + time) {
			    resolve(getTokenResult);
			    return;
			}
			request.getHttps(url).then((result) =>{
			    if (result && result.errcode==Config.APP_SUCCESS) {
			    	getTokenResult = result;
			        Config.APP_TOKEN = result.access_token;
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
	//获取微信用户openId 
	getWechatOpenId:(code) => {
		return new Promise((resolve, reject)=> {
			let url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + Config.APP_ID + '&secret=' + Config.APP_SECRET + '&code=' + code + '&grant_type=authorization_code'
			request.getHttps(url).then((result) => {
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
	//获取微信用户UserInfo
	getWechatUserInfo: (OPENID) => {
		return new Promise((resolve, reject)=> {
			let url = 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=' + Config.APP_TOKEN + '&openid=' + OPENID + '&lang=zh_CN';
			request.getHttps(url).then((result) => {
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
	//获取微信用户UserInfo
	getNewTicket: () =>{
		return new Promise((resolve, reject)=> {
			let url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + Config.APP_TOKEN + '&type=jsapi'
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