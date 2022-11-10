
// 统一导入el-icon图标
import * as ElIconModules from '@element-plus/icons-vue'
// 导入转换图标名称的函数
import { transElIconName } from 'utils/el-icon.js'  

export default {
  install:(app)=>{
    // 统一注册el-icon图标
    for(let iconName in ElIconModules){
      app.component(transElIconName(iconName),ElIconModules[iconName])
    }
  }
}