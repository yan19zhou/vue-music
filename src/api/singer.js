import jsonp from 'common/js/jsonp'
import {commonParams, options} from 'api/config'

export function getSingerList(){
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
    const data = Object.assign({}, commonParams, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        g_tk: 2001751543
    })
    return jsonp(url, data, options)
}

export function getSingerDetailList(singerId){
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
    const data = Object.assign({},commonParams,{
        g_tk: 1766486582,
        singermid:singerId,
        hostUin: 0,
        loginUin: 1360982972,
        platform: 'yqq',
        needNewCode: 0,
        order: 'listen',
        begin: 0,
        num: 30,
        songstatus: 1
    })
    return jsonp(url,data,options)
}