<template>
    <div class="player" v-show="playList.length>0">        
        <transition name="normal" 
          @enter="enter"
          @after-enter="afterEnter"
          @leave="leave"
          @after-leave="afterLeave"
        >
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle" @touchstart.prevent="middleTouchStart" @touchmove.prevent="middleTouchMove" @touchend.prevent="middleTouchEnd">
          <div class="middle-l" >
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img  class="image"  :src="currentSong.image" ref="cdImage">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">
                
              </div>
            </div>
          </div>
          <scroll class="middle-r" ref="lyric">
            <div class="lyric-wrapper">
              <div >
                <p ref="lyricLine"
                   class="text">
<<<<<<< HEAD
                  dalfnafoie
                rnlafnaskhfas
=======
                    <light></light>
>>>>>>> ada42a5461eb46a67064c88a3c26b0f6322bbbc5
                   </p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
<<<<<<< HEAD
            <span class="dot" :class="{'active':currentShow=='cd'}"></span>
            <span class="dot" :class="{'active':currentShow=='lyric'}"></span>
=======
            <span class="dot" :class="{active:currentShow=='cd'}" ></span>
            <span class="dot" :class="{active:currentShow=='lyric'}" ></span>
>>>>>>> ada42a5461eb46a67064c88a3c26b0f6322bbbc5
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :precent="precent" @precentChange="precentChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left" >
              <i :class="iconMode" @click="modeChange"></i>
            </div>
            <div class="icon i-left" :class="playVisiable">
              <i @click="prev" class="icon-prev" ></i>
            </div>
            <div class="icon i-center" >
              <i @click="togglePlaying"  :class="playIcon"></i>
            </div>
            <div class="icon i-right" :class="playVisiable" >
              <i @click="next" class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
      <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img  :class="cdCls" width="40" height="40" :src="currentSong.image">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name" ></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <progress-circle :radius="radius" :percent="precent">
             <i @click.stop="togglePlaying" class="icon-mini" :class="miniIcon"></i>
          </progress-circle>
        </div>
        <div class="control" @click.stop="showPlaylist">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url" 
      @canplay="ready" 
      @error="error" 
      @timeupdate="updateTime" 
      @ended="ended"></audio>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import Scroll from "base/scroll/scroll";
