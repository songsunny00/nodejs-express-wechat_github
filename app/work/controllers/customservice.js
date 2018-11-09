
var Wechat = require('../models/customservice');

exports.createChat = function(req, res) {
  let param=req.body;
  Wechat.createChat(param).then((result)=>{
     res.send(result)
  }).catch((err)=>{
    res.send(err)
  })
}

exports.getChat = function(req, res) {
  let chatid=req.query.chatid;
  Wechat.getChat(chatid).then((result)=>{
      res.send(result)
  }).catch((err)=>{
    res.send(err)
  })
}

exports.sendChat = function(req, res) {
  let param=req.body;
  Wechat.sendChat(param).then((result)=>{
     res.send(result)
  }).catch((err)=>{
    res.send(err)
  })
}




