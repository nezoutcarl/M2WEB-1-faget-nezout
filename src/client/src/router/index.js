import Vue from 'vue'
import Router from 'vue-router'
import Test from '@/components/Test'
import Posts from '@/components/Posts'

Vue.use(Router)

export default new Router({
  routes: [
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
