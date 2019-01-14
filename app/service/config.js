const allConfig = require('../../config/allConfig'),
    _INDEX = allConfig.INDEX;

var Configs={
	index:_INDEX,
	txts:['测试','生产'],
	ips:['10.68.26.167','10.68.26.168'],
	ports:[801,801],
	picUrls:['http://song.sunny.com/mb-wechat/','http://song.sunny.com/mb-wechat/']
}

var Globals={
    ORDER_IP:Configs.ips[Configs.index],
    ORDER_PORT:Configs.ports[Configs.index],
    ORDER_PICURL:Configs.picUrls[Configs.index]
}

module.exports = Globals;
