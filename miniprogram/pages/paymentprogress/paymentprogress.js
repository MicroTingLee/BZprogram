// pages/paymentprogress/paymentprogress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    active: true,
  },

  //加速报账弹窗
  // 遮罩层显示
  show: function () {
    this.setData({ flag: false })
  },
  // 遮罩层隐藏
  conceal: function () {
    this.setData({ flag: true })

  },
  //立即赚钱经验值
  appear: function () {
    this.setData({ active: false })
  },
  hid: function () {
    this.setData({ active: true })
  },
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