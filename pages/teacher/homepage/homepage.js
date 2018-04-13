// pages/teacher/create/homepage/homepage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //确认框
    showShadow: false,
    showHomepage: false,
    showTask: false,
    showCircle: true,
    showMy: false,
    taskDate: '10-12',
    conf: '10',
    cont: '50',
    isRelease: false,
    showRelease: true,
    showTaskList: false,
    taskItems: [{
      date: '10-16 周三',
      time: ' 18：00',
      isTouchMove: false
    }, {
      date: '10-16 周三',
      time: ' 18：00',
      isTouchMove: false
    }, {
      date: '10-16 周三',
      time: ' 18：00',
      isTouchMove: false
    }],
    startX: 0, //开始坐标
    startY: 0, //开始坐标
    circleList: [{

    }, {
      imgList: [{}]
    }, {
      imgList: [{}, {}]
    }, {
      imgList: [{}, {}, {}]
    }, {
      imgList: [{}, {}, {}, {}]
    }, {
      imgList: [{}, {}, {}, {}, {}]
    }, {
      imgList: [{}, {}, {}, {}, {}, {}]
    }, {
      imgList: [{}, {}, {}, {}, {}, {}, {}]
    }, {
      imgList: [{}, {}, {}, {}, {}, {}, {}, {}]
    }, {
      imgList: [{}, {}, {}, {}, {}, {}, {}, {}, {}]
    }],
    classList: [{ isNow: false }, { isNow: true }]
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
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.taskItems.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      taskItems: this.data.taskItems
    })
  },
  //滑动事件处理
  touchmove: function (e) {

    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.taskItems.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      taskItems: that.data.taskItems
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
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
  createCircle: function () {
    wx.navigateTo({
      url: '/pages/teacher/circle/createCircle/createCircle'
    })
  },
  toClassManager: function () {
    wx.navigateTo({
      url: '/pages/teacher/class/manage/manage'
    })
  },
  toCreateManager: function () {
    wx.navigateTo({
      url: '/pages/teacher/class/updateSchool/updateSchool'
    })
  },
  imgYu: function (event) {
    var src = '/icons/id_000001_img.png'; //event.currentTarget.dataset.src;//获取data-src
    //图片预览  本地图片不能预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: ['/icons/id_000001_img.png'] // 需要预览的图片http链接列表
    })
  }

})