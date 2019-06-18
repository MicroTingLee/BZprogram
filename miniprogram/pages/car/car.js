// pages/car/car.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ceng:false,
    zfceng:false,
    inputvalue:'',
    sheets:0,
    gkje: 0,
    yue: 0,
  },
  pay: function () {
    var inputvalue = this.data.inputvalue//输入的金额
    var facevalue = this.data.facevalue//报账面额 
    if (inputvalue >= facevalue){
      this.setData({
        ceng: true
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '亲,输入的金额不能小于'+facevalue+'元奥',
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
  checkinput:function(e){
    var that=this
    var inputvalue = Number(e.detail.value) 
    var facevalue = this.data.facevalue//报账面额
    var caffe = this.data.caffe//每张服务费
    console.log(facevalue)
    //购卡张数
    var sheets = Number(Math.floor(inputvalue / facevalue)) 
    // 购卡金额
    var gkje=facevalue*sheets
    // 购卡余额
    var yue = inputvalue % facevalue
    // 合计应收
    var tatalmoney = inputvalue+(caffe * sheets)
    that.setData({
      inputvalue:inputvalue,
      sheets:sheets,
      gkje:gkje,
      yue:yue,
      tatalmoney: tatalmoney
    })
  },
  // 扫码支付
  saoma:function(){
    this.setData({
      zfceng:true
    })
  },
  zfcancel:function(){
    console.log(123)
    this.setData({
      zfceng:false
    })
    console.log(this.data.zfceng)
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
  var that=this
  var token = app.globalData.token
  wx.request({
  url: 'https://mcs.lingdie.com/wechat/Bzlogicxcx/cardface',
  method: 'POST',
  data: {
   token:token
  },
  header: {
    'content-type': 'application/json' //默认值
  },
  success: function(res) {
    var caffe = Number(res.data.caffe)
    var facevalue = Number(res.data.facevalue) 
    that.setData({
      caffe: caffe,
      facevalue: facevalue
    })
  },
  fail: function(res) {}
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