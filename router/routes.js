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

  //wechat
  // app.get('/getWechatUserInfo', Wechat.getWechatUser);
  // app.get('/getWechatAccessToken', Wechat.getWechatAccessToken);
  // app.get('/getWechatConfig', Wechat.getWechatConfig);
  // app.post('/getLocationDetail', Wechat.getLocationDetail);
  // app.post('/getWechatAllUser', Wechat.getWechatAllUser);
  // app.post('/getContactUser', Wechat.getContactUser);
  // app.post('/setContactUser', Wechat.setContactUser);
  // app.post('/sendTemplate', multipartMiddleware, Wechat.sendTemplate);

  //app.post('/login_eaju_app_service/oms/user/Login',multipartMiddleware,Tcp.handleLoginRequest);
  // app.post('/tcp_node/autoLogin', multipartMiddleware, Tcp.autoLogin);
  // app.post('/tcp_node/getShareInfo', multipartMiddleware, Tcp.getShareList);
  // app.post('/tcp_node/updateShareInfo', multipartMiddleware, Tcp.updateShareList);
  // app.post('/tcp_node/setShareInfo', multipartMiddleware, Tcp.setShareList);
  // 404
  app.get('*', function(req, res){
      res.render('404.html', {
          title: 'No Found'
      })
  });
}