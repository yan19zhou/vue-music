<template>
  <div id="app">
    <m-header></m-header>
    <router-view/>
  </div>
</template>

<script>
import MHeader from "components/m-header/m-header"
export default {
  name: 'App',
  components:{
    MHeader
  }
}
</script>

<style lang="stylus">

 @import "./common/stylus/index.styl"

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background :$color-background
}
</style>

