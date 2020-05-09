<template>
  <div>
    <div>
      <div>这里是C页面</div>
      <router-link to="/keepAliveA">跳A</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "KeepAliveC",
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = false; // 让 A 不缓存，即刷新
    next();
  }
};
</script>
<style lang="scss" scoped>
</style>
