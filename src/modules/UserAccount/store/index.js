import { defineStore } from 'pinia'
import {
  login, // 登录
  getUserInfo, // 用户数据
  getUserMenu, // 用户权限
} from 'modules/UserAccount/api'
import mixin from 'store/utils/mixin'
import { sleep } from '@/utils/request'
import { PrivateRouites } from 'router/routes'
import { flatteningRoutes } from 'utils/router.js'

/**
 * @param {function} getXXX 代表 getters 属性
 * @param {function} askXXX 代表 actions 方法
 */

// 第一个参数是应用程序中 store 的唯一 id
export const useUserAccountStore = defineStore('UserAccount', {
  state: () => {
    return {
      userInfo: [],
      permissionList: [],
    }
  },
  getters: {
    getUserInfo: state => state.userInfo,
    getPermissionList: state => state.permissionList,
  },
  actions: {
    // 登录
    async login(data) {
      const res = await login(data)
      return this.filterResponse(res)
    },
    // 退出登录
    logout(){
      this.userInfo = []
      this.permissionList = []
    },
    // 请求用户数据
    async askUserInfo(data) {
      const res = await getUserInfo(data)
      return this.filterResponse(res, ({data}) => {
        this.userInfo = data.result
      })
    },
    // 请求用户菜单权限
    async askUserMenu(data) {
      const res = await getUserMenu(data)
      return this.filterResponse(res,({result})=>{
        this.permissionList = result
      })
    },
    async filterPrivateRoutes(promission) {
      const newRoutes = flatteningRoutes(PrivateRouites, promission)
      newRoutes.forEach(route => {
        this.router.addRoute(route)
      })
      return true
    }
  },
  ...mixin
})