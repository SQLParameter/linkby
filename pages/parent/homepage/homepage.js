Page({
  data: {
    showHomepage: true,
    showTask: false,
    showNotice: false,
    showMy: false,
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
    //首页通知内容
    noticeContent:'十一假期临近，学校的放假时间为10.1-10.7',
    //作业勤奋榜
    taskRanking: [{ name: '盼', color: '#17c6ee' }, { name: '锋', color: '#ff9e5c' }, { name: '漆', color:'#ff7b8a' }],
    //通知列表
    noticeList: [
      { id:'2', date: '10-16 周三', title: '关于2016年6月份全国大学英语四六级...', content: '根据省教育招生考试院工作安排，2016年6月份全国大学英语四、六级考试时间定于2016年6月18日。', time: '18：00', isRead: true }, 
    {id:'3', date: '10-16 周三', title: '关于2016年6月份全国大学英语四六级...', content: '根据省教育招生考试院工作安排，2016年6月份全国大学英语四、六级考试时间定于2016年6月18日。', time: '18：00', isRead: false },
    { id:'4', date: '10-16 周三', title: '关于2016年6月份全国大学英语四六级...', content: '根据省教育招生考试院工作安排，2016年6月份全国大学英语四、六级考试时间定于2016年6月18日。', time: '18：00', isRead: true }]
  },
  onLoad: function () {

  },
  showHomepage: function () {
    this.setData({
      showHomepage: true,
      showTask: false,
      showNotice: false,
      showMy: false
    });
  },
  showTask: function () {
    this.setData({
      showHomepage: false,
      showTask: true,
      showNotice: false,
      showMy: false
    });
  },
  showNotice: function () {
    this.setData({
      showHomepage: false,
      showTask: false,
      showNotice: true,
      showMy: false
    });
  },
  showMy: function () {
    this.setData({
      showHomepage: false,
      showTask: false,
      showNotice: false,
      showMy: true
    });
  },
  toTask: function () {
    wx.navigateTo({
      url: '../task/content/content'
    })
  },
  toNotice: function () {
    wx.navigateTo({
      url: '../notice/notice'
    })
  },
  toTaskList: function () {
    wx.navigateTo({
      url: '../task/list/list'
    })
  },
  toNoticeContent:function(event){
    wx.navigateTo({
      url: '../notice/notice?id:' + event.currentTarget.id
    })
  },
  toClassCircle:function(){
    wx.navigateTo({
      url: '../circle/circle'
    })
  }
})