<template>
  <div id="app">
    <div class="container">
      <app-nav/>
      <img src="./assets/logo1.png" alt="logo"/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import AppNav from './components/AppNav'

export default {
  name: 'App',
  components: {AppNav}
}
</script>

<style>
@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
body,
html {
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color: #fdfcfa;
}
</style>
