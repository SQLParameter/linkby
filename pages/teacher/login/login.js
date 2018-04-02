Page({
  data: {
    
  },
  onLoad: function () {

  },
  toConfirm: function () {
    // if (this.data.loginBtnCls == "login-btn") {

    //   if (this.data.userPhone.length != 11) {
    //     this.setData({ isShowError: true });
    //     return;
    //   }
    //   this.setData({ hideview: true });
    // }
    wx.redirectTo({
      url: '/pages/teacher/create/confirm/confirm'
    })
  },
  sendVerification: function () {
    this.setData({ verificationText: '重新发送' });
  },
  toTeacher: function () {
    wx.redirectTo({
      url: '/pages/parent/login/login'
    })
  },
})