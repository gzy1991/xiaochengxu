//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    msg: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //获取实例
  getAppInst:function(){
    console.log(getApp().globalData)
  },
  //事件处理函数  点击我
  clickMe: function () {
    //console.log(this.msg)
    //temp = this.msg
    this.setData({ motto: this.data.motto + app.globalData.userInfo.nickName})
    //this.setData({ msg: app.globalData.userInfo.nickName+"Hello World" })
  },
  //点击地图
  markertap:function(){
    //console.log("你点击了地图")
    this.setData({ motto: this.data.motto + "你点击了地图"})
  },
  //扫一扫
  scan:function(){
    wx.scanCode({
      success: (res) => {
        console.log(res)
        this.setData({ motto: this.data.motto +res.result })
      }
    })
  },
  //获取位置
  getLocation: function () {
    wx.getLocation({
      success: (res) => {
        var latitude = res.latitude // 经度
        var longitude = res.longitude // 纬度
        console.log(latitude)
        console.log(longitude)
        this.setData({ motto: this.data.motto+"当前位置:"+latitude + "" + longitude})
      }
    })
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) { 
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
