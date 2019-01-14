var express=require('express');
var router = express.Router();   //可使用 express.Router 类创建模块化、可挂载的路由句柄
var BaiduMap = require('../controllers/map');

// http://localhost:8033/baidu/map/getLocationDetail
router.post('/getLocationDetail', BaiduMap.getLocationDetail);
module.exports = router;   //暴露这个router模块