let Config = require('../config'),
	crypto = require('crypto'),
	redis = require('../../common/redis'),
	request = require('../../common/request');
let loggerObj = require('../../../utils/logger');//log日志记录
let Logger = loggerObj.wechat;
let time = 7200 * 1000;
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
		redis.get('tokenInfo', function (err, res) {
			console.log(err)
		    if(err){
		        return;
		    }
		    if(res){
		        Config.APP_TOKEN = res.split(',')[0];
		        Config.APP_TokenTime = res.split(',')[1]-0;
		    }
		    
		});
		console.log(Config)
		return new Promise((resolve, reject)=> {
			console.log('after Config')
			let url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + Config.APP_ID + '&secret=' + Config.APP_SECRET;
			let currentTime = new Date().getTime();
			if (Config.APP_TOKEN && Config.APP_TokenTime && currentTime <= Config.APP_TokenTime + time) {
			    resolve({
			    	"access_token":Config.APP_TOKEN,
			    	"expires_in":7200,
			    	"errcode":"200",
			    	"errmsg":"success"
			    });
			    return;
			}
			request.getHttps(url).then((result) =>{
			    if (result && result.errcode==Config.APP_SUCCESS) {
			        Config.APP_TOKEN = result.access_token;
			        global.WECHAT_TOKEN = result.access_token;
			        Config.APP_TokenTime = currentTime;
			        redis.set('tokenInfo',Config.APP_TOKEN+','+Config.APP_TokenTime);
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
		redis.get('ticketInfo', function (err, res) {
		    if(err){
		        return;
		    }
		    if(res){
		        Config.APP_TICKET = res.split(',')[0];
		        Config.APP_TicketTime = res.split(',')[1]-0;
		    }
		    
		});
		return new Promise((resolve, reject)=> {
			let url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + Config.APP_TOKEN + '&type=jsapi'
			let currentTime = new Date().getTime();
			if (Config.APP_TICKET && Config.APP_TicketTime && currentTime <= Config.APP_TicketTime + time) {
			    resolve({
			    	"ticket":Config.APP_TICKET
			    });
			    return;
			}
			request.getHttps(url).then((result) =>{
			    if (result && result.errcode==Config.APP_SUCCESS) {
			      Config.APP_TICKET = result.ticket;
			      Config.APP_TicketTime = new Date().getTime();
			      redis.set('ticketInfo',Config.APP_TICKET+','+Config.APP_TicketTime);
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