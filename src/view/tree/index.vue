<template>
  <div class="tree">
    <el-tree 
      :data="treeList" 
      :props="defaultProps" 
      node-key="label"
      @node-click="handleNodeClick"
    ></el-tree>
  </div>
</template>
<script>
import tree from "@/mock/tree";
export default {
  name: "tree",
  data() {
    return {
      treeList: [],
      defaultProps: {
        children: "children", // 子节点
        label: "label" // 显示到页面上的名称
      }
    };
  },
  created() {
    this.treeList = this.formatTreeList(tree);
    console.log(this.treeList);
  },
  methods: {
    // 点击事件
    handleNodeClick(obj, node, me) {
      if (obj.children.length > 0) {
        
      }
    },
    formatTreeList(dataList) {
      // 获取所有的父节点
      let treeParentList = [];
      dataList.forEach(item => {
        let { pid } = item;
        if (pid === "0") {
          let { id, label } = item;
          let objTemp = {
            pid,
            id,
            label
          };
          treeParentList.push(objTemp);
        }
      });
      return this.getChildNode(dataList, treeParentList);
    },
    // 递归函数：循环判断有没有子节点
    getChildNode(dataList, treeParentList) {
      for (let i = 0; i < treeParentList.length; i++) {
        // 拿到父节点
        let parent = treeParentList[i];
        // 父节点中的id,也就是子节点中pid
        let parentId = parent.id;
        // 所有的子节点
        let childList = [];
        for (let k = 0; k < dataList.length; k++) {
          let item = dataList[k];
          // 子节点中的pid
          let { pid } = item;
          if (pid === parentId) {
            let { id, label } = item;
            let objTemp = {
              id,
              label,
              pid
            };
            childList.push(objTemp);
          }
        }
        parent.children = childList;
        if (childList.length > 0) {
          this.getChildNode(dataList, childList);
        }
      }
      return treeParentList;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
