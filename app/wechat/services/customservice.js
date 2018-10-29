var express=require('express');
var router = express.Router();
var Wechat = require('../controllers/customservice');

router.get('/addKfAccount', Wechat.addKfAccount);
router.post('/updateKfAccount', Wechat.updateKfAccount);
router.get('/getKfList', Wechat.getKfList);
router.post('/inviteWorker', Wechat.inviteWorker);
module.exports = router;
