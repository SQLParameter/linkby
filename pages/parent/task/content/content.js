Page({
  data: {
    isComplete:false,
    homeworkId: '',
    homework: null
  },
  onLoad: function (option) {
    var curModule = this;
    curModule.setData({ homeworkId: option.homeworkId });
    curModule.getHomeworkDetails(curModule.getHomeworkCompletion());
  },
  taskComplete:function(){
    var curModule = this;
    var app = getApp();
    if (!this.data.isComplete){
      app.post_api_data(app.globalData.api_URL.MarkHomeworkFinished,
        {
          'classesId': app.globalData.userInfo.family.classesId,
          'schoolId': app.globalData.userInfo.family.schoolId,
          'homeworkId': curModule.data.homeworkId,
          'student': app.globalData.userInfo.family.student,
          'studentId': app.globalData.userInfo.family.studentId,
          'appellation': app.globalData.userInfo.family.appellation,
          'familyId': app.globalData.userInfo.family.id,
          'completion': 1
        },
        function (data) {
          if (data.apiStatus == "200") {
            wx.showToast({ title: '已完成' });
            curModule.setData({ isComplete: true });
          } else {
            wx.showToast({ title: data.msg });
          }
        }, function (err) {
          wx.showToast({ title: '操作失败' });
        });      
    }
    else{
      wx.navigateTo({ url: '../list/list?homeworkId=' + curModule.data.homeworkId + '&date=' + curModule.data.homework.updateDate });
    }
  },

  //获取作业详细信息
  getHomeworkDetails: function (sucFun) {
    var curModule = this;
    var app = getApp();
    app.get_api_data(app.globalData.api_URL.GetHomeworkDetails,
      {
        'classesId': app.globalData.userInfo.family.classesId,
        'schoolId': app.globalData.userInfo.family.schoolId,
        'homeworkId': curModule.data.homeworkId
      },
      function (data) {
        if (data.apiStatus == "200") {
          if (data.data.imageIds != null) {
            data.data.imageArr = data.data.imageIds.split(',');
          }
          var updateDate = new Date(data.data.updateDate);
          var month = updateDate.getMonth() + 1;
          var strDate = updateDate.getDate();
          data.data.showDate = month + "月" + strDate+"日  星期"+ "日一二三四五六".charAt(updateDate.getDay());
          curModule.setData({ homework: data.data });
          if (typeof (sucFun) == "function") {
            sucFun();
          }
        } else {
          wx.showToast({ title: data.msg });
        }
      }, function () {
        wx.showToast({ title: "获取失败" });
      });
  },

  //获取作业完成情况
  getHomeworkCompletion: function () {
    var curModule = this;
    var app = getApp();
    app.get_api_data(app.globalData.api_URL.GetHomeworkCompletion,
      {
        'classesId': app.globalData.userInfo.family.classesId,
        'schoolId': app.globalData.userInfo.family.schoolId,
        'homeworkId': curModule.data.homeworkId
      },
      function (data) {
        if (data.apiStatus == "200") {
          for(var i=0; i<data.data.completeList.length; i++){
            if (data.data.completeList[i].studentId == app.globalData.userInfo.family.studentId){
              curModule.setData({ isComplete: true });
              break;
            }
          }
        } else {
          wx.showToast({ title: data.msg });
        }
      }, function () {
        wx.showToast({ title: "获取失败" });
      });
  },

  imgYu: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgArr = this.data.homework.imageArr;
    //图片预览  本地图片不能预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgArr // 需要预览的图片http链接列表
    });
  },

})