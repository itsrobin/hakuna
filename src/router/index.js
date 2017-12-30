import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import Project from '@/pages/Project.vue'
import Book from '@/pages/manage/Book.vue'
import User from '@/pages/manage/User.vue'
import Background from '@/components/Background.vue'
import Upload from '@/pages/file/Upload.vue'
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
              path: 'book',
              name: 'project.book',
              component: Book
            },
            {
              path: 'user',
              name: 'project.user',
              component: User
            },
            {
              path: 'upload',
              name: 'project.upload',
              component: Upload
            },
            {
              path: '*',
              redirect: {name: 'project.book'}
            }]
        }, {
          path: '*',
          redirect: {name: 'project.book'}
        }]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
