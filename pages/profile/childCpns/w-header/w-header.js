// pages/profile/childCpns/w-header/w-header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tempFilePaths:{
      type:Array,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    sourceType: ['camera', 'album']
  },
  /**
   * 组件的方法列表
   */
  methods: {
    chooseImage(tapIndex){
      const checkeddata=true
      const that=this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: [that.data.sourceType[tapIndex]],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          wx.setStorageSync('tempFilePaths', tempFilePaths)
          that.triggerEvent("traCheckedNum", checkeddata)
        }
      })
    },
    buttonclick: function () {
      const that=this
       wx.showActionSheet({
        itemList: ['拍照', '相册'],
        itemColor: '',
        success: function (res) {
          if (!res.cancel) {
            that.chooseImage(res.tapIndex)
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    },
  }
})
