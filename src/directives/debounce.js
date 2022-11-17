const debounce = (el, binding, vnode, prevVnode) => {
  let timer;
  el.addEventListener("keyup", () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      binding.value();
    }, 1000);
  });
};

export default {
  mounted(el, binding, vnode, prevVnode) {
    debounce(el, binding, vnode, prevVnode);
  },
};
