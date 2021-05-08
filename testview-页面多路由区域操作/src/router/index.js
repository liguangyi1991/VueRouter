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
    components: {
      default: HelloWorld,
      left: H1,
      right: H2
    }
  },
  {
    path: '/h1',
    name: 'H1',
    components:{
      default: HelloWorld,
      left: H2,
      right: H1
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
