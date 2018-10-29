var express=require('express');
var router = express.Router();   //可使用 express.Router 类创建模块化、可挂载的路由句柄
var Wechat = require('../controllers/basic');

router.get('/getWechatUserInfo', Wechat.getWechatUser);// http://localhost:8033/wechat/basic/getWechatUserInfo
router.get('/getWechatAccessToken', Wechat.getWechatAccessToken);
router.get('/getWechatConfig', Wechat.getWechatConfig);
module.exports = router;   //暴露这个router模块
