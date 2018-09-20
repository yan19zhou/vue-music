<template>
    <div class="rank" v-if="songList.length" >
        
            <div class="top">
                <div class="top-title">
                    <div class="top-img"><img :src="topinfo.pic" alt=""></div>
                    <div class="top-text">
                        <h1>{{topinfo.ListName}}</h1>
                        <p>第{{topinfo.day_of_year}}天</p>
                        <p>{{topinfo.date}}更新</p>
                    </div>
                </div>           
                <div class="top-player" v-show="playType">
                    <progress-circle :percent="percent" :radius="radius">
                        <i @click.stop="togglePlaying" class="icon-mini" :class="miniIcon"></i>
                    </progress-circle>
                    <div class="song-play">
                    <h1>song.Name</h1>
                    <p>song.singer</p> 
                    </div>
                    <div class="download">
                        <i class="icon-ok"></i>
                    </div>
                </div>
                <div ref="playBtn" v-show="!playType" class="palyStart" @click="palyStart">
                    <span class="text">播放全部</span>
                </div>
                <div class="l-wrapper">
                    <scroll :data="songList" class="songWrapper" >
                        <ul class="songs">
                            <li v-for="(song,index) in songList" class="song-list">
                                <p class="song-name"><span :class="{'theme':index<3}">{{index+1}} </span> {{song.data.songname}}</p>
                                <p class="song-singer"><span v-for="item in song.data.singer">{{item.name}}/</span></p>
                            </li>
                        </ul>
                    </scroll>
                </div>               
            </div>                           
    </div> 

</template>
<script>
import Scroll from 'base/scroll/scroll'
import {getTopList} from 'api/rank'
import {ERR_OK} from 'api/config'
import ProgressCircle from 'base/progress-circle/progress-circle'
import {mapMutations} from 'vuex'
import {mapGetters} from 'vuex'

export default {
    data(){
        return{
        songList:[],
        topinfo:{},
        radius:32,
        percent:0,
        playType:false,
        playing:false
        }
    },
    computed:{
     miniIcon() {
      return this.playing ? "icon-pause-mini" : "icon-play-mini";
    },
        ...mapGetters(['playList'])
    },
    components:{
        Scroll,
        ProgressCircle
    },
    created(){
        this._getTopList()

    },
    methods:{
        ...mapMutations({
            setPlayList:'SET_PLAYLIST'
        }),

        palyStart(){
          // this.setPlayList(this.)
          console.log(this.playList)
            this.playType = true
             console.log(this.playType)
        },
        togglePlaying(){
            this.playing = !this.playing
        },
        _getTopList(){
           getTopList().then((res)=>{  
               if(res.code == ERR_OK){
                    console.log(res)       
                    this.songList = res.songlist
                    this.topinfo = res.topinfo
                    this.topinfo.date = res.date
                    this.topinfo.day_of_year =res.day_of_year
               }                
           }) 
        }
    }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"

    .top-title 
        width 100%
        display flex
        margin-top 20px
        margin-left 10px
        align-items center
        .top-img
            width 34%
            img 
                width 100%
        .top-text
            margin-left 10px
            p
                margin-top 20px
                font-size 12px
            h1
                font-size 18px
    .top-player {
        display flex
        flex: 0 0 30px;
        width: 100%;
        margin-top 10px
        padding: 0 20px;
        position relative
        .icon-play-mini, .icon-pause-mini, .icon-playlist {
            font-size: 30px;
            color: $color-theme-d;
        }

        .icon-mini {
            font-size: 32px;
            position: absolute;
            left: 0;
            top: 0;
        }
        .song-play{
            margin-left 10px
            width 60%
        }
        .download{
            width 10%
            color #40b27b
            line-height 40px
        }
        }
    .palyStart
        width 50%
        height 40px
        margin 10px auto
        background-color #40b27b
        text-align center
        border-radius 20px
        span
            line-height 40px
    .theme{
        color $color-theme
    }
    .l-wrapper{
        position: fixed
        width: 100%
        top: 280px
        bottom: 0
        .songWrapper{
            height: 100%
            overflow: hidden;
        }
    }
    
.songs{
    background-color #efeaea
    color #000
    padding-top: 10px;
    .song-list{
        margin 10px
        .song-singer{
            color #ccc
            font-size 12px
            margin-top 8px
            margin-left 10px

        }
        
    }
}


</style>
