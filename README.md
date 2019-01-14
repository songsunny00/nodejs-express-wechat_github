# nodejs+express+wechat
  现在微信很火，经常要负责开发基于微信平台应用，然后要**调用微信API,设置js-sdk**等等，如果你不会写点后台接口，少不了就要跟后台交流很多关于微信的接口，怎么调，调哪些...还没中年就像唐僧，有时候后台就问一推why自己还不去看官方文档的，诸如此类很烦躁的...因此，你就非常有必要好好看看这个，觉得不错，可以给个**star**~  
  用**nodejs**写个调用**微信各种API**,这个还可以支持**log日志**输出、**proxy代理**接口等，功能齐全中间件...可以稍微远离后台，安静敲代码了
## 结构说明
![项目结构说明图](https://github.com/songsunny00/nodejs-express-wechat_github/blob/master/public/githubImg/construct.png?raw=true)  

## 项目启动
  Install dependencies(2选1):

```bash
$ npm install
$ yarn
```

  Start the server:

```bash
$ node server.js
```

## 微信公众号基本配置
共有4大模块：微信公众号、微信企业号、百度Api、运维达人聊天室
以“微信公众号”模块为例子，如何配置微信sdk和获取用户信息，模板消息推送等
### 路由
 本地运行nodejs项目，地址是http://localhost:8321/  
 微信公众号开发，需要配置JS接口安全域名，所以需要做一个域名映射到这个nodejs应用，在此推荐花生壳，注册一个账号领取一个免费的二级域名，映射到此应用上
 假设http://song.sunny.vip/mb-wechat --> http://localhost:8321  
 http://song.sunny.vip/mb-wechat/wechat/basic/getWechatConfig 配置SDK  
 http://song.sunny.vip/mb-wechat/wechat/basic/getWechatUserInfo 获取用户详情  
 http://song.sunny.vip/mb-wechat/wechat/basic/getWechatAccessToken 获取accesstoken   
 
 后台配置微信公众号信息  
 ps：
 微信的access_token是从获取开始7200秒后失效,也就是2个小时,需要重新获取，为什么使用redis数据库呢？双机负载均衡，部署两套服务器，要共享一个token，所以需要储存到一个共同可访问的数据库，读写性能快的，所以选择redis储存token，每次先读取token判断是否需要重新获取token
 
config.js  
```
const allConfig = require('../../config/allConfig'),
    _INDEX = allConfig.INDEX;

var Configs={
	index:_INDEX,
	txts:['测试','生产'],
	ids:['testee95','test86ff'],//公众号的appID
	secrets:['test19cc0ec','testa0c614'],//公众号的appsecret
    	template_id:['testKKwyRVChY2GUGQY','testVIsRt6WQKF0O8imiEMMc']//公众号消息推送模板id
}
//获取redis的token信息--accesstoke用redis储存
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
 
 ```
 
