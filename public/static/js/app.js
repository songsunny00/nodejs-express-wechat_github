var actionConfig = {
  index: 0,
  wechatUrl: ['http://sls.4006005656.com/wechat', 'http://10.69.10.70/wechat'],
  socketUrl:['58.252.192.23/module-api/','10.69.10.70/module-api/','157.122.112.110:88/module-api/'],
  omsUrl: ['http://sls.4006005656.com/wechat/module-api/', 'http://10.69.10.70/wechat/module-api/']
}

var app = {
  //获取手机设备型号
  checkPlatform: function() {
    if (/android/i.test(navigator.userAgent)) {
      app.oms.osType = 'Android';
      app.oms.platform = 'wechat-Android'
      //document.write("This is Android'browser.");//这是Android平台下浏览器
    }
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      app.oms.osType = 'iOS';
      app.oms.platform = 'wechat-iphone';
      let str = navigator.userAgent.toLowerCase();
      let ver = str.match(/cpu iphone os (.*?) like mac os/);
      if (ver) {
        app.oms.osType = 'iOS' + ver[1].replace(/_/g, ".")
      }
      //document.write("This is iOS'browser.");//这是iOS平台下浏览器
    }
  },
  globalData: {
    successCode: 200
  },
  oms: {
    platform: 'wechat',
    osType: 'android',
    version: '1.3',
    successCode: 0,
    failCode: 1,
    /**订单状态**/
    ORDER_STATUS_WAITDEPART: '0', //待发车
    ORDER_STATUS_WAITRECEIPT: '1', //待签收
    ORDER_STATUS_FINISHED: '2', //已完成
  }
}