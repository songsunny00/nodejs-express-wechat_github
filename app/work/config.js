/**企业微信应用**/
var Configs={
	index:0,
	txts:['测试','生产'],
    appids:['**','**'],
	agentids:['1000003','1000024'],
	secrets:['**','**']
}
var Globals={
    APP_ID:Configs.appids[Configs.index],
    AGENT_ID:Configs.agentids[Configs.index],
    AGENT_SECRET:Configs.secrets[Configs.index],
    APP_TOKEN:'',
    APP_TokenTime:'',
    APP_TICKET:'',
    APP_TicketTime:'',
    APP_SUCCESS:'200'
}
module.exports = Globals;
