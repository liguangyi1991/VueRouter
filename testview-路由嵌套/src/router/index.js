import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import H1 from '@/components/H1'
import H2 from '@/components/H2'

Vue.use(VueRouter)

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

const router = new VueRouter({
  routes
})

export default router
