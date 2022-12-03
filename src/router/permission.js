/**
 * 全局路由守卫
 *    用户鉴权
 */
import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Cookie from 'js-cookie'
import {useUserAccountStore} from 'modules/UserAccount/store'
NProgress.configure({
  showSpinner: false // 关闭加载圈动画
})

// 路由拦截
router.beforeEach(async(to,from,next)=>{
  // 打开进度条动画
  NProgress.start()
  // 动态更换当前窗口标题
  document.title = `信永中和 -${to.meta.title || ''}`

  const userAccountStore = useUserAccountStore()

  if(to.query.token){
    Cookie.set('token',to.query.token)
    Cookie.set('name',to.query.uName)
    return next({query:{},replace: true})
  }

  // 1.去登陆页直接放行
  if(to.name === 'ProjectLogin'){
    Cookie.remove('token')
    Cookie.remove('name')

    // 清除用户数据
    userAccountStore.logout()
    return next()
  }

  // 2.是否拥有token,没有重定向login
  const token = Cookie.get('token')
  if(!token) return next({ name:'ProjectLogin', replace: true });

  // 3.是否有当前用户数据（userInfo）没有则请求
  if(!Object.keys(userAccountStore.getUserInfo).length){
    const {error,data:{token,result}} = await userAccountStore.askUserInfo()
    if(!error){
      Cookie.set('token',token)
      Cookie.set('name',result.userName)

      
      // 4.如果没有菜单列表，就重新请求菜单列表并添加动态路由
      const userCode = userAccountStore.getUserInfo.userCode
      const {error:err} = await userAccountStore.askUserMenu({code:userCode})
      if(!err){
        return next({ ...to, replace: true })
      }
    }else{
      ElMessage.error('身份过期，请重新登录')
      return next({ name:'ProjectLogin', replace: true });
    }
  }

  // 5.直接放行
  next()
})

// 路由拦截
router.afterEach((to) => {
  // 关闭进度条动画
  NProgress.done()
})