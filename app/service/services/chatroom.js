var express=require('express');
var router = express.Router();   //可使用 express.Router 类创建模块化、可挂载的路由句柄
var Chatroom = require('../controllers/chatroom');

router.get('/getChatUserList', Chatroom.getChatUserList);// http://localhost:8033/service/chatroom/getChatUserList
router.post('/getChatDetail', Chatroom.getChatDetail);
router.post('/setChatOrder', Chatroom.setChatOrder);
module.exports = router;   //暴露这个router模块