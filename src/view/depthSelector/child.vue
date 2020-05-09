<template>
  <div>
    <h1 class="child-title">
      如果你希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 >>> 操作
    </h1>
  </div>
</template>
<script>
export default {
  name: 'child'
}
</script>
<style lang="scss" scoped>
  .child-title {
    font-size: 18px;
  }
</style>
