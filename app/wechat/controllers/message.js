
let Wechat = require('../models/message');
let Basic = require('../models/basic'); 

exports.sendMsg = function(req, res) {
  let param=req.body;
  Basic.getWechatAccessToken().then(()=>{
    Wechat.sendMsg(param).then((result)=>{
       res.send(result)
    }).catch((err)=>{
      res.send(err)
    })
  }).catch((err)=>{
    res.send(err)
  })
}





