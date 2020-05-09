<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu mode="vertical"
      :default-active="$route.path"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF">
      <sidebar-item :routes="permission_routers" @click="changePage(item.path)"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>
<script>
import { mapGetters } from 'vuex'
import SidebarItem from "./sidebarItem"

export default {
  components: {
    SidebarItem
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data() {
    return {
      permission_routers: [
        // {
        //   id: '1',
        //   name: "验证码倒计时",
        //   path: "/countDown"
        // },
        // {
        //   id: '2',
        //   name: "计算属性切换颜色",
        //   path: "/changeColor"
        // },
        // {
        //   id: '3',
        //   name: "深度选择器",
        //   path: "/depthSelector"
        // },
        // {
        //   id: '4',
        //   name: "json转tree",
        //   path: "/tree"
        // }
      ]
    };
  },
  created() {
    this.addPath();
  },
  methods: {
    addPath() {
      const obj = {
        '验证码倒计时': '/countDown', 
        '计算属性切换颜色': '/changeColor', 
        '深度选择器': '/depthSelector', 
        'json转tree': '/tree',
        '动态渲染checkbox和input': '/dynamicRender',
        'keepAlive': '/keepAliveA',
        'RadioCheckbox': '/radioCheckbox',
        '字符串验证': '/validate',
        '排序表格': '/sortTable',
        '循环表单': '/loopForm',
        '表格分页记忆': '/tablePageMemory',
        '购物车demo': '/shoppingCart',
        '流程编辑器': '/flowEditor',
        '字符串模板渲染样式': '/stringRenderStyle',
        '弹窗': '/dialog',
      };
      const id = '0';
      for (let [key, value] of Object.entries(obj)) {
        const objTemp = {
          name: key,
          path: value
        };
        this.permission_routers.push(objTemp);
      }
    },
    changePage(path) {
      this.$router.push({
        path
      });
    }
  }
};
</script>

<style lang="less" scoped>
.sidebar-container {
  width: 180px !important;
}
</style>


