
var Wechat = require('../models/wechat');
// var logger=require('../utils/logger');

exports.getWechatAllUser = function(req, res) {
  Wechat.getWechatAllUser(function(err,userlist){
    var msgCode=200,msg="getWechatAllUser:ok";
    if(err) msgCode=201,msg="getWechatAllUser:fail:"+err;
    res.send({
      msgCode:msgCode,
      msg:msg,
      data: userlist
    });
  });
}
exports.getContactUser = function(req, res) {
  var param=req.body;
  Wechat.getContactUser(param,function(err,userlist){
    var msgCode=200,msg="getContactUser:ok";
    if(err) msgCode=201,msg="getWechatAllUser:fail:"+err;
    res.send({
      msgCode:msgCode,
      msg:msg,
      data: userlist
    });
  });
}
exports.setContactUser = function(req, res) {
  var param=req.body;
  Wechat.setContactUser(param,function(err,userlist){
    var msgCode=200,msg="setContactUser:ok";
    if(err) msgCode=201,msg="setContactUser:fail:"+err;
    res.send({
      msgCode:msgCode,
      msg:msg,
      data: userlist
    });
  });
}
exports.getWechatUser = function(req, res) {
  var _code=req.query.code;
  Wechat.getWechatOpenId(_code,function(err,openId){
     if (err) {
      console.log(err);
      return;
     }    
     Wechat.getWechatUserInfo(openId,function(err,info){
       var msgCode=1,msg="getWechatUser:ok";
       if (err) {
        msgCode=0;
        msg="getWechatUser:fail:"+err;
       }
      res.send({
        msgCode:msgCode,
        msg:msg,
        data: info
      })
    });

  });
}

exports.getWechatAccessToken = function(req, res) {
  var _code=req.query.code;
   Wechat.getWechatAccessToken(_code,function(err,token,time){
    var msgCode=1,msg="start api:getWechatAccessToken:ok,token="+token+"time="+time;
       if (err) {
        msgCode=0;
        msg="start api:getWechatAccessToken:fail:"+err;
       }
      res.send({
        msgCode:msgCode,
        msg:msg,
        data: token
      })
    
   });
}
exports.getWechatConfig = function(req, res) {
  var loca=req.url,locaStart=loca.indexOf('url=');
  var url=loca.substr(locaStart+4);
  Wechat.getNewTicket(function(err,ticket){
    if(err){
      console.log(err);
      return;
    }
    Wechat.getSignature(ticket,url,function(err,config){
      var msgCode=1,msg="getWechatConfig:ok;";
         if (err) {
          msgCode=0;
          msg="getWechatConfig:fail:"+err;
         }
        res.send({
          msgCode:msgCode,
          msg:msg,
          data:config
        })
      });
  });
}
exports.sendTemplate = function(req,res) {
  var param=req.body;
  Wechat.sendTemplate(param,function(err,result){
    var msgCode=200,msg="sendTemplate:ok;";
    if (err) {
      msgCode=0;
      msg="sendTemplate:fail:"+err;
     }
    res.send({
      returnCode:msgCode,
      info:msg,
      data:result
    })
  })
}
exports.getLocationDetail = function(req,res) {
  var param=req.body;
  Wechat.getLocationDetail(param,function(err,result){
    var msgCode=200,msg="getLocationDetail:ok;";
    if (err) {
      msgCode=0;
      msg="getLocationDetail:fail:"+err;
     }
    res.send({
      returnCode:msgCode,
      info:msg,
      data:result
    })
  })
}



