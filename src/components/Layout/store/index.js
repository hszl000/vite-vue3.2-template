import { defineStore } from 'pinia'
import {
  getXXX
} from 'modules/Home/api'
import mixin from 'store/utils/mixin'
import { sleep } from '@/utils/request'

// 第一个参数是应用程序中 store 的唯一 id
export const useLayoutStore = defineStore('Layout', {
  state:()=>{
    return {
      toggleSideBar:false,
      language:'zh',
      // ⚠ ele default primary
      originalTheme: "#409EFF",
      // tag
      tagViewList:[],
      themeColor:'#1D561D'
    }
  },
  getters: {
    getSideBarOpen: state=>state.toggleSideBar,
    getLanguage:state=>state.language,
    getOriginalTheme:state=>state.originalTheme,
    getTagViewList:state=>state.tagViewList,
    getThemeColor:state=>state.themeColor,
  },
  actions: {
    // 测试
    setXxx (data) {
      this.isXXX = data
      console.log(this,'this')
    },
    addTagViewList(route) {
      console.log(this.tagViewList,'this')
      // 如果存在路由，不能push
      const isFind = this.tagViewList.find((item) => item.path === route.path)
      if (!isFind) {
        this.tagViewList.push(route)
      }
    },
    // 随语言切换更新 tagViewList 中的(指定的索引)每一个title
    changeTitle(newTagViewList) {
      this.tagViewList = newTagViewList
    },
    /*
      关闭业务
      params:paylod:(type: "index"||"right"||"other",index:'index')
    */
      closeTag({ type, index }) {
      if (type === 'index') {
        // 删除当前
        this.tagViewList.splice(index, 1)
      } else if (type === 'right') {
        // 删除右侧 (不算自己，右侧全部删除)
        this.tagViewList.splice(index + 1, this.tagViewList.length - 1)
      } else if (type === 'other') {
        // 删除其他
        this.tagViewList = [this.tagViewList[index]]
      }
    }
  },
})