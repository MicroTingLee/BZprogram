// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    userimg:'',
    exprience:'',
    yue:''

  },
  // wx.switchTab({

  // }),
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
    var that=this
    var token = app.globalData.token
    var cardnum=wx.getStorageSync('cardnum')
    wx:wx.request({
      url: 'https://mcs.lingdie.com/wechat/Bzoneselfxcx/personal_center',
      data: {
        token:token,
        cardnum:cardnum
      },
      header: {
        'content-type': 'application/json' 
      },
      method: 'POST',
      success: function(res) {
        console.log(res.data.nickname)
        console.log(res.data.headimgurl)
        console.log(res.data)
        that.setData({
          username:res.data.nickname,
          userimg:res.data.headimgurl,
          exprience: res.data.exp,
          yue: res.data.yue
          
        })
      },
      fail: function(res) {
        console.log('my获取信息失败')
      }
    })
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

  }
})