// pages/car/car.js
var wxbarcode = require('../../utils/index.js');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ceng: false,
    zfceng: false,
    inputval:'',
    sheets: 0,
    gkje: 0,
    yue: 0,
    tatalmoney:"",
    order: '',
    time:60,
    interval1:"",
    interval2:""
  },
  // 进入页面数据展示
  shuju:function(){ 
    var that = this
    var token = app.globalData.token
    var cardnum = wx.getStorageSync('cardnum')
    wx.request({
      url: 'https://mcs.lingdie.com/wechat/Bzlogicxcx/cardface',
      method: 'POST',
      data: {
        token: token,
        cardnum:cardnum
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        console.log('shuju')
        var caffe = Number(res.data.caffe)
        var facevalue = Number(res.data.facevalue)
        that.setData({
          caffe: caffe,
          facevalue: facevalue
        })
      },
      fail: function (res) { }
    })
  },
  // 点击支付
  pay: function() {
    var inputvalue = this.data.inputval //输入的金额
    var facevalue = this.data.facevalue //报账面额 
    if (inputvalue >= facevalue) {
      this.setData({
        ceng: true
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '亲,输入的金额不能小于' + facevalue + '元奥',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    }

  },
  checkinput: function(e) {
    var that = this
    var inputval = e.detail.value
    var inputvalue = Number(e.detail.value)
    console.log(inputvalue)
    var facevalue = this.data.facevalue //报账面额
    var caffe = this.data.caffe //每张服务费
    console.log(facevalue)
    //购卡张数
    var sheets = Number(Math.floor(inputvalue / facevalue))
    // 购卡金额
    var gkje = facevalue * sheets
    // 购卡余额
    var yue = inputvalue % facevalue
    // 合计应收
    var tatalmoney = inputvalue + (caffe * sheets)
    that.setData({
      inputval: inputval,
      sheets: sheets,
      gkje: gkje,
      yue: yue,
      tatalmoney: tatalmoney
    })
  },
  // 扫码支付
  saoma: function() {
    var that = this
    var token = app.globalData.token
    var cardnum = wx.getStorageSync('cardnum')
    var allmoney = that.data.tatalmoney
    console.log(cardnum)
    console.log(token)
    wx.request({
      url: 'https://mcs.lingdie.com/wechat/Bzlogicxcx/ordersave',
      data: {
        token: token,
        cardnum: cardnum,
        allmoney: allmoney,
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      method: 'POST',
      success: function(res) {
        console.log(res.data, '购买')
        var code = res.data.code
        if (code == 1) {
          var info = JSON.parse(res.data.info)
          var order1 = info.order
          console.log(order1, 'order111')
          that.setData({
            order: order1
          })
          var codes = JSON.parse(res.data.info)
          var allmoney1 = String(that.data.tatalmoney)
          codes.allmoney = allmoney1
          var codes1 = JSON.stringify(codes)
          console.log(codes1, 'info')
          wxbarcode.qrcode('qrcode', codes1, 260, 260);
          that.setData({
            zfceng: true
          })
          console.log('成功')
        //  每5s调取轮寻
          that.lunxun()
          // 二维码下面的支付时间倒计时
          that.times()
        } else if (code == 3) {
         console.log(res.data.msg)
        }else if(code==4){
          wx.navigateTo({
            url: '../mynopay/mynopay',
          })
          console.log('有订单未支付')
        }

      },
      fail: function(res) {
        console.log('购卡失败')
      }
    })
  },
  // 未点击扫码支付关闭取消跳转
  smcancel:function(){
    wx.navigateTo({
      url: '../mynopay/mynopay',
    })
  },
  // 轮循
  lunxun:function(){
    var that=this
    // 获取二维码成功后，每5秒调取后台确认
    var order=that.data.order
    var token=app.globalData.token
      // console.log(order, 'order')
    that.data.interval2=setInterval(function(){
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
            var showtime=that.data.time
            console.log(showtime,'showtimelunxun')
            if(res.data.type==1){
              console.log('跳转到我的订单页面')
            } else if (showtime <= 0 && res.data.type == 1){
              console.log('跳转到我的订单页面')
            } else if (showtime <= 0){
             wx.navigateTo({
                url: '../mynopay/mynopay',
              })
            }
            if (res.data.type == 1 ||showtime<=0){
              console.log( 'showtimelunxun')
              that.stoplunxun()
            }
          },
          fail: function (res) { }
        })
      },5000) 
  },
  // 关闭轮循
  stoplunxun:function(){
    clearInterval(this.data.interval2)
  },
  //倒计时
  times:function(){
    var that=this;
    var showtime=that.data.time;
    console.log('倒计时开始')
    that.data.interval1=setInterval(function(){
      showtime--;
      console.log(showtime,'daoji')
      that.setData({
        time: showtime
      })
      if(showtime<=0){
        that.stoptimes()
      }
    },1000)
    },
  // 清除显示的定时
  stoptimes:function(){
    clearInterval(this.data.interval1)
  },
  // 关闭二维码
  zfcancel: function() {
    console.log(123)
    this.setData({
      zfceng: false
    })
    this.stoptimes();
    this.stoplunxun()
    console.log(this.data.zfceng)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.shuju()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() { 
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    // console.log('yingcang')
    var that = this
    that.setData({
      ceng: false,
      zfceng: false,
      inputvalue: "",
      sheets: 0,
      gkje: 0,
      yue: 0,
      tatalmoney: ""
    })
    that.shuju()
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})