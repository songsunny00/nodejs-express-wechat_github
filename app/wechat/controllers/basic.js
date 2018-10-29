
var Wechat = require('../models/basic');

exports.getWechatUser = function(req, res) {
  var _code=req.query.code;
  Wechat.getWechatOpenId(_code).then((result)=>{
     Wechat.getWechatUserInfo(result.openid).then((info)=>{
      res.send(info)
    }).catch((err)=>{
      res.send(err)
    })
  }).catch((err)=>{
    res.send(err)
  })
}

exports.getWechatAccessToken = function(req, res) {
  var _code=req.query.code;
   Wechat.getWechatAccessToken(_code).then((result)=>{
      res.send(result)
   }).catch((err)=>{
    res.send(err)
   })
}
exports.getWechatConfig = function(req, res) {
  let loca=req.url,locaStart=loca.indexOf('url=');
  let url=loca.substr(locaStart+4);
  Wechat.getNewTicket().then((result)=>{
    Wechat.getSignature(result.ticket,url).then((info)=>{
      res.send(info)
    }).catch((err)=>{
      res.send(err)
    })
  }).catch((err)=>{
    res.send(err)
  })
}




