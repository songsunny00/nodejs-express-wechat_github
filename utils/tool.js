function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const crypto = require('crypto');
let Tool={
	formatTime:(date) => {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  },
  formatDate:(date) => {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    return [year, month, day].map(formatNumber).join('-')
  },
  getmd5: function (str) {
    var md5 = crypto.createHash("md5");
    md5.update(str);
    var strnew = md5.digest('hex');
    return strnew;
  },
}
module.exports = Tool;