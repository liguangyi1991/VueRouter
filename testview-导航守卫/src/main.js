import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$linkTo = function ({ path, query, type }) {
  if (typeof (arguments[0]) != 'object') {
    // 跳转路径
    path = arguments[0];
  }
  // 请求参数
  query = query || {};
  // 跳转类型
  type = type || '_self';
  let routeData = router.resolve({
    path: path,
    query: query || {}
  })
  console.log('router.resolve()的返回值：', routeData)
  window.open(routeData.href, type);
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
