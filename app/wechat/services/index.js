var express=require('express');
var router = express.Router();   //可使用 express.Router 类创建模块化、可挂载的路由句柄
 
 
//配置路由
router.use('/basic',require('./basic.js'));   // http://localhost:8321/wechat/basic
router.use('/customservice',require('./customservice.js'));// http://localhost:8321/wechat/customservice
router.use('/message',require('./message.js'));// http://localhost:8321/wechat/message

module.exports = router;
 
