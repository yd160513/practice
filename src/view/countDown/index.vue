<template>
  <div>
    <count-down
      :start="start" 
      :isDisabled="isDisabled"
      @countDown1="go"
      @click.native="sendCode"></count-down>
  </div>
</template>
<script>
import countDown from '@/components/countDown'
export default {
  components: {
    countDown
  },
  data() {
    return {
      start: false,
      isDisabled: false
    }
  },
  methods: {
    go(value) {
      this.start = false; // 初始化start，否则第二次无法点击
      this.isDisabled = value;
    },
    sendCode(value) {
      // 发送请求成功之后开始倒计时
      this.start = true;
      this.isDisabled = true;
    }
  }
}
</script>
<style scoped>

</style>

