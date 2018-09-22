import {commonParams,options} from './config'
import jsonp from 'common/js/jsonp'
import axios from 'axios'
export function getTopList(){
   const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
   var queryParams = Object.assign({},commonParams,{
    uin: 0,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    tpl: 3,
    page: 'detail',
    type: 'top',
    topid: 4,
    _: 1537335931090,
   })
   return jsonp(url,queryParams,options)
}