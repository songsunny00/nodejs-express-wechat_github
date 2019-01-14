let Config = require('../config');
let request = require('../../common/request');
let Tool = require('../../../utils/tool'); 
let loggerObj = require('../../../utils/logger');//log日志记录

let BaiduMap ={
	//获取详细地理位置
	getLocationDetail: (sendData) => {
		return new Promise((resolve, reject)=> {
			let url = 'https://api.map.baidu.com/geocoder/v2/?ak='+Config.MAP_AK+'&callback=renderReverse&location=' + sendData["latlon"] + '&output=json&pois=0';
			request.getHttps(url).then((result) =>{
			    if (result && result.errcode==Config.APP_SUCCESS) {
			    	let lists = result.data;
			    	if (!lists) return;
				    let jsonstr = lists.split('renderReverse')[2];
				    var jsonresult = jsonstr.substring(1, jsonstr.length - 1);
				    try {
				      jsonresult = JSON.parse(jsonresult); //不需要转编码,直接tostring 
				    } catch (err) {
				      jsonresult = jsonstr.substring(1, jsonstr.length - 1);
				    }
				    result.data = jsonresult;
				    resolve(result);
			    }else{
			    	reject(result);
			    }
			}).catch((err)=>{
				reject(err)
			})
		})
	},
	
	
}

module.exports = BaiduMap;