// app.js
App({
  onLaunch: function () {
    // 调用云开发初始化方法
    wx.cloud.init({
      env: 'growingmonsters-0gjrrtfq71290f63', 
      traceUser: true
    })
  }
})
