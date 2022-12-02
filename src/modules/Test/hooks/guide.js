export default class Guide {
  constructor(data) {
    this.data = []
    if (data) {
      this.index = 0
      this.data = data
    }
    this.setOptions({
      prevLabel: 'prevLabel',
      nextLabel: 'nextLabel',
      skipLabel: 'skipLabel',
      doneLabel: 'doneLabel'
    })
  }

  initEle() {
    const { prevLabel, nextLabel, skipLabel, doneLabel } = this.optoion

    const VNode = {
      name: 'div',
      attrs: {},
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: 'auto',
        transition: 'all 300ms',
        background: '#fff',
        boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.12)',
        borderRadius: '5px',
        zIndex:999999
      },
      children: [
        {
          name: 'div',
          attrs: {
            class: 'guide-header',
            id: 'guide-header'
          },
          style: {
            padding: '10px',
            borderBottom: '1px solid #ccc',
            display:'flex',
            justifyContent: 'space-between',
            alignItems:'center'
          },
          children: [
            {
              name: 'span',
              attrs: {
                class: 'guide-header-title',
                id: 'guide-header-title'
              },
              style: {},
              children: []
            },
            {
              name: 'span',
              attrs: {
                class: 'guide-close',
                id: 'guide-close'
              },
              innerHTML:'跳过',
              style: {
                fontSize:'12px',
                cursor:'pointer',
              },
              events:{
                click:()=>this.end(this)
              },
              children: []
            },
          ]
        },
        {
          name: 'div',
          attrs: {
            class: 'main',
            id: 'guide-main'
          },
          style: {
            padding: '10px',
            width: '200px'
          },
          children: []
        },
        {
          name: 'div',
          attrs: {
            class: 'footer'
          },
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px',
            paddingTop: '10px',
            borderTop: '1px solid #ccc',
          },
          children: [
            {
              name: 'button',
              attrs: {
              },
              innerHTML: '上一步',
              events: {
                click: () => this.prev(this)
              },
              style: {
                width: '68px',
                height: '28px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                background: 'none'
              },
              children: [

              ]
            },
            {
              name: 'button',
              attrs: {
              },
              style: {
                width: '68px',
                height: '28px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                background: 'none'
              },
              innerHTML: '下一步',
              events: {
                click: () => this.next(this)
              },
              children: []
            }
          ]
        }
      ]

    }

    this.tooltipEle = createVNode(VNode)

    this.maskLayer = createVNode({
      name: 'div',
      style: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0px',
        left: '0px',
        background: 'rgba(0,0,0,0.2)',
        zIndex:99999
      }
    })

    console.log(this.tooltipEle, 'this.tooltipEle')
    window.addEventListener('resize', () => {
      this.start(this)
    })
    window.addEventListener('scroll', () => {
      this.start(this)
    })
  }

  setOptions(options) {
    this.optoion = { ...this.optoion, ...options }
    this.initEle()
  }

  start(t) {
    // 获取当前数据
    const v = this.data[this.index]
    // 获取当前指引的元素
    const el = document.querySelector(v.id)
    el.style.position = 'relative'
    el.style.zIndex = 99998
    el.style.border = "1px solid red"
    if (!el) return
    // 获取 当前元素的 x y w h
    const { x, y, width, height } = el.getBoundingClientRect()
    // 获取body的 w h
    const { width: bodyW, height: bodyH } = document.body.getBoundingClientRect()
    // 获取指引盒子的 w h
    const { width: guideW, height: guideH } = this.tooltipEle.getBoundingClientRect()


    // 获取指引 子元素
    const [header, main, footer] = this.tooltipEle.children
    // 赋值
    header.children[0].innerHTML = v.title
    main.innerHTML = v.content

    // 
    // this.cloneGuide = el.cloneNode(true)
    // console.log(this.cloneGuide,'this.cloneGuide')
    // this.cloneGuide.id = 'copy_'+this.cloneGuide.id
    // this.cloneGuide.style.position = 'absolute'
    // this.cloneGuide.style.left = `${x}px`
    // this.cloneGuide.style.top = `${y}px`
    // this.cloneGuide.style.zIndex = 99998
    // this.cloneGuide.innerHTML = el.innerHTML
    // this.cloneGuide.bacground = '#fff'

    // 设置 指引定位
    this.tooltipEle.style.position = 'absolute'

    if ((x + guideW) >= bodyW) {
      const extraW = bodyW - (x + guideW)
      this.tooltipEle.style.left = `${x + extraW}px`
    } else {
      this.tooltipEle.style.left = `${x}px`
    }

    if ((y + guideH) >= bodyH) {
      const extraH = bodyH - (y + guideH + extraH)
      this.tooltipEle.style.top = `${y + height}px`
    } else {
      this.tooltipEle.style.top = `${y + height}px`
    }

    if (t) return
    document.body.appendChild(this.tooltipEle)
    document.body.appendChild(this.maskLayer)
    // document.body.appendChild(this.cloneGuide)

  }

  end() {
    if(this.tooltipEle){
        // 移除元素
    delete this.index
    delete this.data
    document.body.removeChild(this.tooltipEle)
    document.body.removeChild(this.maskLayer)
    delete this.tooltipEle
    delete this.maskLayer
    if (window.onresize) window.removeEventListener('resize')
    if (window.onscroll) window.removeEventListener('scroll')
    }
  }

  next(t) {
    const [header, main, footer] = this.tooltipEle.children
    const el = footer.children[1]
    el.focus()
    if (this.index >= this.data.length - 1) return
    this.index++
    this.start(this)

  }

  prev(t) {
    const [header, main, footer] = this.tooltipEle.children
    const el = footer.children[0]
    el.focus()
    if (this.index <= 0) return
    this.index--
    this.start(this)

  }


}

/**
 * @param {function} createVNode
 * @param {object} oprion
 * @desctipt name 元素的名称 attrs 元素的属性 innerHTML 元素的内容 style 元素的样式 children 元素的子元素
 */

const createVNode = (option) => {
  const { name, attrs, events, innerHTML, style, children } = option
  const el = document.createElement(name);
  if (innerHTML) el.innerHTML = innerHTML;
  if (style) {
    for (let i in style) {
      el.style[i] = style[i]
    }
  }

  if (attrs && typeof attrs === 'object') {
    const attrKeys = Object.keys(attrs)
    attrKeys.forEach(key => {
      el.setAttribute(key, attrs[key])
    })
  }

  if (events && typeof events === 'object') {
    const eventKey = Object.keys(events)
    eventKey.forEach(event => {
      el.addEventListener(event, () => {
        events[event]()
      })
    })
  }

  if (children?.length) {
    children.forEach(child => {
      el.appendChild(createVNode(child))
    })
  }
  return el
}