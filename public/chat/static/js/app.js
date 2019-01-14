var actionConfig = {
  index: 0,
  wechatUrl: ['http://wechat.4006005656.com/mb-wechat',],
  omsUrl: ['http://wechat.4006005656.com/'],
  orignUrl:['http://wechat.4006005656.com/mb-wechat/work.html#/login'],
  work_appId: ['wx08646c0b8ebb3189'],
  agentId: ['1000003']
}

var app = {
  time:5000,
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
    pageSize:20,
    platform: 'wechat',
    osType: 'android',
    version: '1.3',
    successCode: 0,
    failCode: 1
    
  }
}