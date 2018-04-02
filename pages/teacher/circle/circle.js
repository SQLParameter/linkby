Page({
  data: {
    hideview:false
  },
  onLoad: function () {

  },
  deleteCircle:function(){
    this.setData({ hideview:true});
  },
  deleteEnter: function () {
    this.setData({ hideview: false });
  }
})