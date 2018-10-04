import * as types from './mutations-types'

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE](state,flag){
    state.playing = flag
  },
  [types.SET_FULLSCREEN](state,flag){
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state,playList){
    state.playList = playList
  },
  [types.SET_SEQUENCELIST](state,sequenceList){
    state.sequenceList = sequenceList
  },
  [types.SET_MODE](state,mode){
    state.mode = mode
  },
  [types.SET_CURRENTINDEX](state,currentIndex){
    state.currentIndex = currentIndex
  },
  [types.SET_DISC](state,disc){
    state.disc = disc
  },
  [types.SET_TOPLIST](state,topList){
    state.topList= topList
  }
}

export default mutations
