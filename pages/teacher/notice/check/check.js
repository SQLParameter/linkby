Page({
  data: {
    wwc:true,
    itemList:[
      {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
    ]
  },
  onLoad: function () {

  },
  tGrade:function(){
    wx.redirectTo({
      url: '/pages/teacher/create/grade/grade'
    })
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
  }
})