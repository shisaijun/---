Page({
  data:{
    
    foodList:[],
    detailFood:{},
    modalHidden: true,


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
    
    ],


    //订单数据
    orderList: {},
    orderNum: 0,
    orderCost: 0,
    toastHidden: true,

    //轮播图
    imgUrls: [
      'http://p0.qhimgs4.com/t01e585398c93fc4967.jpg',
      'http://m.aiskycn.com/up/2018-4/15226373145154447.jpg',
      'http://www.xz7.com/up/2018-4/15227252453764402.jpg',
      
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 1000,

    //picker
    foodTypes: ['全部菜品', '肉类', '鱼类', '水果', '蔬菜', '主食'],
    foodTypesIndex: 0,
    rankTypes: ['综合排序', '销量', '价格', '好评', '时间'],
    rankTypesIndex: 0
  },

  // 页面初始化 options为页面跳转所带来的参数
  onLoad:function(options){
    
    //全局数据中获得食品列表
    var appInstance = getApp();
    var t_foodList = appInstance.globalData.foodList;

    var t_arr;
    for(var i=0; i<t_foodList.length; i++){
      if(i%2 == 0){
        t_arr = [];
        this.data.foodList.push(t_arr); //整理成二维数据，方便显示
      }
      t_arr.push(t_foodList[i]);
    }
  },

  //关闭食品详情弹窗
  closeModal: function(e) {
    this.setData({
      modalHidden: true
    })
  },

  //展示食品详情弹窗
  imageClick:function(e){

    var dataset = e.currentTarget.dataset;
    
    var appInstance = getApp();
    var t_foodList = appInstance.globalData.foodList;

    //设置数据，自动刷新界面
    this.setData({
      modalHidden: false,
      detailFood: t_foodList[dataset.index],
      detailIndex: dataset.index
    })
  },

  //提交订单
  sublimitClick:function(e){

    //订单列表 传参
    var agrs = JSON.stringify(this.data.orderList);
    wx.navigateTo({
        url: '../order/order?order=' + agrs
    })
  },

  //加入到购物车
  addCartClick:function(e){
    var dataset = e.currentTarget.dataset;
    this.changeNum(dataset.index, true);

    this.setData({
      toastHidden: false
    });

    //1s后关闭
    var _this = this;
    setTimeout(function(){
      _this.setData({
        toastHidden: true
      });
    }, 1000);

    //关闭商品详情面板
    this.closeModal();
  },

  //增加数量
  addClick:function(e){
    var dataset = e.currentTarget.dataset;
    this.changeNum(dataset.index, true);
  },

  //减少数量
  reduceClick:function(e){
    var dataset = e.currentTarget.dataset;
    this.changeNum(dataset.index, false);
  },

  changeNum:function(index, bool){
    var appInstance = getApp();
    var t_food = appInstance.globalData.foodList[index];

    var orderList = this.data.orderList;

    var obj = orderList[t_food.id];

    //如果存在，则数量变化
    if(obj){
        if(bool){
          obj.num = obj.num + 1;
        }else{
          if(obj.num > 0){
            obj.num = obj.num - 1;
          }else{
            return;//已经减少为0
          }
        }
    }else{
        if(bool){
          //不存在，点击增加，则写入一条订单数据，数量默认1
          obj = {
            id: t_food.id,
            num: 1,
            cost: t_food.cost,
            title: t_food.title
          };
          this.data.orderList[t_food.id] = obj;
        }else{
          return;//不存在，并且点击的是减少
        }
    }
    
    var order_num = 0;
    var order_cost = 0;
    for(var k in orderList){
      order_num = orderList[k].num + order_num; //计算总数量
      order_cost = order_cost + orderList[k].cost * orderList[k].num; //计算总价格
    }

    this.setData({
      orderList: orderList,
      orderNum: order_num,
      orderCost: order_cost
    });
  },

  //食品类型
  foodTypeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      foodTypesIndex: e.detail.value
    })
  },

  //排序类型
  rankTypeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      rankTypesIndex: e.detail.value
    })
  },

})