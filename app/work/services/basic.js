var express=require('express');
var router = express.Router();   //可使用 express.Router 类创建模块化、可挂载的路由句柄
var Work = require('../controllers/basic');

router.get('/getWorkUserInfo', Work.getWorkUser);// http://localhost:8033/work/basic/getWorkUserInfo
router.get('/getUserDepartment', Work.getUserDepartment);
router.get('/getWorkAccessToken', Work.getWorkAccessToken);
router.get('/getWorkConfig', Work.getWorkConfig);
module.exports = router;   //暴露这个router模块
