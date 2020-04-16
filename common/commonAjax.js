var http = require("httpRequest.js");
var mType = {
  operation: "数据提交中",
  query: "Loading...",
}
module.exports = {

  //请求数据 start
  //test
  test: function() {
    http.post('MiniProgram/test', {}, function() {});
  },
  getJSCodeSession: function(data, success) {
    http.post('MiniXCXUser/GetJSCodeSession', data, success);
  },
  //请求数据 start
  //解密微信数据
  getDecryptInfo: function(data, success) {
    http.post('MiniProgram/GetDecryptInfo', data, success);
  },
  //获取用户登录信息（根据CODE）
  getUserByCode: function(data, success) {
    http.post('MiniXCXUser/GetUserSessionInfo', data, success, mType.query);
  },
  //登录请求
  login: function(data, success) {
    http.post('Account/PostLogin', data, success);
  },
  //获取所有城市
  getAllCity: function(success, fail) {
    http.post('MiniAppProject/GetCity', {}, success, null, fail);
  },
  //获取首页广告滑动
  getMainSwiper: function(data, success, fail) {
    http.post('MiniProgram/GetMainSwiper', data, success, null, fail);
  },
  //首页城市新推热推项目
  GetHotMainProject: function(data, success) {
    http.post('MiniAppProject/GetCityProjectList', data, success);
  },
  //获取城市经纬度详情
  GetCityMapProject: function(data, success) {
    http.post('MiniProgram/GetCityMapProject', data, success);
  },
  //根据腾讯得到的city_code得到相关的城市信息
  GetReflectCityInfo: function(data, success) {
    http.post("MiniProgram/GetReflectCityInfo", data, success);
  },
  //获取手机短信验证码
  //校验验证码正确性
  CheckVerifyCode: function(data, success) {
    http.post("MiniProgram/CheckVerifyCode", data, success, mType.operation);
  },
  //用户注册
  RegisterUserInfo: function(data, success) {
    http.post("MiniXCXUser/RegisterUserInfo", data, success, mType.operation);
  },
  CheckMobilePCRegister: function(data, success) {
    http.post("MiniXCXUser/CheckMobilePCRegister", data, success, mType.operation);
  },
  //门店列表
  GetStoreList: function(data, success) {
    http.post("MiniProgram/GetStoreList", data, success);
  },
  //单个门店绑定人员信息
  GetOneStoreBindingInfo: function(data, success) {
    http.post("MiniProgram/GetOneStoreBindingInfo", data, success);
  },
  //用户绑定门店
  BindingUserStoreNew: function(data, success) {
    http.post("MiniProgram/BindingUserStoreNew", data, success, mType.operation);
  },

  //获取当前城市楼盘动态
  GetBuildingDynamicsList: function(data, success) {
    http.post("MiniAppProject/GetBuildingDynamicsList", data, success);
  },
  //获取周边城市
  GetSurroundingCityList: function(data, success) {
    http.post("MiniAppProject/GetSurroundingCityList", data, success);
  },
  //获取城市项目
  GetCityProjectList: function(data, success) {
    http.post("MiniAppProject/GetCityProjectList", data, success);
  },
  //获取周边城市项目
  GetSurroundingCityProjectList: function(data, success) {
    http.post("MiniAppProject/GetSurroundingCityProjectList", data, success);
  },
  //获取详情
  GetProjectDetailInfo: function(data, success) {
    http.post("MiniAppProject/GetProjectDetailInfo", data, success, mType.query);
  },
  //记录分享信息
  RecordUserShareInfo: function(data, success) {
    http.post("MiniProgram/RecordUserShareInfo", data, success);
  },
  //记录用户访问地址跳转方法
  RecordUserVisitInfo: function(data, success) {
    http.post("MiniProgram/RecordUserVisitInfo", data, success);
  },
  //新增客户
  AddCustomer: function(data, success) {
    http.post("MiniCustomer/AddCustomerXCX", data, success, mType.operation);
  },
  //我的客户列表
  MyCustomersList: function(data, success) {
    http.post("MiniCustomer/GetMyCustomerList", data, success, mType.query);
  },
  //报备客户
  PushCustomerToProject: function(data, success) {
    http.post("MiniAppProject/PushCustomerToProjectXCX", data, success, mType.operation);
  },
  //客户详情
  GetCustomerDetailInfo: function(data, success) {
    http.post("MiniCustomer/GetCustomerDetailInfo", data, success, mType.query);
  },
  //报备列表
  GetMyReportCustomerList: function(data, success) {
    http.post("MiniProgram/GetMyReportCustomerList", data, success, mType.query);
  },
  //报备列表各状态数量和
  GetMyReportSummary: function(data, success) {
    http.post("MiniProgram/GetMyReportSummary", data, success, mType.query);
  },
  //“我的”数据
  GetMyMainInfo: function(success, fail) {
    http.post("MiniAppMyPanel/GetMyMainInfo", {}, success, null, fail);
  },
  //编辑“我的”保存
  EditMyInfo: function(data, success) {
    http.post("MiniProgram/EditMyInfo", data, success, mType.operation);
  },
  //获取驻场绑定的项目
  GetZCProjectList: function(data, success) {
    http.post("MiniProgram/GetZCProjectList", data, success, mType.query);
  },
  //获取驻场下的报备记录
  GetZCReportCustomerList: function(data, success) {
    http.post("MiniProgram/GetZCReportCustomerList", data, success, mType.query);
  },
  //驻场操作报备记录
  ZCOperateReport: function(data, success) {
    http.post("MiniAppZC/ZCOperateReport", data, success, mType.operation);
  },
  //取消收藏
  OperationFavProject: function(data, success) {
    http.post("MiniAppProject/OperationFavProject", data, success, mType.operation);
  },
  //查收藏列表
  FavProjectList: function(data, success) {
    http.post("MiniAppProject/FavProjectList", data, success, mType.query);
  },
  //获取项目佣金
  GetProjectCommission: function(data, success) {
    http.post("MiniProgram/GetProjectCommission", data, success, mType.query);
  },
  //获取项目规则
  GetProjectCustomerNoticeInfo: function(data, success) {
    http.post("MiniProgram/GetProjectCustomerNoticeInfo", data, success, mType.query);
  },
  //获取二维码
  GetQRCode: function(data, success) {
    http.post("MiniProgram/GetQRCode", data, success, mType.query);
  },
  //我的消息列表
  GetNoticeList: function(data, success) {
    http.post("MiniProgram/GetNoticeList", data, success, mType.query);
  },
  //获取扫码数据
  GetQRCodeInfoBySceneId: function(data, success) {
    http.post("MiniProgram/GetQRCodeInfoBySceneId", data, success);
  },
  //修改客户信息
  ModifyCustomer: function(data, success) {
    http.post("MiniCustomer/ModifyCustomer", data, success, mType.operation);
  },
  //根据门店编码获取门店信息& 门店下人员绑定信息
  GetOneStoreInfoByCode: function(data, success) {
    http.post("MiniProgram/GetOneStoreInfoByCode", data, success);
  },
  //文旅项目
  GetCityWLProjectList: function(data, success) {
    http.post("MiniAppProject/GetCityWLProjectList", data, success, mType.query);
  },
  //驻场详情
  ZCGetReportDetail: function(data, success) {
    http.post("MiniProgram/ZCGetReportDetail", data, success, mType.query);
  },
  //驻场提交
  ZCOperateReportSingle: function(data, success) {
    http.post("MiniProgram/ZCOperateReportSingle", data, success, mType.operation);
  },
  //全店报备 各项合计
  GetStoreReportList: function(data, success) {
    http.post("MiniProgram/GetStoreReportList", data, success, mType.query);
  },
  //报备列表二维码（报备有效和带看）
  GetCustomerQRCode: function(data, success) {
    http.post("MiniProgram/GetCustomerQRCode", data, success, mType.query);
  },
  //驻场校验是否存在项目权限并校验宝贝记录状态
  CheckPermissionAndCorrection: function(data, success) {
    http.post("MiniProgram/CheckPermissionAndCorrection", data, success, mType.query);
  },
  //管理门店列表
  GetCompanyStoreUserList: function(data, success) {
    http.post("MiniProgram/GetCompanyStoreUserList", data, success, mType.query);
  },
  //管理门店职位修改
  UpdateUserIdentity: function(data, success) {
    http.post("MiniProgram/UpdateUserIdentity", data, success, mType.operation);
  },
  //获取门店列表
  GetCompanyStoreList: function(data, success) {
    http.post("MiniProgram/GetCompanyStoreList", data, success, mType.query);
  },
  //根据用户ID获取用户信息
  getUserLoginInfo: function(data, success) {
    http.post("MiniXCXUser/GetUserLoginInfo", data, success);
  },
  //驻场消息数
  GetUnreadMessageSum: function(data, success) {
    http.post("MiniProgram/GetUnreadMessageSum", data, success);
  },
  //门店管理踢人
  CompanyManagerRemovePerson: function(data, success) {
    http.post("MiniProgram/CompanyManagerRemovePerson", data, success, mType.operation);
  },
  //驻场获取项目汇总数
  GetProjectSummaryReport: function(data, success) {
    http.post("MiniProgram/GetProjectSummaryReport", data, success);
  },
  //驻场获取汇总图表数
  GetProjectReportBar: function(data, success) {
    http.post("MiniProgram/GetProjectReportBar", data, success);
  },
  //驻场获取汇总报表
  GetProjectReportSummaryList: function(data, success) {
    http.post("MiniProgram/GetProjectReportSummaryList", data, success, mType.query);
  },
  //设置经纪人查看佣金权限

  GetCompanyShowCommission: function(data, success) {
    http.post("MiniProgram/GetCompanyShowCommission", data, success, mType.query);
  },
  //根据城市id获取区域列表
  GetDistictByCity: function(data, success) {
    http.post("MiniProgram/GetDistictByCity", data, success);
  },
  GetWHRList: function(data, success) {
    http.post('MiniProgram/GetWHRList', data, success);
  },
  //创建经纪人二维码（被维护人扫描）
  CreateCRMErcode: function(data, success) {
    http.post('MiniProgram/CreateCRMErcode', data, success, mType.query);
  },
  //获取绑定历史和当前信息
  GetUserBindingInfo: function(data, success) {
    http.post('MiniProgram/GetUserBindingInfo', data, success, mType.query);
  },
  //取消绑定
  CancelBindingInfo: function(data, success) {
    http.post('MiniProgram/CancelBindingInfo', data, success, mType.operation);
  },
  //获取项目包销房源列表
  GetProjectHouseList: function(data, success) {
    http.post('MiniAppProject/GetProjectHouseList', data, success, mType.query)
  },
  //项目包销房源修改状态
  EditProjectHouseStatus: function(data, success) {
    http.post('MiniAppProject/EditProjectHouseStatus', data, success, mType.operation)
  },
  //获取驻场报备列表
  GetZCReportList: function(data, success) {
    http.post('MiniAppZC/GetZCReportList', data, success, mType.query)
  },
  GetJJRReportDetail:function(data,success){
    http.post('MiniAppReport/GetJJRReportDetail',data,success,mType.query)
  },
  //获取驻场报备列表筛选条件
  GetZCScreeningCondition: function(success, fail) {
    http.post('MiniAppZC/GetZCScreeningCondition', {}, success, null, fail);
  },
  //驻场审核报备数据
  /*  ZCOperateReport:function(data,success){
     http.post("MiniAppZC/ZCOperateReport",data,success,mType.operation);
   }, */
  //驻场查看报备数据详情
  GetZCReportDetail: function(data, success) {
    http.post("MiniAppZC/GetZCReportDetail", data, success, mType.query);
  },
  //获取我的消息
  GetMyMsgList: function(data, success) {
    http.post("MiniAppMyPanel/GetMyMsgList", data, success, mType.query);
  },
  //添加建议反馈
  MySuggestionFeedback: function(data, success) {
    http.post("MiniAppMyPanel/MySuggestionFeedback", data, success, mType.operation);
  },
  //获取短信验证码
  GetVerifyCode: function(data, success) {
    http.post("MiniAppUser/GetVerifyCode", data, success, mType.operation);
  },
  //编辑个人信息
  EditMyMainInfo: function(data, success) {
    http.post("MiniAppMyPanel/EditMyMainInfo", data, success);
  },
  //编辑手机
  EditMyMobile: function(data, success) {
    http.post("MiniAppMyPanel/EditMyMobile", data, success, mType.operation);
  },

  //全店报备&全公司报备合计
  GetStoreSumReport: function(data, success) {
    http.post("MiniAppReport/GetStoreSumReport", data, success, mType.query);
  },
  //全店报备详情&全公司报备详情&经纪人我的报备（客户）详情
  GetMyReportList: function(data, success) {
    http.post("MiniAppReport/GetMyReportList", data, success, mType.query);
  },
  //我的报备（项目）详情
  GetMyReportProjectSumList: function(data, success) {
    http.post("MiniAppReport/GetMyReportProjectSumList", data, success, mType.query);
  },
  //报备记录（合计）渠道端
  GetReportSatatusSum: function(data, success) {
    http.post("MiniAppReport/GetReportSatatusSum", data, success, mType.query);
  },
  //报备记录列表  渠道端
  GetReportSatatusList: function(data, success) {
    http.post("MiniAppReport/GetReportSatatusList", data, success, mType.query);
  },
  //请求数据 end


  //获取首页信心
  getMainResult: function(data, success, fail) {
    http.post('MiniAppProject/GetMainResult', data, success, null, fail);
  },
  //获取筛选条件
  GetProjectScreeningCondition: function(data, success, fail) {
    http.post('MiniAppProject/GetProjectScreeningCondition', data, success, null, fail);
  },
  GetCanJYList: function(data, success) {
    http.post('MiniJY/GetCanJYList', data, success);
  },
  GetProjectJYSetting: function(data, success) {
    http.post('MiniJY/GetProjectJYSetting', data, success);
  },
  GetProjectJYReportList: function(data, success) {
    http.post('MiniJY/GetProjectJYReportList', data, success);
  },
  ApplyProjectJYReport: function(data, success) {
    http.post('MiniJY/ApplyProjectJYReport', data, success);
  },
  GetAreadyJYList: function(data, success) {
    http.post('MiniJY/GetAreadyJYList', data, success);
  },
  GetAreadyJYDetail: function(data, success) {
    http.post('MiniJY/GetAreadyJYDetail', data, success);
  },
  //渠道管理员设置佣金项目列表
  GetQDCommissionProjectList: function(data, success) {
    http.post('MiniCommission/GetQDCommissionProjectList', data, success);
  },
  //渠道管理员获取项目佣金信息
  GetProjectCommissionRule: function(data, success) {
    http.post('MiniCommission/GetProjectCommissionRule', data, success);
  },
  //渠道管理员保存项目佣金信息
  SaveQDProjectCommission: function(data, success) {
    http.post('MiniCommission/SaveQDProjectCommission', data, success);
  },
  //店东获取公司下所有门店
  ManagerGetCompanyStore: function(data, success) {
    http.post('MiniAppReport/ManagerGetCompanyStore', data, success);
  },
  //我的同事列表
  GetMyColleagueList: function(data, success) {
    http.post('MiniAppMyPanel/GetMyColleagueList', data, success);
  },
  //我的邀请列表
  GetMyInvitationList: function(data, success) {
    http.post('MiniAppMyPanel/GetMyInvitationList', data, success);
  },
  //邀请同事
  AdminInviteColleague: function(data, success) {
    http.post('MiniAppMyPanel/AdminInviteColleague', data, success, mType.operation);
  },
  //再次邀请同事
  AdminInviteColleagueAgain: function(data, success) {
    http.post('MiniAppMyPanel/AdminInviteColleagueAgain', data, success, mType.operation);
  },
  //邀请码失效重新生成邀请码
  CreateNewInviteCode: function(data, success) {
    http.post('MiniAppMyPanel/CreateNewInviteCode', data, success, mType.operation);
  },
  //移除同事
  RemoveColleague: function(data, success) {
    http.post('MiniAppMyPanel/RemoveColleague', data, success, mType.operation);
  },
  //删除邀请
  RemoveInvitation: function(data, success) {
    http.post('MiniAppMyPanel/RemoveInvitation', data, success, mType.operation);
  },
  //我的同事合计
  GetStoreColleagueCount: function(data, success) {
    http.post('MiniAppMyPanel/GetStoreColleagueCount', data, success);
  },
  //店东批量设置身份或移除
  ChangeStoreUserIdentity: function(data, success) {
    http.post('MiniAppMyPanel/ChangeStoreUserIdentity', data, success);
  },

  //店东批量设置身份或移除
  SetCompanyCommission: function(data, success) {
    http.post('MiniAppMyPanel/SetCompanyCommission', data, success);
  },
  //获取相关门店或渠道信息
  GetRefCodeInfo: function(data, success) {
    http.post('MiniAppProject/GetRefCodeInfo', data, success);
  },
  //店东获取公司下所有门店
  ManagerGetCompanyStoreCode: function(data, success) {
    http.post('MiniAppReport/ManagerGetCompanyStoreCode', data, success);
  },
  EntranceCompany: function(data, success) {
    http.post('MiniAppMyPanel/EntranceCompany', data, success, mType.operation);
  },
  //报备列表生成二维码
  CreateErCodeByData: function(data, success) {
    http.post('MiniAppReport/CreateErCodeByData', data, success, mType.query);
  },
  GetProjectERCode: function (data, success) {
    http.post('MiniAppProject/GetProjectERCode', data, success, mType.query);
  },
  CreateProjectSharePic: function (data, success) {
    http.post('MiniAppProject/CreateProjectSharePic', data, success, mType.operation);
  },

  // 开发商端接口
  //数据汇总数据
  GetKFSMainSumReport: function (data, success) {
    http.post('KFSReport/GetKFSMainSumReport', data, success, mType.query)
  },
  //管理数据
  GetKFSReportList: function (data, success) {
    http.post('KFSReport/GetKFSReportList', data, success, mType.query)
  },
  // 获取城市
  GetKFSCity: function (success, fail) {
    http.post('KFSReport/GetKFSCity', {}, success, null, fail)
  },
  // 根据城市获取项目
  GetKFSScreeningCondition: function (data, success) {
    http.post('KFSReport/GetKFSScreeningCondition', data, success, mType.query)
  },
  //项目累计数据
  GetKFSProjectSumReport: function (data, success) {
    http.post('KFSReport/GetKFSProjectSumReport', data, success, mType.query)
  },

}