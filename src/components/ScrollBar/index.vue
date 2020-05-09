<template>
  <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{ top: top + 'px' }">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'scrollBar',
  data() {
    return {
      top: 0
    };
  },
  methods: {
    handleScroll(e) {
      // 滚动的距离
      const eventDelta = e.wheelDelta || -e.deltaY * 3;
      // 外部容器的高度
      const $containerHeight = this.$refs.scrollContainer.offsetHeight;
      // 内部容器高度
      const $wrapperHeight = this.$refs.scrollWrapper.offsetHeight;
      // 向上滚动
      if(eventDelta > 0) {
        /**
         * 如果用max，那么在上边到头的时候继续向上滚动，上边会出现空白
         */
        this.top = Math.min(0, this.top + eventDelta);
      // 向下滚动
      } else {
        /**
         * 下边没有了，则top就一直等于已经滚动的高度
         * 用这次滚动的距离+已经滚动了的距离-一共可以滚动的高度，
         * 如果大于就说明到头了。
         */
        if((this.top + eventDelta) > ($containerHeight - $wrapperHeight)) {
          this.top = this.top;
        } else {
          this.top = this.top + eventDelta;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.scroll-container {
  .scroll-wrapper {
    background-color: red;
  }
}

</style>
