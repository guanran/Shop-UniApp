module.exports = {

  // baseUrl: "https://testyfxcx.ehousechina.com/",
  //baseUrl: "http://localhost:50777/",
  //baseUrl: "https://pmls.ehousechina.com/",
  baseUrl: "http://localhost:50789/",

  //生成分页信息dataStatus res
  getPageInfo:function(obj){
    let dataStatus=obj.dataStatus,res=obj.res;
    return this.setDataObj(dataStatus, {
      loadingAll: dataStatus.pIndex == dataStatus.pCount || (dataStatus.pSize>=res.TData.dataCount && res.TData.dataCount!=0),
      dataTotal: res.TData.dataCount,
      pCount: Math.ceil(res.TData.dataCount / dataStatus.pSize) ,
      pIndex: dataStatus.pIndex + 1,//当前页码
      searchLoading: false,
      isNoData: res.TData.data.length > 0 ? false: true,
    });
  },
  //设置分页默认值
  getPageInfoDef:function(size){
    return {
      searchLoading: false, //"正在加载"的变量，默认false，隐藏
      loadingAll: false, //“全部加载完成”的变量，默认false，隐藏
      isNoData: false,//没有数据变量
      pCount: 0,//总页数
      pIndex : 1,//当前页码
      pSize : this.isNullInt(size)?10:size,//每页容量
      dataTotal : 0,//总条数
    };
  },
  //判断页面是否可以加载，可以设置加载中
  checkLoad:function(cpage){
    if (cpage.data.dataStatus.searchLoading || cpage.data.dataStatus.loadingAll || cpage.data.dataStatus.isNoData) {
      return false;
    }
    cpage.setData({
      dataStatus: this.setDataObj(cpage.data.dataStatus, { searchLoading: true })
    });
    return true;
  },
  //修改当前页面的data对象，需要把原对象和现在要修改的值传递过来
  setDataObj:function(oldObj,newObj){
    if(this.isNullObj(oldObj)){
      return newObj;
    }
    if(this.isNullObj(newObj)){
      return oldObj;
    }

    return Object.assign(oldObj,newObj);
  },
  //生成推送对象 param,title,imageUrl
  getShareObject:function(obj){
    let result={};
    if(!this.isNullStr(obj.title)){
      result.title=obj.title;
    }
    var path = "/pages/index/redirect"+
        "?url="+obj.url+
        "&type="+obj.type+
        "&param="+JSON.stringify(obj.param);
    result.path=path;
    if(!this.isNullStr(obj.imageUrl)){
      result.imageUrl=obj.imageUrl;
    }
    return result;
  },
  //判断数值是否为空或者是0
  isNullInt:function(val){
    return val == null || val== undefined || val == "" ||val == "0" || val==0;
  },
  //判断对象是否为空
  isNullObj:function(val){
    return val == null || val== undefined || val == "" || val =={}|| JSON.stringify(val) =='{}';
  },
  //判断字符串是否为空
  isNullStr:function(val){
    return val == null || val== undefined || val.trim() == "";
  },
  //判断字符串是否为空
  isNullArr:function(val){
    return val == null || val== undefined || val.length==0;
  },
  //字符串去空格
  strSpace:function(val){
    return this.isNullStr(val) ? val : val.replace(new RegExp(' ', "g"),'');
  },
  strReplaceSth:function(val){
    return this.isNullStr(val) ? val : val.replace(/\?/g, '').replace(/\&/g, '').replace(/\=/g, '等于');
  },
  checkPhone: function (phone) {
    return (/^1\d{10}$/.test(phone));
    },
    checkTel: function (tel) {
        return /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel);
    },

  //
  /*
  * 判断val字符串是否为空，如果是空提示消息msg，执行truefun,不为空执行falsefun
  * */
  isNullStrMsg:function(param){
    if(this.isNullStr(param.val)){
      this.showMsg(param.msg,param.truefun);
    }else{
      param.falsefun();
    }
  },
  //判断变量是否为空 end

  //跳转首页
  goIndex:function(){
    let url ='/pages/index/index';
    //添加日志
    this.addUrlLog({type:'redirectTo',url:url});
    let pageInfo =this.getBackPage(url);
    if(pageInfo){
      this.navigateBack({
        delta: pageInfo.index
      });
    }else{
      wx.redirectTo({url:url});
    }
  },
  //跳转开发商首页
  goIndex_KFS: function () {
    let url = '/pagesKFS/pages/index/data';
    //添加日志
    this.addUrlLog({ type: 'redirectTo', url: url });
    let pageInfo = this.getBackPage(url);
    if (pageInfo) {
      this.navigateBack({
        delta: pageInfo.index
      });
    } else {
      wx.redirectTo({ url: url });
    }
  },


  //页面跳转 start
  //获取页面栈中的页面地址
  getBackPage:function(obj){
    let pages =getCurrentPages();
    for(let i=0;i<pages.length;i++){
        let v=pages[i];
        if(obj=== v.route || obj=== '/'+v.route) {
          return {page: v, index: pages.length - 1 - i}
        }
      }
    return null;
  },
  //判断栈里面是否存在存在直接back
  navigateTo:function(obj){
    //添加日志
    var url = obj.url.split('?')[0];
    this.addUrlLog({ type: 'navigateTo', url: obj.url});
    if(this.getBackPage(url)){
      console.error(`navigateTo栈的页面中已经存在${obj.url},骚年你的代码有问题！！！`);
    }else{
      wx.navigateTo(obj);
    }
  },
  redirectTo:function(obj){
    //添加日志
    var url = obj.url.split('?')[0];
    this.addUrlLog({ type: 'redirectTo', url: obj.url});

    if(this.getBackPage(url)){
      console.error(`redirectTo栈的页面中已经存在${obj.url},骚年你的代码有问题！！！`);
    }else{
      wx.redirectTo(obj);
    }
  },
  reLaunch:function(obj){
    //添加日志
    this.addUrlLog({type:'reLaunch',url:obj.url});
    wx.reLaunch(obj);
  },
  switchTab:function(obj){
    //添加日志
    this.addUrlLog({type:'switchTab',url:obj.url});
    wx.switchTab(obj);
  },
  navigateBack:function(obj){
    //添加日志
    //this.addUrlLog({type:'navigateBack',url:obj.url});
    wx.navigateBack(obj);
  },
  addUrlLog:function(obj){

    let param={
      type:obj.type,
      url:obj.url,
    }
    return this.request('POST', 'MiniProgram/RecordUserVisitInfo', [param], function () { }, '', function () { });
  },
  //页面跳转 end

  //提示信息 start

  //提示信息
  showMsg:function(content,fun) {
    if(fun==null){
      fun=function(){};
    }
    wx.showModal({
      content: content,
      showCancel: false,
      success(res) {
        if (res.confirm) {
          fun();
        }
        //else if (res.cancel) {
        //
        //}
      },
      //complete(){
      //   fn()
      //  wx.hideLoading();
      //}
    });
  },
  //提示信息 end
  /**
   * 将日期格式化成指定格式的字符串
   * @param date 要格式化的日期，不传时默认当前时间，也可以是一个时间戳
   * @param fmt 目标字符串格式，支持的字符有：y,M,d,q,w,H,h,m,S，默认：yyyy-MM-dd HH:mm:ss
   * @returns 返回格式化后的日期字符串
   */
  dateFormat:function (date, fmt) {
    if(this.isNullStr(date))
      return null;
    var thisTime = date.replace("T", ' ').replace(/-/g, "/");
    var time = new Date(thisTime);
    date = time.getTime()
    date = typeof date == 'number' ? new Date(date) : date;
    fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
    var obj =
    {
      'y': date.getFullYear(), // 年份，注意必须用getFullYear
      'M': date.getMonth() + 1, // 月份，注意是从0-11
      'd': date.getDate(), // 日期
      'q': Math.floor((date.getMonth() + 3) / 3), // 季度
      'w': date.getDay(), // 星期，注意是0-6
      'H': date.getHours(), // 24小时制
      'h': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
      'm': date.getMinutes(), // 分钟
      's': date.getSeconds(), // 秒
      'S': date.getMilliseconds() // 毫秒
    };
    var week = ['天', '一', '二', '三', '四', '五', '六'];
    for (var i in obj) {
      fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
        var val = obj[i] + '';
        if (i == 'w') return (m.length > 2 ? '星期' : '周') + week[val];
        for (var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
        return m.length == 1 ? val : val.substring(val.length - m.length);
      });
    }
    return fmt;
  },
  formatDateToStr: function (date, fmt) {
    var o = {
      "M+": date.getMonth() + 1,                 //月份
      "d+": date.getDate(),                    //日
      "h+": date.getHours(),                   //小时
      "m+": date.getMinutes(),                 //分
      "s+": date.getSeconds(),                 //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },

  //取当前日期
  getCurrentDate:function(days){
    let date = new Date();
    if (!this.isNullInt(days)){
      date = new Date(date.getTime() + (24 * 60 * 60 * 1000 * days));
    }
    let year=date.getFullYear();
    let month=date.getMonth()+1;
    let day=date.getDate();

    return [year, month<10?"0"+month:month, day<10?"0"+day:day].join("-");
  },

  isDebug:function(){
    return true;
  },

  //比较时间
  compareDate: function (start, end) {
    if (!this.isNullStr(start) && !this.isNullStr(end)){
      start = start.replace(/\-/g, "/");
      end = end.replace(/\-/g, "/");
      start = start.replace(/\./g, "/");
      end = end.replace(/\./g, "/");
      var time1 = new Date(start).getTime();
      var time2 = new Date(end).getTime();
      if (time1 > time2) {
        return -1;
      } else {
        return 1;
      }
    }
  },
  //求时间差
  getDateDiff(start, end){
    if (!this.isNullStr(start) && !this.isNullStr(end)) {
      start = start.replace(/\-/g, "/");
      end = end.replace(/\-/g, "/");
      start = start.replace(/\./g, "/");
      end = end.replace(/\./g, "/");
      var time1 = new Date(start).getTime();
      var time2 = new Date(end).getTime();
      var time3 = time1 - time2;
      //计算出相差天数
      var days = Math.floor(time3 / (24 * 3600 * 1000))
      return days<0?days*-1+1:days+1;
    }
  },

  // HTTP请求封装
  request: function (method, url, data, success, msg, fail) {
    let that = this;
    if (fail == null) {
      fail = function () {
        that.showMsg("加载失败");
      }
    }
    let tmp = { "formVals": JSON.stringify(data) };
    if (!this.isNullStr(msg)) {
      wx.showLoading({
        title: msg,
        mask:true,
      });
    }
    //返回一个promise实例
    let header;
    header = {
      'content-type': 'application/json',
      'cookie': wx.getStorageSync("Set-Cookie")//读取cookie
    };
    wx.request({
      url: this.baseUrl + url,
      header: header,
      data: tmp,
      method: method,
      success: function (res) {
        if (res.statusCode == 200) {
          if (res.header['Set-Cookie'] != undefined) {
            let cookies = res.header['Set-Cookie'].replace('path=/,', ' ').replace('HttpOnly,', 'HttpOnly;').replace('HttpOnly', 'HttpOnly; ').replace('SameSite=Lax,', ' ');
            wx.setStorageSync('Set-Cookie', cookies);
          }

          success(res.data);
        } else if (res.statusCode == 555) {
          that.redirectTo({
            url: '/pages/index/redirect',
          });
        } else {
          //错误信息处理
          wx.showModal({
            title: '提示',
            content: '服务器错误，请联系客服' + JSON.stringify(res.data),
            showCancel: false,
          })
        }
      },
      fail: function (res) {
        fail(res);
      },
      complete: function () {
        if (!that.isNullStr(msg)) {
          wx.hideLoading()
        }
      }
    })

  },
}
