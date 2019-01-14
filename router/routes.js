/*
 * GET home page.
 */
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var bodyParser = require('body-parser');

var multipartMiddleware = bodyParser.json();

var Wechat =require('../app/wechat/services/index.js');
var Work =require('../app/work/services/index.js');
var Service =require('../app/service/services/index.js');
var Baidu =require('../app/baidu/services/index.js');
//var Wechat = require('../app/wechat/controllers/wechat');
module.exports = function(app) {  
  //百度地图
  app.use('/baidu',Baidu);
  //公众号
  app.use('/wechat',Wechat);
  //企业微信
  app.use('/work',Work);
  //运维达人
  app.use('/service',Service);
  app.use('/',Wechat);

  // 404
  app.get('*', function(req, res){
      res.render('404.html', {
          title: 'No Found'
      })
  });
}