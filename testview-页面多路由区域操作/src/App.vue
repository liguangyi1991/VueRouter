<template>
  <div id="app">
    <router-link :to="{name:'HelloWord'}">H1</router-link>|
    <router-link :to="{name:'H1'}">H2</router-link>|
    <router-view />
    <router-view name="left" style="float:left;width:50%;background-color:#ccc;height:300px;" />
    <router-view
      name="right"
      style="float:right;width:50%;background-color:yellowgreen;height:300px;"
    />
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
