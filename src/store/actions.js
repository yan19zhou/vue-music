import * as types from './mutations-types'
import {shuffle} from 'common/js/util'

export const selectPlay = function({commit,state},{list,index}){
    commit('SET_PLAYING_STATE',true)
    commit('SET_FULLSCREEN',true)
    commit('SET_PLAYLIST',list)
    commit('SET_SEQUENCELIST',list)
    commit('SET_CURRENTINDEX',index)
}
export const randomPlay = function({commit,state},{list}){
    commit('SET_PLAYING_STATE',true)
    commit('SET_FULLSCREEN',false)
    commit('SET_PLAYLIST',shuffle(list))
    commit('SET_SEQUENCELIST',list)
    commit('SET_CURRENTINDEX',0)
}