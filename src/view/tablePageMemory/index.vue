<template>
  <div>
    <el-table :data="tableData" ref="table" @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
    </el-table>
    <el-pagination
      :page-size="pagination.pageSize"
      @current-change="currentChange"
      :current-page="pagination.pageNumber"
      :page-sizes="pagination.pageSizes"
      :total="pagination.totalRows"
      :layout="pagination.layout"
      @size-change="sizeChange"
    ></el-pagination>
    <div>
      <el-button @click="$router.push({path: '/dialogtablePageMemory'})">跳转到 DialogtablePageMemory</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      multipleSelectionAll: [], // 所有选中的数据包含跨页数据
      multipleSelection: [], // 当前页选中的数据
      idKey: "id", // 标识列表数据中每一行的唯一键的名称(需要按自己的数据改一下)
      tableData: [], // 表格数据
      pagination: {
        totalRows: 0, //总条数
        pageSize: 5, //每页显示条数
        pageSizes: [5, 10, 15],
        pageNumber: 1,
        layout: "total, sizes, prev, pager, next, jumper"
      }
    };
  },

  mounted: function() {
    this.$nextTick(function() {
      // 初始化渲染
      this.pagination.pageNumber = 1;
      this.queryData();
      // 模拟弹窗初始化选中一条
      this.checkedData = [{ id: 1 }];
    });
  },

  methods: {
    // 切换的时候将点击的这个赋值给当前页选中的
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 切换每页显示条数
    sizeChange(val) {
      this.pagination.pageSizes = val;
      this.selectChangeCore();
      this.queryData();
    },

    // 切换当前页
    currentChange(val) {
      this.pagination.pageNumber = val;
      this.selectChangeCore();
      this.queryData();
    },

    // 设置选中行
    setSelectRow() {
      // 1. 如果所有选中的为空，则退出
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length === 0)
        return;
      // 2. 拿到所有选中的标识符
      const idKey = this.idKey;
      const allSelectedIds = [];
      this.multipleSelectionAll.forEach(row => {
        allSelectedIds.push(row[idKey]);
      });
      // 设置选中之前先清空一次
      this.$refs.table.clearSelection();
      // 3. 遍历所有数据，如果有选中的则设置为选中行
      this.tableData.forEach(row => {
        if (allSelectedIds.includes(row[idKey])) {
          this.$refs.table.toggleRowSelection(row, true);
        }
      });
    },

    // 核心代码(判断是否选中，是选中还是取消)
    selectChangeCore() {
      // 1. 判断所有选中中是否为空，为空则直接赋值并return
      if (
        !this.multipleSelectionAll ||
        this.multipleSelectionAll.length === 0
      ) {
        this.multipleSelectionAll = this.multipleSelection;
        return;
      }
      // 2. 获取所有选中的标识符到数组
      const idKey = this.idKey;
      const allSelectedIds = [];
      this.multipleSelectionAll.forEach(row => {
        allSelectedIds.push(row[idKey]);
      });
      // 3. 获取当前页所选中的标识符并存到数组，如果当前页选中的标识符没有出现在所有选中的标识符中，则将其对应的行添加到所有选中中的行中
      const selectedIds = [];
      this.multipleSelection.forEach(row => {
        selectedIds.push(row[idKey]);
        if (!this.multipleSelectionAll.includes(row[idKey])) {
          this.multipleSelectionAll.push(row);
        }
      });
      // 4. 获取当前页未选中的标识符到数组，如果当前页未选中的标识符在所有选中的标识符中出现，则将其所对应的行从所有选中的行中删除
      const noSelectedIds = [];
      this.tableData.forEach(row => {
        if (!selectedIds.includes(row[idKey])) {
          noSelectedIds.push(row[idKey]);
        }
      });
      noSelectedIds.forEach(rowId => {
        if (allSelectedIds.includes(rowId)) {
          this.multipleSelectionAll.forEach((row, index) => {
            if (row[idKey] === rowId) {
              this.multipleSelectionAll.splice(index, 1);
            }
          });
        }
      });
    },

    // 查询数据
    queryData() {
      // start-----模拟动态分页
      this.tableData = [];
      this.pagination.totalRows = 30;
      let i = (this.pagination.pageNumber - 1) * this.pagination.pageSize + 1;
      let max = this.pagination.pageNumber * this.pagination.pageSize;
      for (; i <= max; i++) {
        this.tableData.push({
          id: i,
          name: "晓东" + i,
          gender: "男" + i
        });
      }
      // end------模拟动态分页
      setTimeout(() => {
        this.setSelectRow();
      }, 20);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
