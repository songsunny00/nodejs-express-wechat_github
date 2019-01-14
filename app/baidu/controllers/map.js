
let BaiduMap = require('../models/map');

exports.getLocationDetail = function(req,res) {
  var param=req.body;
  BaiduMap.getLocationDetail(param).then((result) => {
    res.send(result)
  }).catch((err) => {
    res.send(err)
  })
}





