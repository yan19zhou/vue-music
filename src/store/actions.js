import * as types from './mutations-types'

export const selectPlay = function({commit,state},{list,index}){
    commit('SET_PLAYING_STATE',true)
    commit('SET_FULLSCREEN',true)
    commit('SET_PLAYLIST',list)
    commit('SET_SEQUENCELIST',list)
    commit('SET_CURRENTINDEX',index)
}