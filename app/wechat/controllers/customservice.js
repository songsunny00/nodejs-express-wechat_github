
var Wechat = require('../models/customservice');

exports.addKfAccount = function(req, res) {
  let param=req.body;
  Wechat.addKfAccount(param).then((result)=>{
     res.send(result)
  }).catch((err)=>{
    res.send(err)
  })
}

exports.updateKfAccount = function(req, res) {
  let param=req.body;
  Wechat.updateKfAccount(param).then((result)=>{
      res.send(result)
  }).catch((err)=>{
    res.send(err)
  })
}

exports.getKfList = function(req, res) {
  Wechat.getKfList().then((result)=>{
    res.send(result)
  }).catch((err)=>{
    res.send(err)
  })
}

exports.inviteWorker = function(req, res) {
  let param=req.body;
  Wechat.inviteWorker(param).then((result)=>{
      res.send(result)
  }).catch((err)=>{
    res.send(err)
  })
}




