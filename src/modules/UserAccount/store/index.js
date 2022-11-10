import { defineStore } from 'pinia'
import {
  getUserInfo
} from 'modules/UserAccount/api'
import mixin from 'store/utils/mixin'
import { sleep } from '@/utils/request'
import {PrivateRouites} from 'router/routes'
import {flatteningRoutes} from 'utils/router.js'
import { resolve } from 'path-browserify'

// 第一个参数是应用程序中 store 的唯一 id
export const useUserAccountStore = defineStore('UserAccount', {
  state:()=>{
    return {
      userInfo:[],
    }
  },
  getters: {
    getUserInfo: state=>state.userInfo,
  },
  actions: {
    // 测试
    async askUserInfo (data) {
      // const res = await getUserInfo()
      await sleep(2000)
      const res = {
        msg:'success',
        error:0,
        // result:['1','1-1'] // user 1
        // result:['1','1-2'] // user 2
        result:['1','1-1','1-2','1-3'] // user 3
      }
      this.userInfo = res.result
      return this.filterResponse(res)
    },
    filterPrivateRoutes(promission){
      return new Promise((resolve)=>{
        const newRoutes = flatteningRoutes(PrivateRouites,promission)
        console.log(newRoutes,'newRoutes')
        newRoutes.forEach(route=>{
          this.router.addRoute(route)
        })
        resolve()
      })
    }
  },
  ...mixin
})