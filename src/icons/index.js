import IconFont from '@/icons/IconFont.vue'
import ElIcons from '@/icons/el-icon.js'
export default {
  install:(app)=>{
    app.component("IconFont",IconFont)
    // 封装 element-plus icon组件
    app.use(ElIcons)
  }
}