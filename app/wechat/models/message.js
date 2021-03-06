let Config = require('../config');
Config.APP_TOKEN=global.WECHAT_TOKEN;
let request = require('../../common/request');
// let loggerObj = require('../../../utils/logger');//log日志记录
// let Logger = loggerObj.wechat;
let Message ={
	//模板推送消息
	sendMsg: (sendData) => {
		return new Promise((resolve, reject)=> {
			let url = '/cgi-bin/message/template/send?access_token=' + Config.APP_TOKEN;
			let data = {
			    "touser": sendData.frId,
			    "template_id": Config.TEMPLATE_ID,
			    "url": sendData.templateUrl,
			    "data": {
			      "first": {
			        "value": sendData.title,
			        "color": "#173177"
			      },
			      "keyword1": {
			        "value": sendData.createTime,
			        "color": "#173177"
			      },
			      "keyword2": {
			        "value": sendData.content,
			        "color": "#173177"
			      },
			      "remark": {
			        "value": sendData.remark?sendData.remark:"",
			        "color": "#173177"
			      }
			    }
			}
			request.postHttp('api.weixin.qq.com',url,data).then((result) =>{
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