Page({
  data: {
    selGradeId: '',
    selGradeName: '',
    allGrades: []
  },
  onLoad: function (option) {
    var curModule = this;
    var app = getApp();
    app.get_api_data(app.globalData.api_URL.GetAllGrades, {},
      function (data) {
        if (data.apiStatus == "200") {
          curModule.setData({ allGrades: data.data });
          if (typeof (option.selGradeId) == "string") {
            curModule.setData({ selGradeId: option.selGradeId });
          }
        } else {
          wx.showToast({ title: data.msg });
        }
      }, function () {
        wx.showToast({ title: "获取失败" });
      });
  },
  onUnload: function () {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      gradeId: this.data.selGradeId,
      gradeName: this.data.selGradeName
    });
  },
  //点击选中年级
  selectGrade: function (event) {
    this.setData({ selGradeId: event.currentTarget.dataset.id });
    this.setData({ selGradeName: event.currentTarget.dataset.name });
  }
})