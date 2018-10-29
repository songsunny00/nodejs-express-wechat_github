/*
 * GET home page.
 */
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var bodyParser = require('body-parser');

var multipartMiddleware = bodyParser.json();

var Wechat =require('../app/wechat/services/index.js');
//var Wechat = require('../app/wechat/controllers/wechat');
module.exports = function(app) {  
  //require('../app/wechat/services')(app)
  app.use('/wechat',Wechat);
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