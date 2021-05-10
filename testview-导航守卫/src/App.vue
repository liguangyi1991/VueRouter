<template>
  <div id="app">
    <button @click="$linkTo({ path: '/about'})">去about页面</button>
    <router-view />
  </div>
</template>
<script>


</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
