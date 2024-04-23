// pages/monster/monster.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    monsterShapeNUM:0,
    monsterList:["cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/monsters/mon1_attack.gif","cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/monsters/mon1_walk.gif",
  "cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/monsters/mon3_attack.gif",
"cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/monsters/mon3_idle.gif",
"cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/monsters/mon4_jump.gif",
"cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/monsters/mon4_idle.gif",
"cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/monsters/mon2_change_skull.gif",
"cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/monsters/mon2_idle.gif",
"cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/monsters/frog-x4.gif",
"cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/monsters/frog-x4.gif",
"cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/monsters/bat-x4.gif",
"cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/monsters/bat-x4.gif",
"cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/monsters/skeleton-x4.gif",
"cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/monsters/skeleton-x4.gif",
"cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/monsters/catwalkx2.gif",
"cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/monsters/catrunx2.gif"],
    cityLocation:"-",
    areaLocation:"选择地区",
    locationID:"",
    temp_now:"-",
    weather_today:"-",
    weather_icon:"",
    satiation: 0, // 饱食度
    water: 0,     // 水
    intimacy: 0,  // 亲密度
    foodList:["鸡腿","薯条","蛋糕","米饭"],
    Foodlist:["cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/food/鸡腿.svg","cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/food/薯条.svg","cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/food/蛋糕.svg","cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/food/米饭.svg"],
    pick_food:"选择食物",
    chosenfood:"",
    isFoodVisible: true,
    feedAnimation: {},
    drinkAnimation: {},
    isWaterCupVisible: true,
    photo:"cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/other material/拍照.png",
    previewPhoto:"cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/other material/拍照.png",
    tempPhoto:"-",
    isPhotoVisible: true,
    isPhotoChange: false,
    photoAnimation:{},
    isLoveVisible:false,
    loveAnimation:{},
    isSmile:true
  },
  //天气功能
  pick:function(e){
    this.setData({
      cityLocation: e.detail.value[1],
      areaLocation: e.detail.value[2]
    });
    wx.clearStorage();
    wx.setStorage({
      key: "sel_cityLocation",
      data:this.data.cityLocation,
    });
    wx.setStorage({
      key: "sel_areaLocation",
      data:this.data.areaLocation,
    });
    let that = this;
    wx.request({
      url: 'https://geoapi.qweather.com/v2/city/lookup?location=' + that.data.areaLocation+'&adm2='+ that.data.cityLocation+ '&key=9c3a18bc55e043a3938606affe994ccb',
      success:function(res){
        console.log(res.data);
        if (res.data.code === "200") {
          that.setData({
            locationID: res.data.location[0].id  //获取地区ID
          });
          wx.request({
            url: 'https://geoapi.qweather.com/v2/city/lookup?location=' + that.data.areaLocation + '&adm2=' + that.data.cityLocation + '&key=9c3a18bc55e043a3938606affe994ccb',
            success: function (res) {
              console.log(res.data);
              if (res.data.code === "200") {
                that.setData({
                  locationID: res.data.location[0].id  //获取地区ID
                });
                wx.request({
                  url: 'https://devapi.qweather.com/v7/weather/now?location=' + that.data.locationID + '&key=9c3a18bc55e043a3938606affe994ccb',
                  success: function (res) {
                    console.log(res.data);
                    if (res.data.code == "200") {
                      that.setData({
                        temp_now: res.data.now.temp,
                        weather_today: res.data.now.text,
                      });
          
                      // 在这里添加天气判断的逻辑
                      console.log(that.data.weather_today);
          
                      // 更换天气背景
                      if (that.data.weather_today.includes("晴")) {
                        that.setData({
                          weather_icon: "cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/weather/天气-早上-晴朗.png"
                        });
                        console.log("晴！！！！");
                      } else if (that.data.weather_today.includes("云")) {
                        that.setData({
                          weather_icon: "cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/weather/天气.png"
                        });
                        console.log("云！！！！");
                      } else if (that.data.weather_today.includes("雨")) {
                        that.setData({
                          weather_icon: "cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/weather/bfee54c2_E989834_72b820f4.jpg",
                          weather_icon_1: "cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/weather/雨幕.gif"
                        });
                        console.log("雨！！！！");
                      } else if (that.data.weather_today.includes("阴")) {
                        that.setData({
                          weather_icon: "cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/weather/v2-878a13ec2ec9bc83d660b5513e423e1b_r.jpg"
                        });
                        console.log("阴！！！！");
                      } else {
                        that.setData({
                          weather_icon: "cloud://growingmonsters-0gjrrtfq71290f63.6772-growingmonsters-0gjrrtfq71290f63-1322298263/weather/天气-早上-有风.png"
                        });
                        console.log("风！！！！");
                      }
                    }
                  }
                });
                console.log(that.data.locationID);
              } else {
                console.error("获取地点 ID 失败");
              }
            }
          });
          
        } else {
          console.error("获取地点 ID 失败");
        }
      }
    });
  },
  //更新亲密度
  updateProgress: function () {
    // 在这里可以根据你的需求更新其他状态值的进度条，例如亲密度等
    var newIntimacy = Math.min(100, this.data.intimacy + 10);
    this.setData({
      intimacy: newIntimacy,
    });
    console.log('Intimacy Updated:', newIntimacy);
    this.setData({}); // 触发页面渲染
  },
  //更换食物
  changeFood:function(e){
    this.setData({
      pick_food:this.data.foodList[e.detail.value],
      chosenfood:this.data.Foodlist[e.detail.value]
    })
  },
  //喝水
  drink: function () {
    console.log("Drink function called!");
    //触发爱心特效
    this.setData({
      isLoveVisible:true
    },function(){
      this.animate('#love',
      [
        { scale: [1, 1], opacity: 1, offset: 0 },
        { scale: [2, 2], opacity: 0, offset: 3 ,translateY: -40 }
      ],
      1000,function () {
        this.clearAnimation('#love',{ opacity: true, offset: true })
      }.bind(this))
    }) 
    var that = this;
    // 更新进度条
    var newWater = Math.min(100, this.data.water + 30);
    this.setData({
      water: newWater,
      isWaterCupVisible:true
    });
    console.log('water Updated:', newWater);

    // 创建动画
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease-in',
    });
    animation.opacity(1).translate(150, -140).step();
  
    this.setData({
      drinkAnimation: animation.export()
    });
    
    // 延迟一段时间后隐藏水杯
    setTimeout(function () {
      animation.translate(0, 0).opacity(1).step();
      that.setData({
        drinkAnimation: animation.export(),
      });
    }, 1000);
    this.updateProgress();
  },
  //喂食
  feed: function() {
    if(this.data.pick_food == "选择食物"){
      wx.showToast({
        title: '请选择食物类型',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    else{
      console.log("Feed function called!");
      //触发爱心特效
    this.setData({
      isLoveVisible:true
    },function(){
      this.animate('#love',
      [
        { scale: [1, 1], opacity: 1, offset: 0 },
        { scale: [2, 2], opacity: 0, offset: 1 }
      ],
      1000,function () {
        this.clearAnimation('#love',{ opacity: true, offset: true })
      }.bind(this))
    }) 
  
      var that = this;
      var newSatiation = Math.min(100, this.data.satiation + 10);
      this.setData({
        satiation: newSatiation,
      });
      this.setData({
        isFoodVisible: true,
      })
      var animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease-in',
      });
  
      animation.opacity(1).translate(150, -180).step();
      this.setData({
        feedAnimation: animation.export()
      });
  
    setTimeout(function () {
      animation.translate(0, 0).opacity(1).step();
      that.setData({
        feedAnimation: animation.export(),
      });
    }, 1000);
    this.updateProgress();
    }
  },
  //喂照片
  submitPhoto: function() {
    console.log("Submit Photo function called!");
    const photoPath = wx.getStorageSync('capturedPhoto');
    if (!photoPath) {
      wx.showToast({
        title: '没有照片，请先拍照',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    //判断是否微笑
    this.ifSmile();
  },
  //判断笑了没
  ifSmile: function () {
  wx.request({
  url: 'https://api-cn.faceplusplus.com/facepp/v3/detect',
  method: 'POST',
  header: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  data: {
    api_key: 'Ly3UmHugJ9_4A75YK5IaAqb0E6uby76r',
    api_secret: 'b8szn5nPO0J_8kl48EGme3-KAvevN4fv',
    image_url: this.data.tempPhoto,
    return_landmark: 2,
    return_attributes: 'smiling' // 需要检测并返回的属性
  },
  success: (res) => {
    console.log(res.data.faces);
    if (res.data.faces[0].attributes.smile.value < res.data.faces[0].attributes.smile.threshold) {
      wx.showToast({
        title: '你笑得不够开心，请重新拍照！',
        icon: 'none',
        duration: 2000
      });
      // 判断没笑
      this.setData({
        isSmile: false
      });
      console.log("你没笑")
    }
    // 判断笑了
    else{
      this.setData({
        isSmile: true
      })
      console.log("你笑了")
    }
    //如果笑了触发喂食照片
    if (this.data.isSmile) {
      // 触发爱心特效
      this.setData({
        isLoveVisible: true
      }, () => {
        this.animate('#love',
          [
            { scale: [1, 1], opacity: 1, offset: 0 },
            { scale: [2, 2], opacity: 0, offset: 1 }
          ],
          1000, () => {
            this.clearAnimation('#love', { opacity: true, offset: true })
          });
      });
      var newIntimacy = Math.min(100, this.data.intimacy + 50);
      this.setData({
        intimacy: newIntimacy,
      });
      this.setData({
        isPhotoVisible: true,
      });
      var animation = wx.createAnimation({
        duration: 400,
        timingFunction: 'ease-in'
      });
      animation.scale(1.2).opacity(1).step();
      this.setData({
        photoAnimation: animation.export()
      });
      setTimeout(() => {
        animation.scale(1).opacity(0).step();
        this.setData({
          photoAnimation: animation.export(),
          isPhotoVisible: false,
        });
        // 清空照片路径
        wx.removeStorageSync('capturedPhoto');
      }, 1000);
      // console.log(this.data.previewPhoto);
      // console.log(this.data.photo)
      //触发下渲染
      this.setData({});
    }
  },
  fail: (error) => {
    console.error(error);
    console.error(error.data.error_message);
  }
});

  },  
  //判断亲密度是否已满
  ifFull:function () {
    if(this.data.intimacy == 100){
      this.changeShape();
    }
  },
  //改变怪兽形态
  changeShape:function() {
    this.setData({
      monsterShapeNUM:this.data.monsterShapeNUM + 1
    })
  },
  //更换怪兽
  changeMonster:function(){
    this.setData({
      monsterShapeNUM:(this.data.monsterShapeNUM + 2)%this.data.monsterList.length
    })
    console.log(this.data.monsterShapeNUM)
    this.clearStatus()
  },
  //拍照按钮
  takePhoto:function () {
    wx.navigateTo({
      url: '../photo/photo',
    })
  },
  //图鉴
  showAllmonsters: function() {
   wx.navigateTo({
     url: '../gallery/gallery',
   })
  },
  //清空状态
  clearStatus:function(){
    this.setData({
      satiation: 0, // 饱食度
      water: 0,     // 水
      intimacy: 0,  // 亲密度
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      this.clearStatus();
      //初始化爱心动画
      this.setData({
        loveAnimation: wx.createAnimation({
          duration: 1000,
          timingFunction: 'ease-in',
        })
      })
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 获取照片
    const photoPath = wx.getStorageSync('capturedPhoto');
    this.setData({
      photo: photoPath
    });
    console.log(this.data.photo)
    // 存储照片到云
    wx.cloud.uploadFile({
      cloudPath: 'photos/photo.png', // 上传至云端的路径
      filePath: this.data.photo, // 小程序临时文件路径
      success: res => {

        // 返回文件 ID
        console.log(res.fileID);
  
        // 获取照片的下载地址
        wx.cloud.getTempFileURL({
          fileList: [res.fileID],
          success: res => {
            // fileList 是一个有如下结构的对象数组
            // [{
            //    fileID: 'cloud://xxx.png', // 文件 ID
            //    tempFileURL: '', // 临时文件网络链接
            //    maxAge: 120 * 60 * 1000, // 有效期
            // }]
            console.log(res.fileList[0].tempFileURL);
  
            // 把下载地址存入到 tempPhoto
            this.setData({
              tempPhoto: res.fileList[0].tempFileURL
            });
  
            // 在这里可以执行一些操作，因为上传到云并获取下载地址成功了
            console.log(this.data.tempPhoto);
          },
        });
      },
    });
    this.setData({})
  },
  

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})