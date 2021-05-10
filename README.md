

##### 单页面应用(SPA)

只有一张web页面的应用,跳转的时候紧紧刷新局部资源,公共资源(js、css等)仅需加载一次,第一次进入页面时只会请求一个html,刷新的时候清除页面上的组件,切换到其他的组件,这是路径也会发生相应的变化,但是不会有新的html文件请求.

##### vue-router是什么

vue-router是vue.js的官方路由插件,它依赖于vue.js,适用于单页面应用,在单页面应用中将路径和组件映射起来,路由的本质我感觉就是将url和组件之间建立映射关系.

刚刚开始接触路由的时候,可能会奇怪为什么使用路由,为什么不直接使用a标签呢,这是因为Vue做的都是单页面应用,Vue的项目打包的时候只会生成一个index.html页面,a标签的跳转页面会重新渲染,相当于打开一个新的网页.

##### vue-router实现原理

###### spa的核心是更新视图而不重新请求页面,它提供了两种方式来实现单页面前端路由: Hash模式和History模式

######  1.  Hash模式:

> vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。hash（#）是URL 的锚点，代表的是网页中的一个位置，单单改变#后的部分，浏览器只会滚动到相应位置，不会重新加载网页，也就是说**hash 出现在 URL 中，但不会被包含在 http 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面**；同时每一次改变#后的部分，都会在浏览器的访问历史中增加一个记录，使用”后退”按钮，就可以回到上一个位置；所以说**Hash模式通过锚点值的改变，根据不同的值，渲染指定DOM位置的不同数据。hash 模式的原理是 onhashchange 事件(监测hash值变化)，可以在 window 对象上监听这个事件**。



###### 2.History模式:

>由于hash模式会在url中自带#，如果不想要很丑的 hash，我们可以用路由的 history 模式，只需要在配置路由规则时，加入"mode: 'history'",**这种模式充分利用了html5 history interface 中新增的 pushState() 和 replaceState() 方法。这两个方法应用于浏览器记录栈，在当前已有的 back、forward、go 基础之上，它们提供了对历史记录修改的功能。只是当它们执行修改时，虽然改变了当前的 URL ，但浏览器不会立即向后端发送请求**。

```
//main.js文件中
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

当你使用 history 模式时，URL 就像正常的 url，例如 [yoursite.com/user/id，比较好…](http://yoursite.com/user/id，比较好看！) 不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 [oursite.com/user/id](http://oursite.com/user/id) 就会返回 404，这就不好看了。 所以呢，**你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。**

```
 export const routes = [ 
  {path: "/", name: "homeLink", component:Home}
  {path: "/register", name: "registerLink", component: Register},
  {path: "/login", name: "loginLink", component: Login},
  {path: "*", redirect: "/"}]
```

此处就设置如果URL输入错误或者是URL 匹配不到任何静态资源，就自动跳到到Home页面

###### 3. 使用模块路由来实现页面的跳转

* 直接修地址栏
* This.$router.push('路由地址')
* `<router-link to="路由地址"></router-link>`

##### Vue-router的使用方式:

1. 通过npm安装vue-router

   ` npm i vue-router -S`

2. 引入vue-router到main.js中

`import VueRouter from 'vue-router'`

3. 安装插件

`Vue.use(VueRouter)`

4. 创建路由对象并配置路由规则

```
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})
```

5. 将路由对象传递给Vue的实例

```
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

```

6. 在app.vue放置router-view

```
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
```



#### Vue的核心要点

###### 1. vue-router传递参数的方式

* 使用name传递参数

​     在路由文件src/router/index.js配置name属性

     const routes = [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
    
   

* 通过`<router-link>`标签中的to来传递参数

  基本语法

  `<router-link :to="{name:xxx,params:{key:value}}">valueString</router-link>`

  使用:

  在src/App.vue中添加一下代码:

  `   <router-link :*to*="{name:'About',params:{username: '李广义'}}">About</router-link>`   

  在About组件中使用$route.params.username进行接收

  ```html
      <h2>{{$route.params.username}}</h2>
  ```




* 通过url传递参数   (在路由配置的时候以冒号的形式设置参数)

  ```
  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about/:urlName',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  ]
  ```

  

  通过`<router-link>来传值`

  ```
    <router-link to="/about/测试">About</router-link>
  ```

  

  在About组件中通过`$route.params.urlName`来获取

  `  <h2>{{$route.params.urlName}}</h2>`

  #### 单页面多路由区域操作

  有时候一个页面同时展示多个视图,而不是嵌套显示,比如在写后台管理系统的时候有侧导航栏和主内容区域两个视图,这时候就要用命名视图了,可以在一个vue页面中拥有多个单独命名的视图(router-view),如果没有设置名字,那么name的值为default.

  ```
  <template>
    <div id="app">
      <router-link :to="{name:'HelloWord'}">H1</router-link>|
      <router-link :to="{name:'H1'}">H2</router-link>|
      <router-view />
      <router-view name="left" style="float:left;width:50%;background-color:#ccc;height:300px;" />
      <router-view
        name="right"
        style="float:right;width:50%;background-color:yellowgreen;height:300px;"
      />
    </div>
  </template>
  ```

  上面的第一个router-view因为没有设置name,所以他的默认值是default,第二个router-view的name的值是left,第三个是right,

  当点击第一个`<router-link>`的时候会根据HelloWord对应的路由,寻找其对应的组件即下面:

  ```
    {
      path: '/',
      name: 'HelloWord',
      components: {
        default: HelloWorld,
        left: H1,
        right: H2
      }
    }
  ```

  

  HelloWord组件替换第一个router-view,H1组件替换name为left的router-view...

  #### Vue-router二级路由的配置

  项目开发中,组件往往是多层嵌套的,URL中各段的动态路径也按照某种结构对应嵌套的各层组件

  在app.vue中写入一下代码

  ```
  <template>
    <div id="app">
      <router-link :to="{name:'HelloWord'}">主页面</router-link>|
      <router-link :to="{name:'H1'}">H1页面</router-link>|
      <router-link :to="{name:'H2'}">H2页面</router-link>
      <router-view></router-view>
    </div>
  </template>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  </style>
  ```

  在router/index.js[配置嵌套路由

  ```
  const routes = [
    {
      path: '/',
      name: 'HelloWord',
      component: HelloWorld,
      children: [{
        path: '/h1',
        name: 'H1',
        component: H1
      },{
        path: '/h2',
        component: H2,
        name: 'H2'
      }]
    }
  ]
  ```

  当启动服务的时候回默认会加载主页面,点击H1会去匹配子路由,我个人的理解是url被路由配置,层层匹配,将匹配到的路由组件渲染出来.

  #### vue-router跳转的方法

  ```
  <button @click="goToMenu" class="btn btn-success">Let's order！</button>
  .....
  <script>
    export default{
      methods:{
        goToMenu(){
          this.$router.go(-1)//跳转到上一次浏览的页面
          this.$router.replace('/menu')//指定跳转的地址
          this.$router.replace({name:'menuLink'})// 指定跳转路由的名字下
          this.$router.push('/menu')通过push进行跳转
          this.$router.push({name:'menuLink'})通过push进行跳转路由的名字下
        }
      }
    }
  </script>
  ```

  其中replace和push的区别是:

  push会留下访问记录,会向history中添加记录,但是replace不会添加新的记录

  #### 错误页面的设置

  当url输入错误的时候,应该友好的给一个页面,这个页面就是404页面,可以在路由配置页面中这样配置

  ```
  {
      path: '*',
      component: Error
    }
  ```
  
  [代码这里](https://github.com/liguangyi1991/VueRouter/tree/master)
  
  
  
  


