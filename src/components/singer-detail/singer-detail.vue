<template>
    <transition name="slide">
        <div class="singer-detail"></div>
    </transition>    
</template>
<script>
import {mapGetters} from 'vuex'
import {getSingerDetailList} from 'api/singer'
import {ERR_OK} from 'api/config'
export default {
    computed:{
         ...mapGetters([
        'singer'
      ])
    },
    created(){
        //console.log(this.singer.id)
        this._getDetail() 
    },
    methods:{
        _getDetail(){
            if (!this.singer.id) {
              this.$router.push({
                  path:'/singer'
              })  
              return
            }
          getSingerDetailList(this.singer.id).then((res)=>{
              if(res.code==ERR_OK){
                  console.log(res.data.list)
              }
          }) 
        }
    }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"

.singer-detail
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    background-color $color-background
.slide-enter-active, .slide-leave-active
    transition all .3s 
.slide-enter,.slide-leave-top 
    transform translate3d(100%,0,0)
</style>


