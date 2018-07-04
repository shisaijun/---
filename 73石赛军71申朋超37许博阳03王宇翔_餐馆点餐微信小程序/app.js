//app.js
App({
  // onLaunch: function () {
  //   //调用API从本地缓存中获取数据
  //   var logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)
  // },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo: null,
    foodList: [
      {
        id: 1,
        title: "烤面筋",
        cost: 12,
        desc: "面筋哥推荐，可带劲啦！",
        icon: "http://px.thea.cn/Public/Upload/2776627/Intro/1446286861.jpg",
        num: 0
      },
      {
        id: 2,
        title: "龙井虾仁",
        cost: 35,
        desc: "虾仁玉白，鲜嫩；芽叶碧绿，清香。",
        icon: "http://res.cms.hj.cn/a/10001/2016/0912/1473641363853.jpg",
        num: 0
      },
      {
        id: 3,
        title: "西湖醋鱼",
        cost: 32,
        desc: "胸鳍竖起，鱼肉嫩美，带有蟹味，鲜嫩酸甜。",
        icon: "http://a2.att.hudong.com/38/07/20300000929429131799072059842.jpg",
        num: 0
      },
      {
        id: 4,
        title: "凉拌黄瓜",
        cost: 12,
        desc: "香脆爽口，美容养颜，营养丰富。",
        icon: "http://img.taopic.com/uploads/allimg/121016/240425-12101620062616.jpg",
        num: 0
      },
      {
        id: 5,
        title: "爆炒腰花",
        cost: 18,
        desc: "口感鲜嫩，味道醇厚，滑润不腻。",
        icon: "http://img.bbs.zbgl.net/data/attachment/forum/201303/27/235659tlachlzrt5rls58h.jpg",
        num: 0
      },
      {
        id: 6,
        title: "水果拼盘",
        cost: 15,
        desc: "新鲜水果，补充维C",
        icon: "http://p1.meituan.net/deal/__45313080__2423364.jpg",
        num: 0
      },
      {
        id: 7,
        title: "糖醋排骨",
        cost: 36,
        desc: "色泽红亮油润，口味香脆酸甜。",
        icon: "http://imgs.douguo.com/upload/caiku/c/1/2/c1b091dd285109d89e853735639084b2.jpg",
        num: 0
      },
      {
        id: 8,
        title: "麻辣小龙虾",
        cost: 40,
        desc: "好吃！好吃！好吃！",
        icon: "http://img1.gtimg.com/henan/pics/hv1/172/130/1062/69089872.png",
        num: 0
      },
      {
        id: 9,
        title: "饺子",
        cost: 18,
        desc: "好吃不过饺子。",
        icon: "http://file15.zk71.com/File/CorpEditInsertImages/2016/05/08/0_meishi_0060_20160508111148.jpg",
        num: 0
      },
      {
        id: 10,
        title: "回锅肉",
        cost: 30,
        desc: "口味独特，色泽红亮，肥而不腻。",
        icon: "http://img18.3lian.com/d/file/201706/01/9d4796328f3ce93c5a4d8e5045f797e0.jpg",
        num: 0
      }

    ]
    
  }
})