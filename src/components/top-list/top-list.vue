<template>
<transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage" :rank="rank"></music-list>
</transition>
</template>
<script>
import MusicList from 'components/music-list/music-list'
import {getSongList} from 'api/rank'
import {getSongVkey, createSong} from 'common/js/song'
import {mapGetters} from 'vuex'
import {ERR_OK} from 'api/config'
export default {
    components:{
        MusicList
    },
    data(){
        return {
            songs:[],
            rank: true
        }
    },
    created(){
        this._getSongList()
    },
    computed:{
        title(){
            return  this.topList.topTitle
        },
        bgImage(){
            return  this.songs[0].image
        },       
        ...mapGetters(['topList']),
        
    },
    methods:{
        _getSongList(){
            if (!this.topList.id) {
                this.$router.push({path:'/rank'})
                return 
            }
            getSongList(this.topList.id).then((res)=>{
                if(res.code ===ERR_OK){
                    console.log(res.songlist)
                res.songlist.map((item,index)=>{
                    const mid = item.data.songmid
                    getSongVkey(mid).then((res)=>{
                        if (res.code === ERR_OK) {
                            this.songs.push(createSong(item.data,res.data.items[0].vkey))
                        }                      
                    })
                })
                }
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>


