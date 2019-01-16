import Vue from 'vue'
import Router from 'vue-router'
import Test from '@/components/Test'
import Posts from '@/components/Posts'
import Product from '@/components/Product'
import Products from '@/components/Products'
import Callback from '@/components/Callback'
import Favorite from '@/components/Favorite'
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
      path: '/product/:code',
      name: 'Product',
      component: Product
    },
    {
      path: '/products/:page',
      name: 'Products',
      component: Products
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
    },
    {
      path: '/user/:id/favorite',
      name: 'favorites',
      component: Favorite
    }
  ]
})

// very basic "setup" of a global guard
router.beforeEach((to, from, next) => {
  if (to.name === 'callback') { // check if "to"-route is "callback" and allow access
    console.log('okCall')
    next()
  } else if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
    next()
  } else { // trigger auth0 login
    router.app.$auth.login()
  }
})

export default router
