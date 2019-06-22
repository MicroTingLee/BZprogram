// pages/mybank/mybank.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    databox:[]
  },
  zhux:function(e){
    console.log(this,'zhuxua')
    console.log(e,'e')
    var id=e.currentTarget.dataset.id
    console.log(id,'id')
    wx.showModal({
      title: '提示',
      content: '确认注销银行卡？',
      success(res) {
        var that=this
        if (res.confirm) {
          // var that = this
          var token = app.globalData.token
          var cardnum = wx.getStorageSync('cardnum')
          wx.request({
            url: 'https://mcs.lingdie.com/wechat/Bzoneselfxcx/bankdel',
            data: {
              token: token,
              id:id,
              cardnum: cardnum
            },
            header: {
              'content-type': 'application/json' //默认值
            },
            method: 'POST',
            success: function (res) {
              console.log(res, '注销银行卡')
            },
            fail: function (res) {
              console.log('获取报账成功失败')
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  huoqu:function(){
    var that = this
    var token = app.globalData.token
    var cardnum = wx.getStorageSync('cardnum')
    console.log(token, token)
    wx.request({
      url: 'https://mcs.lingdie.com/wechat/Bzoneselfxcx/bankcard',
      data: {
        token: token,
        cardnum: cardnum
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data, '银行卡显示')
        that.setData({
          databox: res.data
        })
      },
      fail: function (res) { },
    })
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
    this.huoqu()
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