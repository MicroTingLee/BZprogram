// pages/experience/experience.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 遮罩层显示
  show: function () {
    this.setData({ flag: false })
  },
  // 遮罩层隐藏
  conceal: function () {
    this.setData({ flag: true })
  },
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
    var that = this
    var token = app.globalData.token
    var cardnum = wx.getStorageSync('cardnum')
    console.log(cardnum, token)
    wx.request({
      url: 'https://mcs.lingdie.com/wechat/Bzoneselfxcx/jy',
      data: {
        token: token,
        cardnum: cardnum
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      method: 'POST',
      success: function (res) {
        console.log(res, '经验')
        that.setData({
          databox: res.data
        })
      },
      fail: function (res) {
        console.log('获取经验值失败')
      },
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