<template>
  <div class="recommend" ref="recommend">
      <div>
        <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">  
            <slider v-if="recommends">                
                  <div v-for="item in recommends">
                    <a :href="item.linkUrl">
                    <img :src="item.picUrl" alt="">
                    </a>
                  </div>              
            </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList"  class="item" :unicode="item.dissid">
              <div class="icon">
                <img :src="item.imgurl" alt="" width="120px" height="120px">
              </div>
              <div class="text">
                <h2 class="name">{{item.creator.name}}</h2>
                <p class="desc">{{item.dissname}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slider from 'base/slider/slider'
   import {getRecommend, getDiscList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  //import Scroll from "base/scroll/scroll";

  export default {
    components:{
      Slider,
      
    },
    data() {
      return {
        recommends: [],
        discList:[]
      }
    },
    created() {
      this._getRecommend()
      this._getDiscList()
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      },
    _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
            console.log(res.data)
          }
        })
      },
      
    }   
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .item
            display flex 
            

</style>