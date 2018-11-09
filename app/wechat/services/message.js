var express=require('express');
var router = express.Router();
var Wechat = require('../controllers/message');

router.post('/sendMsg', Wechat.sendMsg);
module.exports = router;