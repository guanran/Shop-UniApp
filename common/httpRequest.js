/**
 * Created by Administrator on 2018/7/26.
 */
var util = require("../utils/util.js");
module.exports = {
  //get方法：用来获取数据
  get: function (url, success, msg, fail) {
    return util.request('GET', url, success, msg, fail);
  },
  //post方法：用来更新数据
  post: function (url, data, success, msg, fail) {
    if(fail==undefined){
      fail=function(e){
        console.log(e);
        util.showMsg(e);
      };
    }
    return util.request('POST', url, data, success, msg,fail);
  },
  //put方法
  put: function (url, data, success, msg, fail) {
    return util.request('PUT', url, data, success, msg, fail);
  },
  //delete方法
  delete: function (url, data, success, fail, msg) {
    return util.request('DELETE', url, data, success, fail, msg);
  },
}