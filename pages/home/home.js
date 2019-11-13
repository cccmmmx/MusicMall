import { getMutiData, getMusicList} from '../../service/home.js'
const titles=['pop','new','sell']
const musicpage=['爱你','一直很安静','安静','他不懂','去年夏天','遇见','喜欢你','我知道','需要人陪','我很快乐']
const TOP_DISTANCE=1000
Page({
  /**
   * 页面的初始数据
   */
  data: {
    banner:[],
    recommend:[],
    titles: ["流行", "新款", "精选"],
    goods: {
      'pop': { page: 0, list: [] },
      'new': { page: 0, list: [] },
      'sell': { page: 0, list: [] }
    },
    currentType:'pop',
    showBackTop:false,
    isFixedTop:false,
    tabScrollTop:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const mutidatabanner = wx.getStorageSync('banner');
    const mutidatarecommend = wx.getStorageSync('recommend');
    if (mutidatabanner && mutidatarecommend){
      // const banner=this.data.banner;
      // const recommend = this.data.recommend;
      this.setData({
        banner: mutidatabanner,
        recommend: mutidatarecommend
      })
    }else{
      this._getMutiData();
    }
   
    const goodsview = wx.getStorageSync('goods');
    if (goodsview){
      const goods = this.data.goods;
    this.setData({
      goods: goodsview
    })
    }else{
      this._getMusicList('不要说话', 'pop');
      this._getMusicList('说谎', 'new');
      this._getMusicList('晴天', 'sell');
    }
 
  },
  handleImageLoad(){
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
        // console.log(rect)
          this.data.tabScrollTop=rect.top
    }).exec()
  },
  //得到轮播图的数据
  _getMutiData(){
    getMutiData().then(res => {
      // console.log(res)
      const banner = res.data.data.banner.list;
      const recommend = res.data.data.recommend.list;
      wx.setStorageSync('banner', banner);
      wx.setStorageSync('recommend', recommend);
      // console.log(banner);
      // console.log(recommend);
      this.setData({
        banner: banner,
        recommend: recommend
      })
    })
  },
  //--------------网络请求----------
  // 获取音乐的数据
  _getMusicList(name,type){
    // const page = this.data.goods[type].page;
    getMusicList(name).then(res=>{
      const list=res.data.result
      const goods = this.data.goods;
      goods[type].list.push(...list);
      goods[type].page = Math.floor(Math.random() * 10);
//    const typekey='goods.${type}.list'
//    console.log(typekey)
      wx.setStorageSync('goods', goods);
      this.setData({
        goods:goods
      })
    })
  },
//获取导航返回的值
  handleTabclick(event){
// console.log(event)
const index=event.detail.index
console.log(index)
const types=titles[index]
this.setData({
  currentType:types
})
  },
  onReachBottom(){
    const name = musicpage[this.data.goods[this.data.currentType].page]
    this._getMusicList(name,this.data.currentType)
    wx.showToast({
      title: '正在加载。。。',
      icon: 'loading',
      duration: 1000
    })
  },
  onPageScroll(option){
// console.log(option)
const scrolltop=option.scrollTop
    const flat1 = scrolltop >= TOP_DISTANCE
    if (flat1 != this.data.showBackTop){
      this.setData({
        showBackTop: flat1
      })
    }
    const flat2 = scrolltop >= this.data.tabScrollTop
    if (flat2 != this.data.isFixedTop){
      this.setData({
        isFixedTop:flat2
      })
    }
  }
})