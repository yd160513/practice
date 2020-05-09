<template>
  <div class="dialog-box">
    <el-button @click="dialogVisible = true">打开弹窗</el-button>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="活动名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Dialog",
  data() {
    return {
			dialogVisible: false,
			form: {
				name: ''
			}
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.dialog-box {
}
</style>