<template>
  <div>
    <div>
      <p>Page B</p>
      <button @click="back(true)">返回（缓存）</button>
      <button @click="back()">返回（不缓存）</button>
    </div>
    <router-link to="/keepAliveA">跳A</router-link>
  </div>
</template>
<script>
export default {
  name: "KeepAliveB",
  data() {
    return {
      count: 1,
      needCache: false
    };
  },
  methods: {
    back(needCache = false) {
      this.needCache = needCache;
      this.$router.push({
        name: "keepAliveA"
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    
    // 设置下一个路由的 meta
    to.meta.keepAlive = this.needCache; // 让 A 缓存，即不刷新
    next();
  }
};
</script>
<style lang="scss" scoped>
</style>
