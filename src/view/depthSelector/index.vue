<template>
  <div>
    <child class="parent-custom"></child>
    <p>sass的写法：</p>
    <pre>
      style rel="stylesheet/scss" lang="scss" scoped
        .parent-custom {
          font-size: 10px;
          <b>/deep/</b> .child-title {
            font-size: 28px;
            color: red;
          }
        }
      style
    </pre>
    <p>less的写法：</p>
    <pre>
      style rel="stylesheet/less" lang="less" scoped
        <b>@deep: ~'>>>';</b>
        .parent-custom {
          font-size: 10px;
          <b>@{deep}</b> .child-title {
            font-size: 28px;
            color: blue;
          }
        }
      style
    </pre>
  </div>
</template>
<script>
import child from './child'
export default {
  name: 'parent',
  components: {
    child
  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>
@deep: ~'>>>';
.parent-custom {
  font-size: 10px;
  @{deep} .child-title {
    font-size: 28px;
    color: blue;
  }
}
</style>

