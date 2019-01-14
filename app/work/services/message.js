var express=require('express');
var router = express.Router();
var Wechat = require('../controllers/message');

router.post('/sendMsg', Wechat.sendMsg);
router.post('/replyMsg', Wechat.replyMsg);
router.post('/msg', Wechat.handleMsg);
router.get('/msg', Wechat.handleMsgValid);
module.exports = router;
