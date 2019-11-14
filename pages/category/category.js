// pages/category/category.js
import { getMusicList } from '../../service/home.js'
const musicpage = ['爱', '你', '一', '直', '很', '安', '静', '安', '静', '他', '不', '懂', '去', '年', '夏', '天', '遇', '见', '喜', '欢', '你', '我', '知', '道', '需', '要', '人', '陪', '我', '很', '快','乐']
const TOP_DISTANCE = 1000
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    list:[],
    showBackTop: false,
    isplaySong:{}
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  // inputTyping: function (e) {
  //   console.log(e.detail.value)
  //   this.setData({
  //     inputVal: e.detail.value
  //   });
  // },
  //通过监听用户按下回车或者搜索
  conFirminput:function(e){
    console.log(e.detail.value)
    this._getMusicList(e.detail.value);
    this.setData({
      inputVal: e.detail.value
    });
  },
  //获取网络数据请求
  _getMusicList(name) {
    getMusicList(name).then(res => {
      console.log(res)
      const listitem = this.data.list
      listitem.push(...res.data.result)
      this.setData({
        list: listitem
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  
  playing() {
    const isplaySong = wx.getStorageSync('isplaySong')
    console.log(isplaySong)
    this.setData({
      isplaySong: isplaySong
    })
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
    this.playing()
  },
  //下拉加载更多
  onReachBottom() {
    const i = Math.floor(Math.random() * 32);
    const name = this.data.inputVal + musicpage[i]
    this._getMusicList(name)
  },
  onPageScroll(option) {
    // console.log(option)
    const scrolltop = option.scrollTop
    const flat1 = scrolltop >= TOP_DISTANCE
    if (flat1 != this.data.showBackTop) {
      this.setData({
        showBackTop: flat1
      })
    }
  }
})