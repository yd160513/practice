<template>
  <div class="loopForm">
    <el-form
      :model="productForm"
      status-icon
      :rules="rules"
      ref="productForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="产品名称" prop="name">
        <el-input type="password" v-model="productForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="产品描述" prop="descride">
        <el-input type="password" v-model="productForm.descride" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="问题列表">
        <header>
          <el-button type="primary" @click="addChild">添加</el-button>
          <el-button type="primary" @click="delChild">清空</el-button>
          <el-button type="primary" @click="packUp" v-if="productForm.childList.length">{{isShow ? '展开' : '收起'}}</el-button>
        </header>
        <div :class="{isActive: isShow}">
          <div 
            v-for="(itemForm, index) in productForm.childList"
            :key="index">
            <h3>问题{{index + 1}}</h3>
            <el-form
              :model="itemForm"
              status-icon
              :rules="childRules"
              ref="childForm"
              label-width="100px"
              class="demo-ruleForm">
              <el-form-item label="标题" prop="title">
                <el-input v-model="itemForm.title" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="描述" prop="description">
                <el-input v-model="itemForm.description" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <el-button type="primary" @click="delChildItem(index)">删除</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('productForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "loopForm",
  data() {
    return {
      isShow: true,
      rules: {
        name: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
        descride: [
          { required: true, message: "请输入产品描述", trigger: "blur" }
        ]
      },
      childRules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" }
        ]
      },
      productForm: {
        name: "1", // 名称
        descride: "1", // 描述
        childList: [] // 问题列表
      },
    };
  },
  methods: {
    // 添加
    addChild() {
      this.productForm.childList.push({
        title: '',
        description: '',
      })
      this.isShow = false;
    },
    // 清空
    delChild() {
      this.productForm.childList = [];
      this.isShow = true;
    },
    // 展开
    packUp() {
      this.isShow = !this.isShow;
    },
    // 每一项的删除
    delChildItem(index) {
      this.productForm.childList.splice(index, 1);
    },
    // 提交
    submitForm(refName) {
      this.$refs[refName].validate(valid => {
        if (valid) {
          let v = this.validateChildForm(refName);
          if (!v) return false;
          this.$message({
            type: 'success',
            message: '验证通过'
          });
        } else {
          this.$message({
            type: 'error',
            message: '验证失败'
          });
          return false;
        }
      });
    },
    // 验证子表单
    validateChildForm(refName) {
      let flag = true;
      for (let i = 0; i < this.productForm.childList.length; i++) {
        this.$refs['childForm'][i].validate(valid => {
          if (!valid) {
            this.isShow = true;
            this.$message({
              type: 'error',
              message: '子表单验证失败'
            });
            flag = false;
          }
        })
      }
      return flag;
    }
  }
};
</script>
<style lang="scss" scoped>
.loopForm {
  .isActive {
    height: 0;
    overflow: hidden;
  }
}
</style>
