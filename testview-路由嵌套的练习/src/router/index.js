import Vue from 'vue'
import VueRouter from 'vue-router'
import UserSetting from '@/components/UserSetting'
import SettingSub from '@/components/SettingSub'
import SettingProfile from '@/components/SettingProfile'
import Error from '@/components/Error'


Vue.use(VueRouter)

const routes = [
  {
    path: '/setting',
    name: 'UserSetting',
    component: UserSetting,
    children: [
      {
        path: 'email',
        component: SettingSub
      },
      {
        path: 'profile',
        component: SettingProfile
      }
    ]

  },
  {
    path: '/',
    redirect: '/setting'
  },
  {
    path: '*',
    component: Error
  }
]

const router = new VueRouter({
  routes
})

export default router
