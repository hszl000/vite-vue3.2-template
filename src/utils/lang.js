import { useLocale } from 'element-plus'
import { watch } from 'vue'
import {useLayoutStore} from 'comps/Layout/store'

const locale =  useLocale()
const layoutStore = useLayoutStore()

// 封装 国际化动态获取 title
export const getTitle = (title)=>{
  return locale.t(`route.${title}`)
} 

// 监听中英文切换
export const watchLang = (...cbs)=>{
  watch(()=> layoutStore.language,(newVal)=>{
    try {
      cbs.forEach(cb=> cb(newVal))
    } catch (err) {
      setTimeout(()=>{
        ElMessage.error('cbs 不符合校验规则')
      })
    }
  })
}