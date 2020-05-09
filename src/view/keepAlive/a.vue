<template>
  <div>
    <div>
      <div>
        <p>Page A</p>
        <div>
          Count: {{ count }}
          <button @click="plus">+</button>
        </div>
      </div>
    </div>
    <router-link to="/keepAliveB">跳B</router-link>
    <router-link to="/keepAliveC">跳C</router-link>
  </div>
</template>
<script>
export default {
  name: "KeepAliveA",
  data() {
    return {
      count: ""
    };
  },
  methods: {
    plus() {
      this.count++;
    }
  },
  // beforeRouteLeave(to, from, next) {
  //   if (to.path === '定义的路由') {
  //     from.meta.keepAlive = true;
  //   } else {
  //     from.meta.keepAlive = false;
  //   }
  // }
};
</script>
<style lang="scss" scoped>
</style>
