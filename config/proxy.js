//设置代理
var proxy = require('http-proxy-middleware');
module.exports = function (app) {
	app.use('/eaju_app_service', proxy({ target: 'http://10.68.26.168:8132',changeOrigin: true }));
	app.use('/module-portalweb',proxy({target:'http://10.68.26.174:8080',changeOrigin:false}));
	app.use('/module-tcpwhms',proxy({target:'http://10.68.26.169:7400',changeOrigin:true}));
};