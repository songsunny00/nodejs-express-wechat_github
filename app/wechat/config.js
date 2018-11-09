var Configs={
	index:0,
	txts:['测试','生产'],
	ids:['**','**'],
	secrets:['**','**']
}
var Globals={
    APP_ID:Configs.ids[Configs.index],
    APP_SECRET:Configs.secrets[Configs.index],
    APP_TOKEN:'',
    APP_TokenTime:'',
    APP_TICKET:'',
    APP_TicketTime:'',
    APP_SUCCESS:'200'
}
module.exports = Globals;
