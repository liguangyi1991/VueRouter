<template>
  <div id="app">
    <router-link :to="{name:'HelloWord'}">主页面</router-link>|
    <router-link :to="{name:'H1'}">H1页面</router-link>|
    <router-link :to="{name:'H2'}">H2页面</router-link>
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
