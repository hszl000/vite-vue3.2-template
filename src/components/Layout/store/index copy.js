import {
  getXXX
} from 'modules/Home/api'
import MUTATION from 'comps/Layout/store/mutations-type'
import mixin from 'store/utils/mixin'
import { sleep } from '@/utils/request'
const LayoutModule = {
  namespaced: true,
  _name: 'Layout',
  state: {
    toggleSideBar:false,
    language:'zh',
    // ⚠ ele default primary
    originalTheme: "#409EFF",
    // tag
    tagViewList:[],
    themeColor:'#1D561D'
  },
  getters: {
    sideBarOpen(state){
      return state.toggleSideBar
    },
    language(state){
      return state.language
    },
    originalTheme(state){
      return state.originalTheme
    },
    tagViewList(state){
      return state.tagViewList
    },
    themeColor(state){
      return state.themeColor
    }
  },
  actions: {
    // 测试
    async getXXX ({ commit }, params) {
      // const res = await getXXX(params)
      await sleep(1000)
      const res = {
        error:0,
        msg:'success',
        result:[]
      }
      return this.filterResponse(res)
    }
  },
  mutations: {
    // 测试
    [MUTATION.SET_XXX] (state, data) {
      state.isXXX = data
    },
    // 缩放侧边栏
    [MUTATION.SET_TOGGLE_SIDEBAR] (state) {
      state.toggleSideBar = !state.toggleSideBar
    },
    // 缩放侧边栏
    [MUTATION.SET_LANGUAGE] (state,lang) {
      state.language = lang
    },
    [MUTATION.SET_ADDTAGVIEW_LIST](state, route) {
      // 如果存在路由，不能push
      const isFind = state.tagViewList.find((item) => item.path === route.path)
      if (!isFind) {
        state.tagViewList.push(route)
      }
    },
    // 随语言切换更新 tagViewList 中的(指定的索引)每一个title
    [MUTATION.SET_CHANGE_TITLE](state, newTagViewList) {
      state.tagViewList = newTagViewList
    },
    /*
      关闭业务
      params:paylod:(type: "index"||"right"||"other",index:'index')
    */
    [MUTATION.SET_CLOSE_TAG](state, { type, index }) {
      if (type === 'index') {
        // 删除当前
        state.tagViewList.splice(index, 1)
      } else if (type === 'right') {
        // 删除右侧 (不算自己，右侧全部删除)
        state.tagViewList.splice(index + 1, state.tagViewList.length - 1)
      } else if (type === 'other') {
        // 删除其他
        state.tagViewList = [state.tagViewList[index]]
      }
    },
    [MUTATION.SET_THEME_COLOR](state, color) {
      state.themeColor = color
    },
  },
  ...mixin
}

export default LayoutModule
