//设置代理
var proxy = require('http-proxy-middleware');
var ProUrls = {
	index:0,
	//移动门户接口路径（测试，生产）
	PortalUrl:['http://10.68.26.174:8080','http://10.68.5.46:8080']
}
module.exports = function (app) {
	app.use('/module-portalweb',proxy({target:ProUrls.PortalUrl[ProUrls.index],changeOrigin:true,logLevel: 'debug'}));
};
