<template>
<!-- v-wechat-title="$route.meta.title" -->
  <div id="app" >
    <router-view />
    <lg-preview />
  </div>
</template>

<script>
export default {
  name: 'App',
  watch:{
    $route:{
      handler:function (to, from) {
        window.document.title = to.meta.title
      },
      immediate:true
    }
  }
}
</script>

<style>
#app {
  font-family: 'PingFangSC-Regular', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f5f5f5;
}

</style>
