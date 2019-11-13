// components/w-goods-item/w-goods-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsitem: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
musicUrl:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navigationto(){
      // console.log(this.data.goodsitem.url)
      //参数为url时大部分需要解码
      const musicUrl = encodeURIComponent(this.data.goodsitem.url)
      const image = encodeURIComponent(this.data.goodsitem.pic)
      const author = this.data.goodsitem.author
      const title = this.data.goodsitem.title
      const songid=this.data.goodsitem.songid
      // const musicUrl=this.data.goodsitem
      wx.navigateTo({
        url: '../../pages/home/music-item/music-item?musicUrl=' + musicUrl + '&author=' + author + '&image=' + image + '&title=' + title + '&songid=' + songid,
       })
    }
    // itemClick(e) {
    //   // 1.获取iid
    //   const iid = this.data.goodsitem.iid;
    //   // 2.跳转到对应的路径
    //   wx.navigateTo({
    //     url: '/pages/detail/detail?iid=' + iid,
    //   })
    // }
  }
})
