Page({
  data: {
    //用户输入手机号
    userPhone: '',
    //是否显示清除按钮
    isShowClear: false,
    //是否显示验证码正确图标
    isShowCorrect: false,
    verificationText: '发送验证码',
    //登录按钮样式
    loginBtnCls: 'login-btn login-btn-disabled',
    //显示错误提示
    isShowError: false,
    //班级测试数据
    classList: [
      { value: '平阳中学初一（1）班', classID: '001' },
      { value: '水头一中初三（3）班', classID: '002' },
      { value: '赵河中学初二（2）班', classID: '003' }
    ],
    //显示加入班级
    hideview:false,
    //是否显示快捷登录
    isPhoneLogin:true
  },
  onLoad: function () {

  },
  toHomePage: function () {
    if (this.data.loginBtnCls == "login-btn") {

      if (this.data.userPhone.length != 11) {
        this.setData({ isShowError: true });
        return;
      }
      this.setData({ hideview:true});
    }
  },
  sendVerification: function () {
    this.setData({ verificationText: '重新发送' });
  },
  toTeacher: function () {
    wx.redirectTo({
      url: '/pages/teacher/login/login'
    })
  },
  cleanUserPhone: function () {
    this.setData({ userPhone: '' });
    this.setData({ isShowClear: false });
  },
  showClear: function (val) {
    if (val.detail.cursor > 0) {
      this.setData({ isShowClear: true, loginBtnCls: 'login-btn', userPhone: val.detail.value });
    }
    else {
      this.setData({ isShowClear: false });
      this.setData({ loginBtnCls: 'login-btn login-btn-disabled' });
    }
  },
  showCorrect: function (val) {
    if (val.detail.cursor > 3) {
      this.setData({ isShowCorrect: true });
    }
    else {
      this.setData({ isShowCorrect: false });
    }
  },
  goToHomePage:function(){
    wx.redirectTo({
      url: '../homepage/homepage'
    })
  },
  inputLogin:function(){
    this.setData({ isPhoneLogin: false });
  }
})