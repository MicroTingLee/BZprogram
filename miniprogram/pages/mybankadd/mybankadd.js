// pages/mybankadd/mybankadd.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check:false,
    state:''
  },
  inputwatch1:function(e){
    var user=e.detail.value
    console.log(user)
    this.setData({
      user:user
    })
  },
  inputwatch2: function (e) {
    var bankcard = e.detail.value

    this.setData({
      bankcard: bankcard
    })
  },
  inputwatch3: function (e) {
    var bankname = e.detail.value
console.log(bankname)
    this.setData({
      bankname: bankname
    })
  },
  check:function(e){
    var length = e.detail.value.length//1是选中 0是未选中
    if(length==1){
      this.setData({
        state:1
      })
    }else{
      this.setData({
        state:0
      })
    }
  },
  savecard:function(){
    var token = app.globalData.token
    var cardnum = wx.getStorageSync('cardnum')
    var bankcard=this.data.bankcard
    var bankname = this.data.bankname
    var state=this.data.state
    wx.request({
      url: 'https://mcs.lingdie.com/wechat/Bzoneselfxcx/bankcard_add',
      method:'POST',
      data:{
        token:token,
        cardnum:cardnum,
        bankname:bankname,
        bankcard: bankcard,
        state:state,
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success:res=>{
        console.log(res.data.msg)
        console.log(res.data.type)
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