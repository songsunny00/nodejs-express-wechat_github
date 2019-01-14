/**企业微信应用**/
const allConfig = require('../../config/allConfig'),
    _INDEX = allConfig.INDEX;
var Configs={
	index:_INDEX,
	txts:['移动门户测试','移动门户生产'],
    appids:['test3189','test544b'],
	agentids:['1000003','1000024'],
	secrets:['test-test-9355AtX9xm3o','test_tests-tXYyPQ']
}
//运维达人配置
var ServiceConfigs ={
    index:_INDEX,
    txts:['运维达人测试','运维达人生产'],
    appids:['test3189','test544b'],
    agentids:['1000004','1000027'],
    secrets:['testLJi5OPJ4','testDt358NJmR6vLeM']
}
var Globals={
    APP_ID:Configs.appids[Configs.index],
    AGENT_ID:Configs.agentids[Configs.index],
    AGENT_SECRET:Configs.secrets[Configs.index],
    APP_TOKEN:'',
    APP_TokenTime:'',
    APP_TICKET:'',
    APP_TicketTime:'',
    APP_SUCCESS:'200',
    S_ID:ServiceConfigs.appids[ServiceConfigs.index],
    S_AID:ServiceConfigs.agentids[ServiceConfigs.index],
    S_SECRET:ServiceConfigs.secrets[ServiceConfigs.index],
}
module.exports = Globals;
