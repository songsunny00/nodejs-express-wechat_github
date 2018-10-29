var Configs={
	index:0,
	txts:['测试','生产'],
	ids:['wx2dddd92f0c09ee95','wxa62a8c5db3d686ff'],
	secrets:['e5b2e2e3145627d8e38f1ac1b19cc0ec','ad54b4d1a82a8247dc3f498048a0c614']
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
