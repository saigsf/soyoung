/*
* @Author: saigsf<qq: 2270029397 email: sai_gsf@163.com>
* @Date:   2018-1-12
* @Last Modified by:   M S I
* @Last Modified time: 2018-1-12
*/

/* 获取随机数 */
var randomData = function () {
  var max = 10,
    min = 0;

  if (arguments.length === 1) {
    max = arguments[0];
  } else if (arguments.length === 2) {
    min = arguments[0];
    max = arguments[1];
  }

  return Math.floor(Math.random() * (max - min) + min);
}

/* 时间格式化函数 */
Date.prototype.format = function (format) {

  var o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(), //day
    "h+": this.getHours(), //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    "S": this.getMilliseconds() //millisecond
  }

  if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) 
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
  }

  return format;
}

/* 格式化数据 */
var formatData = function () {
  
}