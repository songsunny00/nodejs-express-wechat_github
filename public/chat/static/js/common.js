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
      //if (strs[i].split("=")[0] == 'toNickName') {
        theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
      // } else {
      //   theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      // }

    }
  }
  return theRequest;
}

function setCookie(name, value, time) {
  if(typeof(value)=="object")  value=JSON.stringify(value);
  if(!time) time = '1d';
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
  if (arr = document.cookie.match(reg)){
    var val = unescape(arr[2]);
    if(isJSON(val)) val=JSON.parse(val);
     return val;
  }else{
    return null;
  }
}

//删除cookies 
function removeCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

//排序的函数
function objKeySort(obj) {
  if (!obj) {
    return obj;
  }
  var newkey = Object.keys(obj).sort();
  var newObj = {}; 
  for (var i = 0; i < newkey.length; i++) { 
    newObj[newkey[i]] = obj[newkey[i]];
  }
  return newObj; 
}
function trim(str){  
  return str.replace(/(^\s*)|(\s*$)/g, "");  
}
