let Config = require('../config');
let CustomService ={
	//添加客服帐号
	addKfAccount: (param) => {
		return new Promise((resolve, reject)=> {
			let url = '/customservice/kfaccount/add?access_token' + Config.APP_TOKEN;
			request.postHttps('api.weixin.qq.com',url,param).then((result) =>{
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
	//修改客服信息
	updateKfAccount: (param) => {
		return new Promise((resolve, reject)=> {
			let url = '/customservice/kfaccount/update?access_token' + Config.APP_TOKEN;
			request.postHttps('api.weixin.qq.com',url,param).then((result) =>{
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
	//获取客服基本信息
	getKfList:() => {
		return new Promise((resolve, reject)=> {
			let url = 'https://api.weixin.qq.com/cgi-bin/customservice/getkflist?access_token='+Config.APP_TOKEN;
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
	//邀请绑定客服帐号
	inviteWorker: (param) => {
		return new Promise((resolve, reject)=> {
			let url = '/customservice/kfaccount/inviteworker?access_token='+Config.APP_TOKEN;
			request.postHttps('api.weixin.qq.com',url,param).then((result) => {
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
module.exports = CustomService;