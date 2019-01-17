import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Callback from '@/components/Callback'
import Product from '@/components/Product'
import Products from '@/components/Products'
import SearchedProducts from '@/components/SearchedProducts'
import Brand from '@/components/Brand'
import Brands from '@/components/Brands'
import Category from '@/components/Category'
import Categories from '@/components/Categories'
import SearchedCategories from '@/components/SearchedCategories'
import Country from '@/components/Country'
import Countries from '@/components/Countries'
import SearchedCountries from '@/components/SearchedCountries'
import Favorites from '@/components/Favorites'

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
      path: '/products/:code/:page',
      name: 'SearchedProducts',
      component: SearchedProducts
    },
    {
      path: '/brand/:name/products/:page',
      name: 'Brand',
      component: Brand
    },
    {
      path: '/brands',
      name: 'Brands',
      component: Brands
    },
    {
      path: '/category/:name/products/:page',
      name: 'Category',
      component: Category
    },
    {
      path: '/categories',
      name: 'Categories',
      component: Categories
    },
    {
      path: '/categories/:name',
      name: 'SearchedCategories',
      component: SearchedCategories
    },
    {
      path: '/country/:name/products/:page',
      name: 'Country',
      component: Country
    },
    {
      path: '/countries',
      name: 'Countries',
      component: Countries
    },
    {
      path: '/countries/:name',
      name: 'SearchedCountries',
      component: SearchedCountries
    },
    {
      path: '/user/:id/favorites',
      name: 'favorites',
      component: Favorites
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
