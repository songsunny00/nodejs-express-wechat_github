var express=require('express');
var router = express.Router();
var Wechat = require('../controllers/customservice');

router.post('/createChat', Wechat.createChat);
router.get('/getChat', Wechat.getChat);
router.post('/sendChat', Wechat.sendChat);
module.exports = router;
