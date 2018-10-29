function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//时间格式处理
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
//时间格式处理
function formatTime1(date){
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('-') + [hour, minute, second].map(formatNumber).join(':')

}
function paramHandel(jsonObj) {
  var str = '';
  var dataStr = JSON.stringify(jsonObj.data);
  str += "userName=" + jsonObj.userName + "&data=" + dataStr;
  return str;
}

function encodeParam(jsonobj) {
  let str = '';
  for (var name in jsonobj) {
    //if(jsonobj[name] instanceof Array) jsonobj[name]='['+jsonobj[name]+']'
    str += name + '=' + jsonobj[name] + '&'
  }
  return str
}

function returnParam(str) {
  var arry = str.split('&'),
    jsonObj = {};
  for (var i = 0; i < arry.length; i++) {
    if (arry[i]) {
      jsonObj[arry[i].split('=')[0]] = arry[i].split('=')[1]
    }
  }
  return jsonObj
}

function isJSON(str) {
  if (typeof str == 'string') {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }
}

function toJSON(str) {
  if (typeof str == 'string') {
    try {
      JSON.parse(str);
      return JSON.parse(str);
    } catch (e) {
      return '';
    }
  }
}

function contains(obj, val) {
  var i = obj.length;
  while (i--) {
    if (obj[i] === val) {
      return true;
    }
  }
  return false;
}

function is_weixn() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}

function GetRequest() {
  var url = location.search; //获取url中"?"符后的字串 
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      if (strs[i].split("=")[0] == 'toNickName') {
        theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
      } else {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }

    }
  }
  return theRequest;
}

function setCookie(name, value, time) {
  var strsec = getsec(time);
  var exp = new Date();
  exp.setTime(exp.getTime() + strsec * 1);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getsec(str) {
  var str1 = str.substring(1, str.length) * 1;
  var str2 = str.substring(0, 1);
  if (str2 == "s") {
    return str1 * 1000;
  } else if (str2 == "h") {
    return str1 * 60 * 60 * 1000;
  } else if (str2 == "d") {
    return str1 * 24 * 60 * 60 * 1000;
  }
}
//读取cookies 
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

  if (arr = document.cookie.match(reg))

    return unescape(arr[2]);
  else
    return null;
}

//删除cookies 
function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

function objKeySort(obj) { //排序的函数
  if (!obj) {
    return obj;
  }
  var newkey = Object.keys(obj).sort();　　 //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
  for (var i = 0; i < newkey.length; i++) { //遍历newkey数组
    newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj; //返回排好序的新对象
}

var checkObj = {
  // 判断是否为手机号  
  isPoneAvailable: function(pone) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(pone)) {
      return false;
    } else {
      return true;
    }
  },
  // 判断是否为电话号码  
  isTelAvailable: function(tel) {
    var myreg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    if (!myreg.test(tel)) {
      return false;
    } else {
      return true;
    }
  }
}