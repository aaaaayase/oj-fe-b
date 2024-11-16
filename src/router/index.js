import { getToken } from '@/utils/cookie'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/oj/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/',
      redirect: '/oj/login',
    },
    {
      path: '/oj/layout',
      name: 'layout',
      component: () => import('@/views/Layout.vue'),
      children: [
        {
          path: 'question',
          name: 'question',
          component: () => import('@/views/Question.vue')
        },
        {
          path: 'exam',
          name: 'exam',
          component: () => import('@/views/Exam.vue')
        },
        {
          path: 'updateExam',
          name: 'updateExam',
          component: () => import('@/views/UpdateExam.vue')
        },
        {
          path: 'cuser',
          name: 'cuser',
          component: () => import('@/views/Cuser.vue')
        },
      ]
    },

  ]
})

router.beforeEach((to, from, next) => {
  if (getToken()) {
    // 有token 并且要访问登录界面的情况下直接让它进后台
    if (to.path === '/oj/login') {
      next({ path: '/oj/layout/question' })
    } else {
      next()
    }
  } else {
    // 没有token要访问后台 直接跳转登录页面
    if (to.path !== '/oj/login') {
      next({
        path: '/oj/login'
      })
    } else {
      next()
    }
  }

})
export default router
