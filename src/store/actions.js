import * as types from './mutations-types'
import {shuffle} from 'common/js/util'
import {playMode} from 'common/js/config'

    function findIndex(list,song){
      return list.findIndex((item)=>{
          return item.id == song.id
      })  
    }
export const selectPlay = function({commit,state},{list,index}){
    if(state.mode == playMode.random){
        var randomList = shuffle(list)
        commit('SET_PLAYLIST',randomList)  
        index = findIndex(randomList,list[index])
    }else{
        commit('SET_PLAYLIST',list)
    }
    commit('SET_PLAYING_STATE',true)
    commit('SET_FULLSCREEN',true)  
    commit('SET_SEQUENCELIST',list)
    commit('SET_CURRENTINDEX',index)
}
export const randomPlay = function({commit},{list}){
    commit('SET_FULLSCREEN',true)
    commit('SET_MODE',playMode.random)
    var randomList = shuffle(list)
    commit('SET_PLAYLIST',randomList)
    commit('SET_SEQUENCELIST',list)
    commit('SET_CURRENTINDEX',0)
    commit('SET_PLAYING_STATE',true)

}