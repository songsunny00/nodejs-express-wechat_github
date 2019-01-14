var express=require('express');
var router = express.Router();   //可使用 express.Router 类创建模块化、可挂载的路由句柄
 
 
//配置路由
router.use('/map',require('./map.js'));   // http://localhost:8321/baidu/map
module.exports = router;
 