import ProgressBar from "base/progress-bar/progress-bar";
import { mapMutations } from "vuex";
import animations from "create-keyframe-animation";
import { prefixStyle } from "common/js/dom";
import ProgressCircle from "base/progress-circle/progress-circle"
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import  Light from "./light"
const transform = prefixStyle("transform");
const transitionDuration = prefixStyle("transitionDuration")
export default {
  data() {
    return {
      songReady: false,
      currentTime: 0,
      radius:32,
      currentShow:'cd'
    };
  },
  computed: {
    iconMode(){
     return  this.mode == playMode.sequence ? 'icon-sequence' :this.mode == playMode.loop ? 'icon-loop' :'icon-random'
    },
    precent() {
      return this.currentTime / this.currentSong.duration;
    },
    playVisiable() {
      this.songReady ? "" : "disable";
    },
    cdCls() {
      return this.playing ? "play" : "pause";
    },
    playIcon() {
      return this.playing ? "icon-pause" : "icon-play";
    },
    miniIcon() {
      return this.playing ? "icon-pause-mini" : "icon-play-mini";
    },
    ...mapGetters([
      "fullScreen",
      "playList",
      "currentSong",
      "playing",
      "currentIndex",
      "mode",
      "sequenceList"
    ])
  },
  created() {
  this.touch = {};
  },
  methods: {
    back() {
      this.setFullScreen(false);
    },
    open() {
      this.setFullScreen(true);
    },
    ...mapMutations({
      setPlaying: "SET_PLAYING_STATE",
      setFullScreen: "SET_FULLSCREEN",
      setCurrentIndex: "SET_CURRENTINDEX",
      setMode:"SET_MODE",
      setPlayList:"SET_PLAYLIST"
    }),
    enter(el, done) {
      const { x, y, scale } = this._getPosAndScale();
      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      };
      animations.registerAnimation({
        name: "move",
        animation,
        presets: {
          duration: 500, // 持续时间
          easing: "linear" // 过度效果
        }
      });
      animations.runAnimation(this.$refs.cdWrapper, "move", done);
    },
    afterEnter() {
      animations.unregisterAnimation("move");
      this.$refs.cdWrapper.style[transform] = "";
    },
    leave() {
      this.$refs.cdWrapper.style.transition = "all 1s";
      const { x, y, scale } = this._getPosAndScale();
      this.$refs.cdWrapper.style[
        transform
      ] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
      //  this.$refs.cdWrapper.addEventListener('transitionend', done)
    },
    afterLeave() {
      this.$refs.cdWrapper.style[transform] = "";
      this.$refs.cdWrapper.style.transition = "";
    },
    togglePlaying() {
      this.setPlaying(!this.playing);
    },
    ready() {
      this.songReady = true;
    },
    error() {
      this.songReady = true;
    },
    prev() {
      if (!this.songReady) {
        return;
      }
       //重置播放条
      this.currentTime = 0;
      let index = this.currentIndex - 1;
      if (index === -1) {
        index = this.playList.length - 1;
      }
      this.setCurrentIndex(index);
      if (!this.playing) {
        this.togglePlaying();
      }
      this.songReady = true;
    },
    next() {
      if (!this.songReady) {
        return;
      }
      //重置播放条
      this.currentTime = 0;
      let index = this.currentIndex + 1;
      if (index === this.playList.length) {
        index = 0;
      }
      this.setCurrentIndex(index);
      if (!this.playing) {
        this.togglePlaying();
      }
      this.songReady = true;
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime;
    },
    ended(){
      if(this.mode == playMode.loop){
        this.loop()
      }else{
      this.next()
      }
    },
    loop(){
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
    },
    showPlaylist() {},
    format(interval) {
      // 格式化分秒
      interval = interval | 0;
      let minute = (interval / 60) | 0;
      let second = this._pad(interval % 60);
      return `${minute}:${second}`;
    },
    precentChange(precent){
        this.currentTime = this.currentSong.duration*precent
        this.$refs.audio.currentTime = this.currentTime
        if (!this.playing) {
          this.togglePlaying();
        }
    },
    modeChange(){
      let mode = (this.mode+1)%3
      this.setMode(mode)
      let list =[]
      if (mode == playMode.random) {
        list = shuffle(this.sequenceList)
      }else{
        list = this.sequenceList
      }
      
      this.resetCurrentIndex(list)
      this.setPlayList(list)     
    },
    resetCurrentIndex(list){
      let index = list.findIndex((item)=>{
        return item.id == this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    middleTouchStart(e){
       this.touch.initiated = true
       // 用来判断是否是一次移动
       this.touch.moved = false
       let touchStart = e.touches[0]
       this.touch.startX = touchStart.pageX
       this.touch.startY = touchStart.pageY
      // console.log(this.this.touch.startX)
    },
    middleTouchMove(e){
      if (!this.touch.initiated) {
          return
        }
        const touch = e.touches[0]
        const deltaX = touch.pageX - this.touch.startX
        const deltaY = touch.pageY - this.touch.startY
        this.touch.precent = Math.abs(deltaX/window.screen.width)
        if(Math.abs(deltaY) > Math.abs(deltaX)){
          return 
        }
        if (!this.touch.moved) {
          this.touch.moved = true
        }
        const left = this.currentShow === 'cd'?0:window.innerWidth
        const offsetWidth = Math.min(0,Math.max(-window.innerWidth,deltaX+left))
        this.$refs.lyric.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.lyric.$el.style[transitionDuration] = 0
        this.$refs.cdImage.style.opacity = 1-this.touch.precent
        this.$refs.cdImage.style[transitionDuration] = 0
    },
    middleTouchEnd(e){
        if (!this.touch.moved) {
          return
        }
        let offsetWidth,opacity;
        if (this.currentShow === 'cd') {
          if (this.touch.precent>0.1) {
            opacity = 0
            offsetWidth = -window.innerWidth
            this.currentShow = 'lyric'
          }else{
            opacity = 1
            offsetWidth = 0
          }
        }else{
          if(this.touch.precent < 0.9){
            opacity = 1
            offsetWidth = 0
            this.currentShow = 'cd'
          }else{
            opacity = 0
            offsetWidth = -window.innerWidth
          }
        }
       const time = 300
        this.$refs.lyric.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.lyric.$el.style[transitionDuration] = `${time}ms`
        this.$refs.cdImage.style.opacity = opacity
        this.$refs.cdImage.style[transitionDuration] = `${time}ms`
        this.touch.initiated = false
       
    },
    _pad(num, n = 2) {
      // 当秒小于10时在前面补0
      let len = num.toString().length;
      if (len < n) {
        num = "0" + num;
      }
      return num;
    },
    _getPosAndScale() {
      const targetWidth = 40;
      const paddingLeft = 40;
      const paddingBottom = 30;
      const paddingTop = 80;
      const width = window.innerWidth * 0.8;
      const scale = targetWidth / width;
      const x = -(window.innerWidth / 2 - paddingLeft);
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
      return {
        x,
        y,
        scale
      };
    }
  },
  components: {
    Scroll,
    ProgressBar,
    ProgressCircle,
    Light
  },
  watch: {
    currentSong(newSong,oldSong) {
      if(newSong.id===oldSong.id){
        return ;
      }
      this.$nextTick(() => {
        this.$refs.audio.play();
        this.currentSong.getLyric()
      });
    },
    playing(newState) {
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        this.playing ? audio.play() : audio.pause();
      });
    }
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;

    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
    }

    .top {
      position: relative;
      margin-bottom: 25px;

      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;

        .icon-back {
          display: block;
          padding: 9px;
          font-size: $font-size-large-x;
          color: $color-theme;
          transform: rotate(-90deg);
        }
      }

      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }

      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }

    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;

      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;

        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;

          .cd {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 10px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;

            &.play {
              animation: rotate 20s linear infinite;
            }

            &.pause {
              animation-play-state: paused;
            }

            .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }

        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;

          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }
      }

      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;

          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;

            &.current {
              color: $color-text;
            }
          }
        }
      }
    }

    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;

      .dot-wrapper {
        text-align: center;
        font-size: 0;

        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-text-l;

          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }

      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;

        .time {
          color: $color-text;
          font-size: $font-size-small;
          flex: 0 0 30px;
          line-height: 30px;
          width: 30px;

          &.time-l {
            text-align: left;
          }

          &.time-r {
            text-align: right;
          }
        }

        .progress-bar-wrapper {
          flex: 1;
        }
      }

      .operators {
        display: flex;
        align-items: center;

        .icon {
          flex: 1;
          color: $color-theme;

          &.disable {
            color: $color-theme-d;
          }

          i {
            font-size: 30px;
          }
        }

        .i-left {
          text-align: right;
        }

        .i-center {
          padding: 0 20px;
          text-align: center;

          i {
            font-size: 40px;
          }
        }

        .i-right {
          text-align: left;
        }

        .icon-favorite {
          color: $color-sub-theme;
        }
      }
    }

    &.normal-enter-active, &.normal-leave-active {
      transition: all 0.4s;

      .top, .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }

    &.normal-enter, &.normal-leave-to {
      opacity: 0;

      .top {
        transform: translate3d(0, -100px, 0);
      }

      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }

  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: $color-highlight-background;

    &.mini-enter-active, &.mini-leave-active {
      transition: all 0.4s;
    }

    &.mini-enter, &.mini-leave-to {
      opacity: 0;
    }

    .icon {
      flex: 0 0 40px;
      width: 40px;
      padding: 0 10px 0 20px;

      img {
        border-radius: 50%;

        &.play {
          animation: rotate 10s linear infinite;
        }

        &.pause {
          animation-play-state: paused;
        }
      }
    }

    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;

      .name {
        margin-bottom: 2px;
        no-wrap();
        font-size: $font-size-medium;
        color: $color-text;
      }

      .desc {
        no-wrap();
        font-size: $font-size-small;
        color: $color-text-d;
      }
    }

    .control {
      flex: 0 0 30px;
      width: 30px;
      padding: 0 10px;

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
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

