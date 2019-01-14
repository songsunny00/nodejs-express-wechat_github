
let Wechat = require('../models/message');
let Basic = require('../models/basic'); 

exports.sendMsg = function(req, res) {
  let param=req.body;
  Basic.getWorkAccessToken().then(()=>{
    Wechat.sendMsg(param).then((result)=>{
       res.send(result)
    }).catch((err)=>{
      res.send(err)
    })
  }).catch((err)=>{
    res.send(err)
  })
}

exports.replyMsg = function(req, res) {
  let param=req.body;
  Wechat.getAgentAccessToken().then(()=>{
    Wechat.replyMsg(param).then((result)=>{
       res.send(result)
    }).catch((err)=>{
      res.send(err)
    })
  }).catch((err)=>{
    res.send(err)
  })
}

exports.handleMsg = function(req, res) {
  let msg=req.query;
  let _da;
  req.on("data",function(data){
      /*微信服务器传过来的是xml格式的，是buffer类型，因为js本身只有字符串数据类型，所以需要通过toString把xml转换为字符串*/
      _da = data.toString("utf-8");
  });
  req.on("end",function(){
      let ToUserName = getXMLNodeValue('ToUserName',_da);//企业微信CorpID
      let Encrypt = getXMLNodeValue('Encrypt',_da);
      let AgentID = getXMLNodeValue('AgentID',_da);
      let postjson = {ToUserName:ToUserName,Encrypt:Encrypt,AgentID:AgentID};
      Wechat.getAgentAccessToken().then((token)=>{
        Wechat.getMsg(postjson).then((info)=>{
          console.log(info)
          if(info.errcode=='100'){
            res.writeHead(200, {'Content-Type': 'application/xml'});
            res.end(info.xml)
          }else{
            res.send(info)
          }
        }).catch((err)=>{
          res.send(err)
        })
      }).catch((err)=>{res.send(err)})
      // var xml = '<xml><ToUserName>'+FromUserName+'</ToUserName><FromUserName>'+ToUserName+'</FromUserName><CreateTime>'+CreateTime+'</CreateTime><MsgType>'+MsgType+'</MsgType><Content>'+Content+'</Content></xml>';
      // res.send(xml);
  });
}

exports.handleMsgValid = function(req, res) {
  let msg=req.query;
  Wechat.validMsg(msg).then((info)=>{
    res.send(info)
  }).catch((err)=>{
    res.send(err)
  })
}

function getXMLNodeValue(node_name,xml,NoCDATA){
  xml=xml+'';
    let tmp = xml.split("<"+node_name+">");
    let _tmp = tmp[1].split("</"+node_name+">");
    let con =_tmp[0].split("![CDATA[")[1];
    let _con = con.substring(0,con.length-3)
    return _con;
}






