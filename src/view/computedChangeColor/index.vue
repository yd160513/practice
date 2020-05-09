<template>
  <div>
    <ul>
      <li
        v-for="(item, index) in message"
        :key="index"
        @click="item.isRed = !item.isRed"
        :class="{ red: item.isRed }">{{ item.name }}</li>
    </ul>
    <button :class="allchoose">必须全选才可以提交</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: []
    };
  },
  created() {
    let data = [
      { name: "混无霹雳手帅不？" },
      { name: "混无霹雳手是老司机不？" },
      { name: "混无霹雳手分享的好不好？" }
    ];
    for(let i of data) {
      this.$set(i, 'isRed', false);
    }
    this.message = data;
  },
  computed: {
    allchoose() {
      for(let i of this.message) {
        if(i.isRed === false) {
          return { yellow: false}
        }
      }
      return { yellow: true }
    }
  }
};
</script>
<style scoped>
.red{
    background:red;
}
button{
    background:gray;
}
.yellow {
    background:yellow
}
</style>

