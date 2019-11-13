// pages/cart/childCpns/c-cartitem.js
Component({
  properties: {
    musicList:{
      type:Object,
      value:{}
    }
  },
  data: {
  },
  methods: {
    navigationto() {
      // console.log(this.data.goodsitem.url)
      //参数为url时大部分需要解码
      const musicUrl = encodeURIComponent(this.data.musicList.audioSrc)
      const image = encodeURIComponent(this.data.musicList.audioPoster)
      const author = this.data.musicList.audioAuthor
      const title = this.data.musicList.audioName
      const songid = this.data.musicList.songid
      // const musicUrl=this.data.goodsitem
      wx.navigateTo({
        url: '../../pages/home/music-item/music-item?musicUrl=' + musicUrl + '&author=' + author + '&image=' + image + '&title=' + title + '&songid=' + songid,
      })
    }
  }
})
