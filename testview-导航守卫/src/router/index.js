import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/Home'
import login from '@/views/Login'
import about from '@/views/About'

Vue.use(Router)
const ISLOGIN = true   //登录状态模拟
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/about',
      name: 'about',
      component: about,
      beforeEnter:(to,from,next)=>{
        // console.log('路由独享守卫to',to);
        // console.log('路由独享守卫from',from);
        next()
      }
    }
  ]
})

router.beforeEach((to, from, next) => {   //全局全局前置守卫
  //to : 将要进入的目标路由对象
  //from : 即将离开的目标路由对象
  //执行跳转的下一步钩子
  console.log(to)
  console.log(from)
  if(to.name != 'login'){ //如果不是登录页面
    if(ISLOGIN)next()   //已登录就执行跳转
    else next({name:'login'})   //否则跳转到登录页面
  }else{ //如果是登录页面
    if(ISLOGIN)next({name:'/'}) //已登录就跳转到首页
    else  next()  //否则正常进入登录页面
  }
})
export default router