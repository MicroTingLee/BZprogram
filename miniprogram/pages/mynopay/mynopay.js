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
    zfceng:false,
    time: 60,
    interval1: "",
    interval2: ""  ,
    ordernum:""
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
    that.setData({
      time:60
    })
    var token = app.globalData.token
    var ordernum = e.currentTarget.dataset.ordernum
    console.log(ordernum,'chon')
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
        console.log(res, '付款')
        var dataerwei=""
        dataerwei=JSON.stringify(res.data)
        that.setData({
          zfceng:true,
          ordernum: ordernum
        })
        wxbarcode.qrcode('qrcode', dataerwei, 260, 260);
        that.lunxun();
        that.times()
      }
    })
  },
  // 轮循
  lunxun: function () {
    var that = this
    // 获取二维码成功后，每5秒调取后台确认
    var order = that.data.ordernum
    console.log(order,'lunxunorder')
    var token = app.globalData.token
    // console.log(order, 'order')
    that.data.interval2 = setInterval(function () {
      wx.request({
        url: 'https://mcs.lingdie.com/wechat/Bzlogicxcx/lunxun',
        method: 'POST',
        data: {
          token: token,
          order: order
        },
        header: {
          'content-type': 'application/json' //默认值
        },
        success: function (res) {
          console.log(res)
          var showtime = that.data.time
          console.log(showtime, 'showtimelunxun')
          if (res.data.type == 1) {
            wx.redirectTo({
              url: '../myorder/myorder',
            })
          }
          if (res.data.type == 1 || showtime <= 0) {
            console.log('showtimelunxun')
            that.stoplunxun()
          }
        },
        fail: function (res) { }
      })
    }, 5000)
  },
  // 关闭轮循
  stoplunxun: function () {
    clearInterval(this.data.interval2)
  },
  //倒计时
  times: function () {
    var that = this;
    var showtime = that.data.time;
    console.log('倒计时开始')
    that.data.interval1 = setInterval(function () {
      showtime--;
      console.log(showtime, 'daoji')
      that.setData({
        time: showtime
      })
      if (showtime <= 0) {
        that.stoptimes()
        that.setData({
          zfceng:false
        })
      }
    }, 1000)
  },
  // 清除显示的定时
  stoptimes: function () {
    clearInterval(this.data.interval1)
  },
  // 关闭支付弹窗
  zfcancel:function(){
    var that=this
    that.stoplunxun()
    that.stoptimes()
    that.setData({
      zfceng:false
    })
    // that.huoqu()
  },
  // 删除订单
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
              } else if (res.type == 1){
                console.log(res.msg)
              }
              that.huoqu()
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
  // 获取数据
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
    this.huoqu()
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