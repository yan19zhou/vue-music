<template>
    <transition name="slide">      
        <music-list :songs="songs" :title="title" :bg-image="bgImage">
        </music-list>         
    </transition>    
</template>
<script>
import {mapGetters} from 'vuex'
import {getSingerDetailList} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong, getSongVkey} from 'common/js/song'
import musicList from 'components/music-list/music-list'
export default {
    data() {
        return {
        songs: []
        }
    },
    computed:{
        title(){
         return this.singer.name
        },
        bgImage(){
        return this.singer.avator
        },
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
                let list = res.data.list               
                this.songs = this._normalizeSongs(list)
                console.log(this.songs)
              }
          }) 
        },
        _normalizeSongs(list){          
            let ret = []
            list.forEach(e => {
               let musicData = e.musicData 
               if (musicData.songmid && musicData.albummid) {
                getSongVkey(musicData.songmid).then((res)=>{
                    if (res.code == ERR_OK) {
                        let vkey = res.data.items[0].vkey
                         ret.push(createSong(musicData,vkey)) 
                    }
                })
                 
               }
            });
            return ret           
        }
    },
    components:{
        musicList
    }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"


.slide-enter-active, .slide-leave-active
    transition all .3s 
.slide-enter,.slide-leave-to
    transform translate3d(100%,0,0)
</style>


