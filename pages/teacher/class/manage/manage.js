Page({
  data: {
    list: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
  },
  onLoad: function () {

  },
  tGrade:function(){
    wx.redirectTo({
      url: '/pages/teacher/create/grade/grade'
    })
  }
})