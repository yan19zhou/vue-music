import originJSONP from 'jsonp'
export default function jsonp(url,data,option){
       url += (url.indexOf('?')<0?'?':'&')+conver(data)
    return new Promise((resolve,reject)=>{
        originJSONP(url,option,(err,data)=>{
            if(!err){
                resolve(data)
            }else{
                reject(err)
            }
        })
    })
}
function conver(data){
    let url =''
    for(let k in data){
        let value = data[k]!==undefined ?data[k]:''
        url += `&${k}=${data[k]}`
    }
    return url = url?url.substring(1):''
}