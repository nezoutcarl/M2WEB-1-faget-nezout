<template>
  <div id="app">
    <div class="container">
      <img src="./assets/logo1.png" alt="loading"/>
    </div>
    <app-nav/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import AppNav from '@/components/AppNav'

export default {
  name: 'App',
  components: { AppNav },
  data () {
    return {
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
