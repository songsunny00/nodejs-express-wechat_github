var log4js = require('log4js');
log4js.configure({
  appenders: { 
    daily:{ type: 'dateFile', filename: 'logs/daily/log',pattern:'-yyyy-MM-dd.log',alwaysIncludePattern:true } ,
  	wechat: { type: 'dateFile', filename: 'logs/wechat/log',pattern:'-yyyy-MM-dd.log',alwaysIncludePattern:true } ,
  	tcp: { type: 'dateFile', filename: 'logs/tcp/log',pattern:'-yyyy-MM-dd.log',alwaysIncludePattern:true } ,
  	mongodb: { type: 'dateFile', filename: 'logs/mongodb/log',pattern:'-yyyy-MM-dd.log',alwaysIncludePattern:true } ,
  	errs: { type: 'dateFile', filename: 'logs/errs/log',pattern:'-yyyy-MM-dd.log',alwaysIncludePattern:true }
  },
  categories: { 
  	default: { appenders: ['wechat'], level: 'ALL' } ,
    daily: { appenders: ['daily'], level: 'ALL' } ,
  	wechat: { appenders: ['wechat'], level: 'ALL' } ,
  	tcp: { appenders: ['tcp'], level: 'ALL' } ,
  	mongodb: { appenders: ['mongodb'], level: 'ALL' } ,
  	errs: { appenders: ['errs'], level: 'error' }
  }
});
//var logger = log4js.getLogger('default');
var logger = {
  daily:log4js.getLogger('daily'),
	wechat:log4js.getLogger('wechat'),
	tcp:log4js.getLogger('tcp'),
	errs:log4js.getLogger('errs'),
	mongodb:log4js.getLogger('mongodb'),
  log:log4js
}
module.exports = logger;