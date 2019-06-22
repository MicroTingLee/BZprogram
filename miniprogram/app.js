//app.js
App({
  onLaunch: function () {
    wx.getSetting({
      success: res => {
        wx.login({
          success: res => {
            var appid = this.globalData.gappid
            var secret = this.globalData.gsecret
            this.globalData.code=res.code
            wx.request({
              url: 'https://mcs.lingdie.com/wechat/Basicset/nihao?id=' + appid + '&js=' + res.code + '&se=' + secret,
              method: 'post',
              header: {
                'content-type': 'application/json' //默认值
              },
              success: res => {
                console.log(res,'app')
               this.globalData.openid=res.data.openid
               this.globalData.session_key=res.data.session_key
                wx.setStorageSync('openid', res.data.openid);
                wx.setStorageSync('session_key', res.data.session_key);
              }
            });

          }
        })
        
      }
    })
  },
  //ajax请求方法封装
  ajaxData: function (url, data, method, callBack) {
    var that = this;
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        //console.log(res);
        // setTimeout(function () {
        //   wx.hideLoading()
        // }, 500)
        callBack(res);
      },
      fail: function (res) {
        console.log(4)
        wx.showToast({
          title: '网络开了小差~',
        })
      },
      complete: function (res) {
        setTimeout(function () {
          wx.hideLoading()
        }, 200)
      }
    })
  },
  // //上啦刷新
  onRefresh: function (obj) {
    var that = this;
    wx.showLoading({
      title: '刷新中',
    })
  },
  globalData: {
    token:'kmxy1553749618',
    userInfo:'',
    gappid: 'wx1d1dd19a8bdd9770',
    gsecret: '539d35d13c8f6bca5a61b0f7545d52df',
    oppenid:'',
    session_key:'',
  }
})
