import { ElMessage } from "element-plus"

const copy = (el, {value}, vnode, prevVnode)=> {
    el.$value = value
    el.handler = () => {
      if (!el.$value) return ElMessage.error('无复制内容')
      // 动态创建 textarea 标签
      const textarea = document.createElement('textarea')
      // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
      textarea.readOnly = 'readonly'
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      // 将要 copy 的值赋给 textarea 标签的 value 属性
      textarea.value = el.$value
      // 将 textarea 插入到 body 中
      document.body.appendChild(textarea)
      // 选中值并复制
      textarea.select()
      const result = document.execCommand('Copy')
      if (result) {
        ElMessage.success('已复制')
      }
      document.body.removeChild(textarea)
    }
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.handler)
  }
 
export default {
  mounted (el, binding, vnode, prevVnode) {
    copy(el, binding, vnode, prevVnode)
  },
  updated(el, {value}, vnode, prevVnode){
    el.$value = value
  },
  unmounted(el, binding, vnode, prevVnode) {
    el.removeEventListener('click', el.handler)
  }
}
