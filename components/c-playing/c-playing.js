// components/c-playing/c-playing.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isplaySong:{
      type:Object
    }
  },
 
  /**
   * 组件的初始数据
   */
  data: {
    //  isplaySong:{}
  },
  // attached(){
  //   const isplaySong = wx.getStorageSync('isplaySong')
  //   this.setData({
  //     isplaySong: isplaySong
  //   })
  // },
 
  /**
   * 组件的方法列表
   */
  methods: {
    
    toPlaying(){
      const musicUrl = encodeURIComponent(this.properties.isplaySong.audiolist.audioSrc)
      const image = encodeURIComponent(this.properties.isplaySong.audiolist.audioPoster)
      const author = this.properties.isplaySong.audiolist.audioAuthor
      const title = this.properties.isplaySong.audiolist.audioName
      const songid = this.properties.isplaySong.audiolist.songid
     
      wx.navigateTo({
        url: '../../pages/home/music-item/music-item?musicUrl=' + musicUrl + '&author=' + author + '&image=' + image + '&title=' + title + '&songid=' + songid,
      })
    }
  }
})
