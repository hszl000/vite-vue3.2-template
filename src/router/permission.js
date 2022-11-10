/**
 * 全局路由守卫
 *    用户鉴权
 */
import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {useUserAccountStore} from 'modules/UserAccount/store'

NProgress.configure({
  showSpinner: false // 关闭加载圈动画
})

router.beforeEach(async(to,from,next)=>{
  NProgress.start()

  if(to.name !== 'ProjectLogin'){
    const userAccountStore = useUserAccountStore()
    if(!userAccountStore.getUserInfo.length){
      const {error,result} = await userAccountStore.askUserInfo()
      if(!error){
        // 处理动态路由
        await userAccountStore.filterPrivateRoutes(result)
        console.log(router.getRoutes(),'router')
        next()
      }else{
        next('/login')
      }
    }else{
      next()
    }
  }else{
    next()
  }
})

router.afterEach((to) => {
  NProgress.done()
})