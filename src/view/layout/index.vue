<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"></sidebar>
		<div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
		</div>
  </div>
</template>
<script>
import { Sidebar, Navbar, AppMain } from './components'
export default {
  components: {
    Sidebar,
    Navbar,
    AppMain
  },

  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation, // 没有动画
        mobile: this.device === 'mobile' // 移动端PC端切换
      }
    }
  },
  methods: {
    handleClickOutside() {
      // this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
  }
}
</script>
<style scoped>
.app-wrapper {
	  position: relative;
	  height: 100%;
	  width: 100%;
	}
</style>

