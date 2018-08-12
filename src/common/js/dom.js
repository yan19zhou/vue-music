export function addClass(el,className){
    if(hasClass(el,className)){
       return 
    }else{
        var newClass = el.className.split("")
        newClass.push(className)
        el.className = newClass.join(" ")
    }
}

export function hasClass(el,className){
    let reg = new RegExp('(^|\\s)'+className+'(//s|$)')
    return reg.test(el.className)
}

export function getData(el, name, val) {
    const prefix = 'data-'
    if (val) {
      return el.setAttribute(prefix + name, val)
    }
    return el.getAttribute(prefix + name)
  }

  let  elementStyle = document.createElement('div').style
  let vendor = (()=>{
    const transforms={
        webkit:'webkitTransform',
        Moz:'MozTransform',
        O:'OTransform',
        ms:'msTransform',
        standard:'standard'
    }
  for (const key in transforms) {
      if (elementStyle[transforms[key]] !== undefined) {
         return key 
      }
  }
  return false
  })()

  export function prefixStyle(style){
    if (!vendor) {
        return 
    }
    if (vendor == 'standard') {
        return style
    }
    return vendor+style.charAt(0).toUpperCase()+style.substr(1)
  }