 const drag = (el, bindings,vnode) => {
  el.style.cssText = `
    position:absolute;
    z-index:2000;
  `
    el.onmousedown = function(e) {
      var disx = e.pageX - el.offsetLeft
      var disy = e.pageY - el.offsetTop
      document.onmousemove = function (e) {
        el.style.left = e.pageX - disx + 'px'
        el.style.top = e.pageY - disy + 'px'
      }
      document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null
      }
    }
  }

export default {
  mounted (el, binding, vnode) {
    drag(el, binding, vnode)
  }
}