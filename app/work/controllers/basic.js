
var Work = require('../models/basic');

exports.getWorkUser = function(req, res) {
  var _code=req.query.code;
  Work.getWorkUserId(_code).then((result)=>{
     Work.getWorkUserInfo(result.user_ticket).then((info)=>{
      res.send(info)
    }).catch((err)=>{
      res.send(err)
    })
  }).catch((err)=>{
    res.send(err)
  })
}

exports.getWorkAccessToken = function(req, res) {
  var _code=req.query.code;
   Work.getWorkAccessToken(_code).then((result)=>{
      res.send(result)
   }).catch((err)=>{
    res.send(err)
   })
}
exports.getWorkConfig = function(req, res) {
  let loca=req.url,locaStart=loca.indexOf('url=');
  let url=loca.substr(locaStart+4);
  Work.getNewTicket().then((result)=>{
    Work.getSignature(result.ticket,url).then((info)=>{
      res.send(info)
    }).catch((err)=>{
      res.send(err)
    })
  }).catch((err)=>{
    res.send(err)
  })
}




