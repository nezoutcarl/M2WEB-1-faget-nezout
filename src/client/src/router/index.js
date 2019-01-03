import Vue from 'vue'
import Router from 'vue-router'
import Test from '@/components/Test'
import Posts from '@/components/Posts'
import Callback from '@/components/Callback'
import Home from '@/components/Home'

Vue.use(Router)

const router = new Router({
  mode: 'history', // enable history mode
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    }
  ]
})

// very basic "setup" of a global guard
router.beforeEach((to, from, next) => {
  if (to.name === 'callback') { // check if "to"-route is "callback" and allow access
    next()
  } else if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
    next()
  } else { // trigger auth0 login
    router.app.$auth.login()
  }
})

export default router
