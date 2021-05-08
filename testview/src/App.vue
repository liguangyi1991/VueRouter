<template>
  <div id="app">
    <div id="nav">
      <h1>{{$route.name}}</h1>
      <router-link to="/">Home</router-link>|
      <router-link to="/about/测试">About</router-link>|
      <!-- <router-link :to="{name:'About',params:{username: '李广义'}}">About</router-link> -->
    </div>
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

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
