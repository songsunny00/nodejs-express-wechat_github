let https=require('https'),
    http=require('http'),
    querystring=require('querystring');
//打印log日志
let loggerObj=require('../../utils/logger');
let Logger_daily=loggerObj.daily,Logger_err=loggerObj.errs;
function printLog(printObj,type,info) {
    printObj[type](info.url);
    if(info.dataStr) printObj[type](info.dataStr);
    printObj[type](info.resultStr);
}
//处理返回结果
function formatResult(resultStr) {
    let result;
    try{
      result = JSON.parse(resultStr);
    }catch(err){
      result={
        data:resultStr
      }
    }
    if(!result.errcode){
        result.errcode = '200';
        result.errmsg = 'success';
    }
    return result;
}
function encodeParam(jsonobj) {
  let str = '';
  for (let name in jsonobj) {
    if((typeof jsonobj[name])=== 'object'){
        let _jstr='',_obj=jsonobj[name]
        for(let item in _obj){
            _jstr+= name+'.'+item + '=' + _obj[item] + '&'
        }
        str += _jstr 
    }else{
        str += name + '=' + jsonobj[name] + '&'
    }
  }
  return str
}
let Request = {
    postHttps:(host,url,param,type)=>{
        return new Promise((resolve, reject)=> {
            let datastr=JSON.stringify(param);
            let opt = {  
                method: "POST",  
                host: host,  
                port: 443,  
                path: url,  
                headers: {
                    'Content-Type': !type?'Application/json;charset=utf-8':type,
                    'Content-Length':new Buffer(datastr).length
                }
            }; 
            let req = https.request(opt, (res) => {
                let datas = [],size = 0;  
                res.on('data', function (data) {  
                    datas.push(data);  
                    size += data.length;  
                }); 
                res.on("end", function () {  
                    let buff = Buffer.concat(datas, size); 
                    let result =buff.toString(); 
                    printLog(Logger_daily,'info',{url:host+url,dataStr:datastr,resultStr:result});
                    resolve(formatResult(result));
                });
            });
            req.on('error', function(e) {
                printLog(Logger_err,'error',{url:host+url,dataStr:datastr,resultStr:e.message});
                reject(formatResult(e.message));
            });
            req.write(datastr);
            req.end();
        });
    },
    getHttps:(url) => {
        return new Promise((resolve, reject)=> {
            https.get(url,(res) => {
                let datas = [],size = 0;  
                res.on('data', function (data) {  
                    datas.push(data);  
                    size += data.length;  
                });  
                res.on("end", function () {  
                    let buff = Buffer.concat(datas, size); 
                    let result =buff.toString();
                    printLog(Logger_daily,'info',{url:url,resultStr:result});
                    resolve(formatResult(result));
                });  
            }).on("error", function (e) {  
                printLog(Logger_err,'error',{url:url,resultStr:e.message});
                reject(formatResult(e.message));
            });
        });
    },
    postHttp:(host,url,param,port) => {
        return new Promise((resolve, reject)=> {
            let datastr=JSON.stringify(param);
            let opt = {  
                method: "POST",  
                host: host,  
                port: port?port:80,  
                path: url,  
                headers: {
                    'Content-Type': 'Application/json;charset=utf-8',
                    'Content-Length':new Buffer(datastr).length
                }
            }; 
            let req = http.request(opt, (res) => {
                let datas = [],size = 0;  
                res.on('data', function (data) {  
                    datas.push(data);  
                    size += data.length;  
                }); 
                res.on("end", function () {  
                    let buff = Buffer.concat(datas, size); 
                    let result =buff.toString(); 
                    printLog(Logger_daily,'info',{url:host+':'+opt.port+url,dataStr:datastr,resultStr:result});
                    resolve(formatResult(result));
                });
            });
            req.on('error', function(e) {
                printLog(Logger_err,'error',{url:host+url,dataStr:datastr,resultStr:e.message});
                reject(formatResult(e.message));
            });
            req.write(datastr);
            req.end();
        });
    },
    getHttp:(url)=>{
        return new Promise((resolve, reject)=> {
            http.get(url,(res) => {
                let datas = [],size = 0;  
                res.on('data', function (data) {  
                    datas.push(data);  
                    size += data.length;  
                });  
                res.on("end", function () {  
                    let buff = Buffer.concat(datas, size); 
                    let result =buff.toString();
                    printLog(Logger_daily,'info',{url:url,resultStr:result});
                    resolve(formatResult(result));
                });  
            }).on("error", function (e) {  
                printLog(Logger_err,'error',{url:url,resultStr:e.message});
                reject(formatResult(e.message));
            });
        });
    },
    getPicToBase64:(url)=>{
        return new Promise((resolve, reject)=> {
            http.get(url,(res) => {
                let datas = [],size = 0;  
                res.on('data', function (data) {  
                    datas.push(data);  
                    size += data.length;  
                });  
                res.on("end", function () {  
                    let buff = Buffer.concat(datas, size); 
                    let result =buff.toString('base64');
                    resolve(formatResult(result));
                });  
            }).on("error", function (e) {  
                reject(formatResult(e.message));
            });
        });
    }
	
}

module.exports = Request;