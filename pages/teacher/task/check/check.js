Page({
  data: {
    wwc:true,
    isShowDetails:false,
    detailsHeight:'80rpx;',
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
  },
  showDetails:function(){
    this.setData(
      { isShowDetails: true, detailsHeight:'auto' }
    );
  }
})