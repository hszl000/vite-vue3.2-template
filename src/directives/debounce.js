const debounce = (el, binding, vnode, prevVnode) => {
  let timer;
  el.handler = () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      binding.value();
    }, 1000);
  }
  el.addEventListener("keyup", el.handler);
};

export default {
  mounted(el, binding, vnode, prevVnode) {
    debounce(el, binding, vnode, prevVnode);
  },
  unmounted(el, binding, vnode, prevVnode) {
    el.removeEventListener('keyup', el.handler)
  }
};
