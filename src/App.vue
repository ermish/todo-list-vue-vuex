<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import store from './vuex/store.js'

export default {
  name: 'app',
  store
}
</script>

<style lang="scss">
@import './sass/_variables.scss';

html, body, #app {
  background-color: $background-color;
  margin:0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
