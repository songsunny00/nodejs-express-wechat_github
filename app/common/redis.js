const allConfig = require('../../config/allConfig'),
    _INDEX = allConfig.INDEX;
const Configs={
    index:_INDEX,
    txts:['测试','生产'],
    ips:[
    	[{ host: '10.68.26.168', port: 2637 }, { host: '10.68.26.168', port: 2647}],
    	[{ host: '10.68.26.168', port: 2637 }, { host: '10.68.26.168', port: 2647}]
    ]
}

var Redis = require('ioredis');

var redis = new Redis({
  sentinels: Configs.ips[Configs.index],//[{ host: '10.68.26.168', port: 26379 }, { host: '10.68.26.168', port: 26479}],
  name: 'mymaster',
  password: 'redis_test'
});

var redisObj = {
  set:function(key,value){
    redis.set(key,value);
  },
  get:function(key){
    redis.get(key, function (err, res) {
      console.log(res)
        if(err){
            return '';
        }
        return res;
    });
  }

}
module.exports = redis;
