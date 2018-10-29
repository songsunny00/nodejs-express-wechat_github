var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var serveStatic = require('serve-static'); // 静态文件处理
var morgan = require('morgan');//开发环境打印

module.exports = function (app) {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
    app.use(serveStatic(path.join(__dirname, '..', '/public')))
	//app.use(serveStatic(__dirname + '/public')); // 路径：public
	app.use(cookieParser());

	app.disable('etag');//解决接口缓存返回304状态

	var logger = morgan('dev');
	if ('development' === app.get('env')) {
		app.set('showStackError', true)
		app.use(morgan(':method :url :status'));
		app.locals.pretty = true
	}

};