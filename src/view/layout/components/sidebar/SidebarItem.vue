<template>
  <div>
    <template v-for="item in routes">
      <router-link :to="item.path" :key="item.name">
        <el-menu-item :index="item.name">
          <!-- <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon> -->
          <span>{{ item.name }}</span>
        </el-menu-item>
      </router-link>
    </template>
  </div>
</template>
<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  },
}
</script>
<style lang="scss">
a:-webkit-any-link {
  text-decoration: none;
}
</style>
