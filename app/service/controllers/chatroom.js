
let Chatroom = require('../models/chatroom');

exports.getChatDetail = function(req, res) {
  let param=req.body;
  Chatroom.getChatDetail(param).then((info)=>{
    res.send(info)
  }).catch((err)=>{
    res.send(err)
  })
}

exports.getChatUserList = function(req, res) {
  let msg=req.query;
  Chatroom.getChatUserList().then((info)=>{
    res.send(info)
  }).catch((err)=>{
    res.send(err)
  })
}

exports.setChatOrder = function(req, res) {
  let param=req.body;
  Chatroom.setChatOrder(param).then((info)=>{
    res.send(info)
  }).catch((err)=>{
    res.send(err)
  })
}






