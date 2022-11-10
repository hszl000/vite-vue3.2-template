import store from '@/store/index.js'

const checkoutButton = (el, binding, vnode) => {
  const {
    userCode
  } = store.state.UserAccount.userInfo
  
  if (!binding.value.some(item => userCode.includes(item))) {
      el.parentNode && el.parentNode.removeChild(el)
  }
}

export default {
  mounted (el, binding, vnode) {
    checkoutButton(el, binding, vnode)
  },
  updated (el, binding, vnode) {
    checkoutButton(el, binding, vnode)
  }
}
