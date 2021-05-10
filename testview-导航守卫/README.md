### Vue导航守卫

#### 理解

导航守卫也叫路由守卫,可以实时的监控路由的跳转过程,在路由的跳转的各个过程执行相应的操作,有点类似于生命周期函数,在开发的过程中经常被使用,比如用户点击了一个页面,如果未登录就跳转到登录页面,已登录就让用户正常进入.

#### 分类

###### 全局路由一共分为类: 全局守卫,路由独享守卫,组件内的守卫

###### 一、全局守卫

全局守卫共有三总

* router.beforeEach(全局前置守卫)
* router.beforeResolve(全局解析守卫)
* router.afterEach(全局后置守卫)

1. 全局前置守卫(router.beforeEach)

   ```
   以一个例子来解释router.beforeEach,假设我们现在做一个这样的需求,用户在没有登录的时候进入任意页面,我们就让用户跳转到登录页,已登录的用户跳转到点击的页面.
   准备三个组件: home.vue , login.vue , about.vue
   ```

   home.vue的内容

   ```
   <template>
     <div class="hello">
       <button @click="$router.push('/about')">去关于页面</button>
     </div>
   </template>
   <script>
     export default {
       name: 'home',
       data() {
         return {}
       }
     }
   </script>
   <style scoped>
   </style>
   ```

   login.vue的内容

   ```
   <template>
       <div>登录页面</div>
   </template>
   <script>
       export default {
           name: "about"
       }
   </script>
   <style scoped>
   </style>
   ```

   about.vue的内容

   ```
   <template>
       <div>关于页面</div>
   </template>
   <script>
       export default {
           name: "about"
       }
   </script>
   <style scoped>
   </style>
   ```

   app.vue的内容

   ```
   <template>
     <div id="app">
       <router-view />
     </div>
   </template>
   ```

   router配置文件的内容:

   ```
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
         component: about
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
   ```

   定义常量ISLOGIN来模拟用户是否登录,每次路由跳转的时候,`router.beforeEach`都会执行, 比接收三个参数,to表示将要进入的目标路由对象的详细信息,from表示将要离开的目标路由对象的信息,`next()`表示执行下一步,`router.beforeEach`是全局路由跳转时触发执行的函数.

2. 全局解析守卫(router.beforeResolve)

   ```
   和全局前置守卫类似，区别是在跳转被确认之前，同时在所有组件内守卫和异步路由组件都被解析之后，解析守卫才调用。
   ```

3. 全局后置钩子(router.afterEach)

   ```
   你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身
   router.afterEach((to, from) => {
     // ...
   })
   ```

###### 二、路由独享守卫

​	独享守卫只有一种`beforeEnter`,该守卫接收的参数与全局守卫是一样的,但是该守卫只在其他路由跳转至配有`beforeEnter`路由表信息时才生效,router配置文件内容如下:

```
{
   path: '/about',
   name: 'about',
   component: about,
   beforeEnter:(to,from,next)=>{
      console.log(to);
      console.log(from);
      next()
   }
```

###### 三、组件内守卫

```
组件内守卫共有三种:
beforeRouteEnter://进入路由时执行
beforeRouteUpdata://该路由参数改变时执行
beforeRouteLeave://离开该路由时执行
```

在about组件内添加如下代码测试:

```
<template>
  <div>关于页面</div>
</template>
<script>
export default {
  name: "about",
  // beforeEnter: (to, from, next) => {
  //   console.log(进入about路由);
  // },
  beforeRouteEnter(to,from,next) {
    next();
    console.log('进入about路由');
  },
  beforeRouteUpdate(to,from,next) {
    next();
    //该路由参数更新时执行
    console.log('路由参数改变');
  },
  beforeRouteLeave (to,from,next) {
    next();
    console.log('离开路由了');
  }
};
</script>
<style scoped>
</style>

```

[代码这里](https://github.com/liguangyi1991/VueRouter/tree/master)






