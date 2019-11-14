// pages/cart/cart.js
Page({
  data: {
    musicList:{},
    isplaySong:{}
  },
  onLoad: function (options) {
    this.playing();
    this.setData({
      musicList: {}
    })
    const musicList = wx.getStorageSync('music')
    // console.log(musicList)
    const newList = this.data.musicList;
    for (let i = 0; i <= musicList.length-1;i++){
      newList[i]=musicList[i]
    }
    // newList[newList] = musicList;
    // console.log(newList)
    this.setData({
      musicList: newList
    })
  },
  onReady: function () {

  },
  onShow: function () {
    this.onLoad();
  },
  playing() {
    const isplaySong = wx.getStorageSync('isplaySong')
    console.log(isplaySong)
    this.setData({
      isplaySong: isplaySong
    })
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {
   
  },
  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})