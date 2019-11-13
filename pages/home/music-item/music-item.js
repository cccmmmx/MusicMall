const myaudio = wx.createInnerAudioContext();
var myintervi1;
var app = getApp()  
Page({
  /**
   * 页面的初始数据
   */
  data: {
        audioPoster: '',//音乐图片
        audioName: '',//音乐名称
        audioAuthor: '',//作者
        audioSrc: '',//音频
        songid:'',
        isLove:false,
        isplay: false,//是否播放
        haslength: false,//当前是否有音乐的长度
        maxlength: 0,
        musiclist:[],
        value: 0//当前播放到了哪儿
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
       audioSrc: decodeURIComponent(options.musicUrl),
       audioAuthor: options.author,
       audioPoster: decodeURIComponent(options.image),
       audioName: options.title,
       songid: options.songid
     })
     //页面加载时先将缓存中的数据加入到musiclist并判断是否已经时选择收藏
    const music = wx.getStorageSync('music')
    if (music){
      this.setData({
        musiclist: music
      })
      const musiclist=this.data.musiclist
      const newid = options.songid
      for (let i = 0; i <= musiclist.length-1; i++) {
        if (newid == music[i].songid) {
          this.setData({
            isLove: true
          })
        }
      }
    }
  },
  //对用户是否点击收藏进行处理
  islove:function(){
    this.setData({
      isLove:!this.data.isLove
    })
    const music = wx.getStorageSync('music')
    if (music) {
      this.setData({
        musiclist: music
      })
    }
  if (this.data.isLove) {
      const author = this.data.audioAuthor
      const audioPoster = this.data.audioPoster
      const audioName = this.data.audioName
      const audioSrc = this.data.audioSrc
      const songid = this.data.songid
      const musiclist = this.data.musiclist
        musiclist.push({
      'songid': this.data.songid,
      'audioAuthor': author,
      'audioPoster': audioPoster,
      'audioName': audioName,
      'audioSrc': audioSrc, 
      'isLove': this.data.isLove,
    }) 
      wx.setStorageSync(
        'music', musiclist
      )
    wx.showToast({
      title: '收藏成功',
      icon: 'success',
      duration: 2000
    })
    }else{
      //从缓存中删除用户点击不收藏的音乐并加到缓存中
    const storage=wx.getStorageSync('music')
    const isId=this.data.songid;
     for(let i=0;i<=storage.length-1;i++){
       if (isId==storage[i].songid){
         storage.splice(i,1);
         }
     }
    wx.setStorageSync(
      'music', storage
    )
    // wx.removeStorageSync()
    this.setData({
      musiclist:[]
    })
    }
  },
  onShow: function () {
    myaudio.src = this.data.audioSrc
    this.getmusiclength();
  },
  play: function () {
    const that = this;
    myaudio.play();
    //开始循环设置时间
    this.setData({ isplay: true });
    myintervi1 = setInterval(function () {
      var a = that.data.value;
      a++;
      that.setData({ value: a })
    }, 1000);
  },
  // 停止
  stop: function () {
    myaudio.pause();
    clearInterval(myintervi1);
    this.setData({ isplay: false });
  },
  //获取音乐的长度
  getmusiclength: function () {
    const that = this;
    if (myaudio.duration == 0) {
      setTimeout(function () {
        that.data.haslength = false;
        that.getmusiclength();
      }, 100);
    }
    else {
      var a = Math.ceil(myaudio.duration);
      that.setData({
        haslength: true,
        maxlength: a,
        value: 0
      });
    }
  },
  //拖动 结束后重新开始播放
  change: function (e) {
    const that = this;
    // 清除定时器
    clearInterval(myintervi1);
    this.setData({ value: e.detail.value });
    myaudio.seek(e.detail.value);
    myaudio.play();
    //累加刷新页面
    myintervi1 = setInterval(function () {
      var a = that.data.value;
      // console.log(a);
      a++;
      that.setData({ value: a })
    }, 1000);
  },
  changing: function (e) {
    myaudio.stop();
    clearInterval(myintervi1);
    this.setData({ isplay: true });
    // myaudio.pause();
  }
})