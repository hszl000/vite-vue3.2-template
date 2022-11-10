import { createApp } from "vue";
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";

import store from '@/store/index'
import router from '@/router/index'

import widgets from '@/widgets/index.js'

import App from "./App.vue";
// 导入 全局 自定义指令
import initDirectives from '@/directives/index.js'
// 注册 全局属性
import initFilters from '@/Filters/index.js'
// 注册 全局 icon 组件
import icons from '@/icons/index.js'
import 'virtual:svg-icons-register' // 引入注册脚本
// 鉴权
import '@/router/permission'

const app = createApp(App);

app
  .use(initDirectives) // 全局指令
  .use(initFilters) // 全局属性
  .use(icons) // 全局组件

// app.use(ElementPlus);
app
  .use(store)
  .use(router)
  .use(widgets)
  .mount("#app");
