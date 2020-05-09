<template>
  <div class="CountDown">
    <button :disabled="isDisabled">{{ time | change }}</button>
  </div>
</template>

<script>
let flag = false;
export default {
  name: "CountDown",
  props: {
    start: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      time: "获取验证码"
    };
  },
  watch: {
    start(value, oldValue) {
      if (value === true) {
        this.countDown(false);
      }
    }
  },
  methods: {
    countDown(v) {
      this.time = 30;
      let _self = this;
      let clearIntervalId = setInterval(() => {
        this.time--;
        if (this.time === 0) {
          this.$emit("countDown1", v);
          this.time = "获取验证码";
          flag = true;
          clearInterval(clearIntervalId);
        }
      }, 100);
    }
  },
  filters: {
    change(value) {
      if (!value) return "";
      if (!isNaN(value)) {
        if(flag === true) {
          return `重新发送${value}s`
        }
        return value + 's'
      } else {
        return value;
      }
    }
  }
};
</script>

<style scoped>
</style>
