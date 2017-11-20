import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import Project from '@/pages/Project.vue'
import Audit from '@/pages/audit/Audit.vue'
import Background from '@/components/Background.vue'
import Login from '@/pages/Login.vue'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/app',
      // name: 'app',
      component: Project,
      // 当/app匹配成功,ProjectList会被渲染在Project的<router-view>中
      children: [
        {
          path: 'p',
          name: 'project.background',
          component: Background,
          children: [
            // info
            {
              path: 'audit',
              name: 'project.audit',
              component: Audit
            },
            {
              path: '*',
              redirect: {name: 'project.audit'}
            }]
        }, {
          path: '*',
          redirect: {name: 'project.background'}
        }]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
