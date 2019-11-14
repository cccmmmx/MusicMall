const myaudio = wx.createInnerAudioContext();
var myintervi1;
var app = getApp()  
Page({
  /**
   * 页面的初始数据
   */
  data: {
        // audioPoster: '',//音乐图片
        // audioName: '',//音乐名称
        // audioAuthor: '',//作者
        // audioSrc: '',//音频
        // songid:'',
        audiolist:{},
        isLove:false,
        isplay: false,//是否播放
        haslength: false,//当前是否有音乐的长度
        maxlength: 0,
        musiclist:[],
        value: app.globalData.value//当前播放到了哪儿
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  this.setData({
    //    audioSrc: decodeURIComponent(options.musicUrl),
    //    audioAuthor: options.author,
    //    audioPoster: decodeURIComponent(options.image),
    //    audioName: options.title,
    //    songid: options.songid
    //  })
    const audiolist={}
    audiolist['songid'] = options.songid
    audiolist['audioSrc'] = decodeURIComponent(options.musicUrl)
    audiolist['audioAuthor'] = options.author
    audiolist['audioPoster'] = decodeURIComponent(options.image)
    audiolist['audioName'] = options.title
    this.setData({
      audiolist: audiolist
    })
   console.log(this.data.audiolist.audioAuthor)
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
    const author = this.data.audiolist.audioAuthor
    const audioPoster = this.data.audiolist.audioPoster
    const audioName = this.data.audiolist.audioName
    const audioSrc = this.data.audiolist.audioSrc
    const songid = this.data.audiolist.songid
    const musiclist = this.data.musiclist
        musiclist.push({
          'songid': songid,
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
    const isId = this.data.audiolist.songid;
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
    //进入音乐播放界面时判断音乐是否播放，如果是就继续播放，否则获取播放其他音乐
    const that=this
    clearInterval(myintervi1);
    const isplaySong= wx.getStorageSync('isplaySong')
    if (isplaySong && isplaySong.audiolist.songid == that.data.audiolist.songid){
      myaudio.src=isplaySong.audiolist.audioSrc
      that.setData({
        isplay: isplaySong.audiolist.isplay,
        value: app.globalData.value
      })
      if (isplaySong.isplay){
        this.play()
      }
    }else{
      myaudio.src = that.data.audiolist.audioSrc
    }
    that.getmusiclength();
  },
  onUnload(){
    // const that=this
    this.triggerEvent("traPing", true)
    if(this.data.isplay){
      wx.setStorageSync('isplaySong', {
        'audiolist': this.data.audiolist,
        'isplay': true
      })
    }else{
      wx.setStorageSync('isplaySong', {
        'audiolist': this.data.audiolist,
        'isplay': false
      })
    }
  },
  play: function () {
    const that = this;
    myaudio.play();
    //开始循环设置时间
    this.setData({ isplay: true });
    myintervi1 = setInterval(function () {
      var a = that.data.value;
      a++;
      //将播放时间保持到全局变量中，以便保存音乐的播放状态
      app.globalData.value=a
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
        value: this.data.value
      });
    }
  },
  //拖动 结束后重新开始播放
  change: function (e) {
    const that = this;
    // 清除定时器
    clearInterval(myintervi1);
    this.setData({ value: e.detail.value });
    app.globalData.value = e.detail.value
    myaudio.seek(e.detail.value);
    myaudio.play();
    //累加刷新页面
    myintervi1 = setInterval(function () {
      var a = that.data.value;
      a++;
      that.setData({ value: a })
    }, 1000);
  },
  changing: function (e) {
    // myaudio.stop();
    clearInterval(myintervi1);
    this.setData({ isplay: true });
    // myaudio.pause();
  }
})