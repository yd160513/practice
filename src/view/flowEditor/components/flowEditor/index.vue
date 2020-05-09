<template>
  <div class="flow-editor">
    <div ref="myDiagramDiv" class="diagram"></div>
  </div>
</template>
<script>
window.go = require("gojs");

/**********************GraphObject************************ */
/**
 * GraphObject: 所有图形对象的抽象基类
 * 子类有: Shape、TextBlock、Picture、Panel, Node 和 Link 类就是从这个类派生的
 * $() 有三个参数: 第一个是 初始化面板 (go.Diagram)
 *                第二个是 初始化面板要放到页面中的哪个地方 (this.$refs.myDiagramDiv 或 id 名称)
 *                第三个是 一个对象，对象中配置所需要的属性
 */
const $ = go.GraphObject.make;
export default {
  name: "FlowEditor",
  data() {
    return {
      myDiagram: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.myDiagram = $(go.Diagram, this.$refs.myDiagramDiv, {
        // initial Content Alignment: 初始内容对齐, 还有其他方式
        initialContentAlignment: go.Spot.Center,
        // 是否可拖拽
        isEnabled: false,
        // mouseWheelBehavior: 获取或设置鼠标的滚轮行为
        // WheelNone: 忽略鼠标的滚轮事件，但是允许通过其他方式滚动或者缩放
        'toolManger.mouseWheelBehavior': go.ToolManager.WheelNone,
        // 获取或设置用户是否可以绘制新链接，初始值为 true
        allowLink: false,
        // 获取或设置用户是否可以移动对象，初始值为true
        allowMove: false,
        // 获取或设置用户是否可以重新连接现有链接。初始值为true。
        allowRelink: false,
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.flow-editor {
  .diagram {
    height: 600px;
    border: 1px solid red;
  }
}
</style>