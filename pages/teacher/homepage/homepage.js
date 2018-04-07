// pages/teacher/create/homepage/homepage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //确认框
    showShadow: false,
    showHomepage: true,
    showTask: false,
    showCircle: false,
    showMy: false,
    taskDate: '10-12',
    conf: '10',
    cont: '50',
    isRelease: false,
    showRelease: true,
    showTaskList: false,
    taskItems: [{
      date: '10-16 周三',
      time: ' 18：00'
    }, {
      date: '10-16 周三',
      time: ' 18：00'
    }, {
      date: '10-16 周三',
      time: ' 18：00'
    }],
    circleList: [{}, {}, {}],
    classList: [{ isNow: false},{isNow:true}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  showHomepage: function () {
    this.setData({
      showHomepage: true,
      showTask: false,
      showCircle: false,
      showMy: false
    });
  },
  showTask: function () {
    this.setData({
      showHomepage: false,
      showTask: true,
      showCircle: false,
      showMy: false
    });
  },
  showCircle: function () {
    this.setData({
      showHomepage: false,
      showTask: false,
      showCircle: true,
      showMy: false
    });
  },
  showMy: function () {
    this.setData({
      showHomepage: false,
      showTask: false,
      showCircle: false,
      showMy: true
    });
  },
  release: function () {

    this.setData({
      isRelease: true
    })
    wx.navigateTo({
      url: '/pages/teacher/task/create/create'
    })
    // wx.redirectTo({
    //   url: '/pages/teacher/task/create/create'
    // })
  },
  switchTabs: function () {
    this.setData({
      showRelease: true
    })
  },
  switchTabsTwo: function () {
    this.setData({
      showRelease: false
    })
  },
  switchTaskTabs: function () {
    this.setData({
      showTaskList: false
    })
  },
  switchTaskTabsTwo: function () {
    this.setData({
      showTaskList: true
    })
  },
  toCheckTask: function () {
    wx.navigateTo({
      url: '/pages/teacher/task/check/check'
    })
  },
  announcement: function () {
    wx.navigateTo({
      url: '/pages/teacher/notice/create/create'
    })
  },
  toTaskList: function () {
    wx.navigateTo({
      url: '/pages/teacher/notice/check/check'
    })
  },
  deleteCircle: function () {
    this.setData({
      showShadow: true
    })
  },
  hideShadow: function () {
    this.setData({
      showShadow: false
    })
  },
  createCircle:function(){
    wx.navigateTo({
      url: '/pages/teacher/circle/createCircle/createCircle'
    })
  },
  toClassManager:function(){
    wx.navigateTo({
      url: '/pages/teacher/class/manage/manage'
    })
  },
  toCreateManager:function(){
    wx.navigateTo({
      url: '/pages/teacher/class/updateSchool/updateSchool'
    })
  }
})