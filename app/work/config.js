/**企业微信应用**/
var Configs={
	index:0,
	txts:['测试','生产'],
    appids:['wx08646c0b8ebb3189','wx47bbb0a1044f544b'],
	agentids:['1000003','1000024'],
	secrets:['Lj9VTgKUSTtRa3-aDFtFD3M0JqfNsT-9355AtX9xm3o','MZzYBEcT3i6DPzbD5PCMf4W_meQpvNZAnbYs-tXYyPQ']
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
