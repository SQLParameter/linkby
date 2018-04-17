Page({
  data: {
    userPhone: '',
    yzm: '',
    hasMobile: false,
    sendable:false,
    validSeconds: 0,
    loginBtnTxt: "登录",
    toRegistTxt: "注册",
    verificationText: "发送验证码",
    loginBtnCls: 'login-btn login-btn-disabled' //登录按钮样式
  },
  onLoad: function () {

  },
  //登录
  toConfirm: function (event) {
    var loginModule = this;
    if (this.data.loginBtnCls == "login-btn") {
      var app = getApp();
      if (!app.validatemobile(this.data.userPhone)) {
        wx.showToast({ title: '请输入手机号码' });
        return;
      } else if (loginModule.data.yzm.length!=4){
        wx.showToast({ title: '请输入验证码' });
        return;
      } else {
        var isToLogin = (loginModule.data.loginBtnTxt == "登录");
        if (isToLogin) {
          //登录操作
          app.post_api_data(app.globalData.api_URL.DoLogin,
            { 'user.phoneNum': loginModule.data.userPhone , 'yzm': loginModule.data.yzm, 'type': 0 },
            function (data) {
              if (data.apiStatus == "200") {
                app.globalData.userInfo = data.data;
                console.log('登录成功' + JSON.stringify(data.data));
                if (data.data.teacher.schoolId != null && data.data.teacher.schoolId.length>0){
                  if (data.data.teacher.curClassesId != null && data.data.teacher.curClassesId.length > 0){
                    wx.redirectTo({ url: '/pages/teacher/homepage/homepage' });
                  }else{
                    wx.redirectTo({ url: '/pages/teacher/create/createClass/createClass' });
                  }                  
                }else{
                  wx.redirectTo({ url: '/pages/teacher/create/confirm/confirm?json=' + encodeURIComponent(JSON.stringify(data.data)) });
                }
              } else {
                wx.showToast({ title: data.msg });
              }
            }, function () {
              wx.showToast({ title: "操作失败" });
            });
        } else {
          //注册操作
          app.post_api_data(app.globalData.api_URL.RegisterSave,
            { 'user.phoneNum': loginModule.data.userPhone, 'yzm': loginModule.data.yzm, 'type': 0 },
            function (data) {
              if (data.apiStatus == "200") {
                console.log('注册成功' + JSON.stringify(data.data));
                app.globalData.userInfo = data.data;
                wx.redirectTo({ url: '/pages/teacher/create/confirm/confirm?json=' + encodeURIComponent(JSON.stringify(data.data)) });
              } else {
                wx.showToast({ title: data.msg });
              }
            }, function () {
              wx.showToast({ title: "操作失败" });
            });
        }
      }
    }
  },
  //请求发送验证码
  sendVerification: function (e) {
    var loginModule = this;
    if (this.data.verificationText == '发送验证码') {
      var app = getApp();
      if (app.validatemobile(this.data.userPhone)) {
        var isToLogin = (this.data.loginBtnTxt == "登录");
        app.post_api_data((isToLogin ? app.globalData.api_URL.GetLoginYzm : app.globalData.api_URL.GetZcYzm),
          { 'phoneNum': this.data.userPhone }, function (data) {
            if (data.apiStatus == "200") {
              loginModule.setData({ validSeconds: parseInt(data.data.timeout) * 60 });
              loginModule.setData({ verificationText: '重新发送' + loginModule.data.validSeconds + 's' });
              loginModule.setData({ sendable: false });
              setInterval(function () {
                if (loginModule.data.validSeconds > 1) {
                  loginModule.setData({ validSeconds: loginModule.data.validSeconds - 1 });
                  loginModule.setData({ verificationText: '重新发送' + loginModule.data.validSeconds + 's' });
                } else {
                  loginModule.setData({ sendable: true });
                  loginModule.setData({ verificationText: '发送验证码' });
                }
              }, 1000);
            } else {
              wx.showToast({ title: data.msg });
            }
          });
      }
    }
  },
  //点击切换到注册
  toRegist: function () {
    if (this.data.toRegistTxt == "注册") {
      this.setData({ toRegistTxt: "登录" });
      this.setData({ loginBtnTxt: "注册" });
    } else {
      this.setData({ loginBtnTxt: "登录" });
      this.setData({ toRegistTxt: "注册" });
    }
  },
  //切换为家长端
  toTeacher: function () {
    wx.redirectTo({
      url: '/pages/parent/login/login'
    })
  },
  //手机号输入后检查合法性
  checkMobile: function (e) {
    this.setData({ userPhone: e.detail.value });
    if (this.data.userPhone.length > 0) {
      this.setData({ hasMobile: true });
    }
    if (e.detail.value.trim().length > 11) {
      this.setData({ userPhone: e.detail.value.trim().substring(0, 11) });
    } else {
      this.setData({ userPhone: e.detail.value.trim() });
    }
    var app = getApp();
    if (app.validatemobile(this.data.userPhone)) {
      this.setData({ loginBtnCls: 'login-btn' });
      this.setData({ sendable: true });
    } else {
      this.setData({ loginBtnCls: 'login-btn login-btn-disabled' });
      this.setData({ sendable: false });
    }
  },
  //清除手机号
  clearMobile: function () {
    this.setData({ userPhone: "" });
    this.setData({ hasMobile: false });
  },
  //监听验证码输入传值
  inputYzm: function (event) {
    if (event.detail.value.trim().length > 4) {
      this.setData({ yzm: event.detail.value.trim().substring(0, 4) });
    } else {
      this.setData({ yzm: event.detail.value.trim() });
    }
  }
})