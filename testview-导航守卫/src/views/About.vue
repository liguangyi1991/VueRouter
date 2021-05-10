<template>
  <div>关于页面</div>
</template>
<script>
export default {
  name: "about",
  // beforeEnter: (to, from, next) => {
  //   console.log(进入about路由);
  // },
  beforeRouteEnter(to,from,next) {
    next();
    console.log('进入about路由');
  },
  beforeRouteUpdate(to,from,next) {
    next();
    //该路由参数更新时执行
    console.log('路由参数改变');
  },
  beforeRouteLeave (to,from,next) {
    next();
    console.log('离开路由了');
  }
};
</script>
<style scoped>
</style>
