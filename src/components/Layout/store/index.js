import { defineStore } from 'pinia'
import {
  getMsgList, // 获取消息
  getTodoList, // 获取待办
  delUserAllMsg, // 一键已读
} from 'comps/Layout/api'
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
      themeColor:'#495164',
      layoutFormat:'top',
      msgList:[], // 消息
      todoList:[] // 待办
    }
  },
  getters: {
    getSideBarOpen: state=>state.toggleSideBar,
    getLanguage:state=>state.language,
    getOriginalTheme:state=>state.originalTheme,
    getTagViewList:state=>state.tagViewList,
    getThemeColor:state=>state.themeColor,
    getLayoutFormat:state=>state.layoutFormat,
    getMsgList:state=>state.msgList,
    getTodoList:state=>state.todoList
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
    },
    // 消息
    async askMsgList(data){
      const res = await getMsgList(data)
      this.msgList = res.result
      return this.filterResponse(res)
    },
    // 待办
    async askTodoList(data){
      const res = await getTodoList(data)
      this.todoList = res.result
      return this.filterResponse(res)
    },
    // 一键已读
    async delUserAllMsg(data){
      const res = await delUserAllMsg(data)
      return this.filterResponse(res)
    },
  },
  ...mixin
})