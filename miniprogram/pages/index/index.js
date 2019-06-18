//index.js
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide:'',
    information:'',
    lgcode:'',
    paom:[],
    totalmoney:'',
    totalsuccess:'',
    totalspeedup:'',
    store1:[],
    vertical: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true
  },
  onLoad: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log('789')
         this.paoma()
        }else{
          this.setData({
            isHide:true
          })
        }
      }
    })
  },

paoma:function(){
  var token=app.globalData.token
  var cardnum = app.globalData.cardnum
  console.log(token,'8989')
  console.log(cardnum,'77777')
  wx.request({
  url: 'https://mcs.lingdie.com/wechat/bzhomexcx/integration',
  method:'POST',
  data:{
    token:token,
    cardnum:cardnum
  },
  header: {
    'content-type': 'application/json' //默认值
  },
  success:res=>{
    console.log(res.data)
    console.log(res.data.paomao,'111')
    this.setData({
      paom: res.data.paomao,
      totalmoney: res.data.total_addup,
      totalsuccess: res.data.total_win,
      totalspeedup: res.data.total_speedup,
      store1:res.data.store,
    })
  }
})
},
// 点击授权 获取unionid后把token等信息传给后台
  bindGetUserInfo:function(e){
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
      wx.getUserInfo({
        success: res => {
          var encryptedData = res.encryptedData
          var iv = res.iv
          var gappid = app.globalData.gappid
          var session_key = wx.getStorageSync('session_key')
          wx.request({
            url: 'https://mcs.lingdie.com/wechat/Basicset/shouquan',
            method:'get',
            data:{
              id:gappid,
              session_key:session_key,
              encryptedData: encryptedData,
              iv: iv
            },
            header: {
              'content-type': 'application/json' //默认值
            },
            success:res=>{
              console.log(res.data,'index')
              var allinformations=JSON.parse(res.data)
              console.log(allinformations,'allinformations')
              allinformations.token=app.globalData.token
              this.setData({
                information: allinformations
              })
              wx.setStorageSync('allinformation', allinformations);
              wx.request({
                url: 'https://mcs.lingdie.com/wechat/Bzegisterxcx/ruku',
                method: 'POST',
                data: allinformations,
                header: {
                  'content-type': 'application/json' //默认值
                },
                success: res => {
                  console.log(res.data.code, 99999999)
                  this.paoma()
                },
                fail:res=>{
                  console.log('传给后台信息失败！')
                }
              })
            },
            fail:res=>{
              console.log('获取u失败！')
            }
          })
          // this.setData({
          //   avatarUrl: res.userInfo.avatarUrl,
          //   userInfo: res.userInfo
          // })
          // wx.login({
          //   success: res => {
          //     var appid = this.data.gappid
          //     var secret = this.data.gsecret
          //     var code = res.code
          //     console.log("用户的code:" + res.code)
          //     wx.request({
          //       url: 'https://mcs.lingdie.com/wechat/Basicset/nihao?id=' + appid + '&js=' + res.code + '&se=' + secret + '&encryptedData=' + encryptedData + '&iv=' + iv,
          //       method: 'post',
          //       success: res => {
          //         console.log(res)
          //         // console.log(res.data.openid,'8000')
          //       }
          //     });

          //   }
          // })
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  // onGetUserInfo: function(e) {
  //   if (!this.logged && e.detail.userInfo) {
  //     this.setData({
  //       logged: true,
  //       avatarUrl: e.detail.userInfo.avatarUrl,
  //       userInfo: e.detail.userInfo
  //     })
  //   }
  // },

  // onGetOpenid: function() {
  //   // 调用云函数
  //   wx.cloud.callFunction({
  //     name: 'login',
  //     data: {},
  //     success: res => {
  //       console.log('[云函数] [login] user openid: ', res.result.openid)
  //       app.globalData.openid = res.result.openid
  //       wx.navigateTo({
  //         url: '../userConsole/userConsole',
  //       })
  //     },
  //     fail: err => {
  //       console.error('[云函数] [login] 调用失败', err)
  //       wx.navigateTo({
  //         url: '../deployFunctions/deployFunctions',
  //       })
  //     }
  //   })
  // },

  // // 上传图片
  // doUpload: function () {
  //   // 选择图片
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: function (res) {

  //       wx.showLoading({
  //         title: '上传中',
  //       })

  //       const filePath = res.tempFilePaths[0]
        
  //       // 上传图片
  //       const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
  //       wx.cloud.uploadFile({
  //         cloudPath,
  //         filePath,
  //         success: res => {
  //           console.log('[上传文件] 成功：', res)

  //           app.globalData.fileID = res.fileID
  //           app.globalData.cloudPath = cloudPath
  //           app.globalData.imagePath = filePath
            
  //           wx.navigateTo({
  //             url: '../storageConsole/storageConsole'
  //           })
  //         },
  //         fail: e => {
  //           console.error('[上传文件] 失败：', e)
  //           wx.showToast({
  //             icon: 'none',
  //             title: '上传失败',
  //           })
  //         },
  //         complete: () => {
  //           wx.hideLoading()
  //         }
  //       })

  //     },
  //     fail: e => {
  //       console.error(e)
  //     }
  //   })
  // },

})
