// pages/mynopay/mynopay.js
var wxbarcode = require('../../utils/index.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    databox:[],
    showcen:false
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  // 支付二维码
  zhifu:function(e){
    var that = this
    var token = app.globalData.token
    var ordernum = e.currentTarget.dataset.ordernum
    wx.request({
      url: 'https://mcs.lingdie.com/wechat/Bzlogicxcx/fukuan',
      data:{
        token:token,
        ordernum: ordernum
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success:res=>{
        console.log(res,'付款')
        var databox=JSON.stringify(res.data)
        console.log(databox)
        wxbarcode.qrcode('qrcode', databox, 420, 420);
        that.setData({
          showcen:true
        })
        this.onLoad()
      }
    })
  },
  // 关闭支付弹窗
  zfcancel:function(){
    this.setData({
      showcen:false
    })
  },
  del:function(e){
    var that = this
    var token = app.globalData.token
    var id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确认删除订单？',
      success:res=>{
        if (res.confirm) {
          wx.request({
            url: 'https://mcs.lingdie.com/wechat/Bzlogicxcx/shanchu',
            data: {
              token: token,
              id: id
            },
            header: {
              'content-type': 'application/json'
            },
            method: 'POST',
            success: function (res) {
              console.log(res, '删除订单')
              if(res.type==0){
                console.log(res.msg)
                that.onReady()
              } else if (res.type == 1){
                console.log(res.msg)
              }
            },
            fail: function (res) {
              console.log('删除订单失败')
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
    console.log(token, cardnum)
    wx.request({
      url: 'https://mcs.lingdie.com/wechat/Bzlogicxcx/unpaid',
      data: {
        token: token,
        cardnum: cardnum,
        type: 1
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          databox: res.data
        })
        console.log(res, '待支付')
      },
      fail: function (res) {
        console.log('获取待支付失败')
      }
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
    this.huoqu()
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