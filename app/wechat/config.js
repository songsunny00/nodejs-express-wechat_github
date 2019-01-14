const allConfig = require('../../config/allConfig'),
    _INDEX = allConfig.INDEX;

var Configs={
	index:_INDEX,
	txts:['测试','生产'],
	ids:['testee95','test86ff'],
	secrets:['test19cc0ec','testa0c614'],
    template_id:['testKKwyRVChY2GUGQY','testVIsRt6WQKF0O8imiEMMc']
}
//获取redis的token信息
var redis = require('../common/redis');

var Globals={
    APP_ID:Configs.ids[Configs.index],
    APP_SECRET:Configs.secrets[Configs.index],
    APP_TOKEN:'',
    APP_TokenTime:'',
    APP_TICKET:'',
    APP_TicketTime:'',
    APP_SUCCESS:'200',
    TEMPLATE_ID:Configs.template_id[Configs.index]
}
// let ticketInfo = redis.get('ticketInfo');
// if(ticketInfo){
//     Globals.APP_TICKET = ticketInfo.split(',')[0];
//     Globals.APP_TicketTime = ticketInfo.split(',')[1]-0;
// }

// let tokenInfo = redis.get('tokenInfo');
// if(tokenInfo){
//     Globals.APP_TOKEN = tokenInfo.split(',')[0];
//     Globals.APP_TokenTime = tokenInfo.split(',')[1]-0;
// }
//获取值
redis.get('tokenInfo', function (err, res) {
    if(err){
        return;
    }
    if(res){
        Globals.APP_TOKEN = res.split(',')[0];
        Globals.APP_TokenTime = res.split(',')[1];
    }
    
});
redis.get('ticketInfo', function (err, res) {
    if(err){
        return;
    }
    if(res){
        Globals.APP_TICKET = res.split(',')[0];
        Globals.APP_TicketTime = res.split(',')[1];
    }
    
});
module.exports = Globals;
