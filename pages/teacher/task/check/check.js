Page({
  data: {
    wwc:false,
    isShowDetails:false,
    detailsHeight:'80rpx;',
    homeworkId: '',
    homeWork: { content: '', imageIds: '', imageArr: [], totalStudents: 0, finishedStudents: 0 },
    unFinishedList: [],
    finishedList: []
  },
  onLoad: function (option) {
    var curModule = this;
    curModule.setData({ homeworkId: option.homeworkId });
    curModule.getHomeworkDetails(function () {
      curModule.getHomeworkCompletion();
    });
  },
  imgYu: function (event) {
    var curModule = this;
    var src = event.currentTarget.dataset.src;//获取data-src
    if (src !='/icons/id_000001_img.png'){
      //图片预览  本地图片不能预览
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: curModule.data.homeWork.imageArr // 需要预览的图片http链接列表
      });
    }    
  },
  noComplete:function(){
    this.setData(
      {wwc:true}
    );
  },
  complete: function () {
    this.setData(
      { wwc: false }
    );
  },
  showDetails:function(){
    if (!this.data.isShowDetails){
      this.setData(
        { isShowDetails: true, detailsHeight: 'auto' }
      );
    }
    else{
      this.setData(
        { isShowDetails: false, detailsHeight: '80rpx' }
      );
    }    
  },

  //获取作业详细信息
  getHomeworkDetails: function (sucFun) {
    var curModule = this;
    var app = getApp();
    app.get_api_data(app.globalData.api_URL.GetHomeworkDetails,
      {
        'classesId': app.globalData.userInfo.teacher.curClassesId,
        'schoolId': app.globalData.userInfo.teacher.schoolId,
        'homeworkId': curModule.data.homeworkId
      },
      function (data) {
        if (data.apiStatus == "200") {
          if (data.data.imageIds != null) {
            data.data.imageArr = data.data.imageIds.split(',');
          }
          curModule.setData({ homeWork: data.data });
          if (typeof (sucFun) == "function") {
            sucFun(data);
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
        'classesId': app.globalData.userInfo.teacher.curClassesId,
        'schoolId': app.globalData.userInfo.teacher.schoolId,
        'homeworkId': curModule.data.homeworkId
      },
      function (data) {
        console.log(JSON.stringify(data.data));
        if (data.apiStatus == "200") {
          curModule.setData({ finishedList: data.data.completeList });
          curModule.setData({ unFinishedList: data.data.unCompleteList });
        } else {
          wx.showToast({ title: data.msg });
        }
      }, function () {
        wx.showToast({ title: "获取失败" });
      });
  }
})