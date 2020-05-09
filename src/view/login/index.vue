<template>
  <div class="login">
    <el-main>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-dark"></div>
              </el-col>
            </el-row>
            <el-form ref="loginForm" :rules="userFomrRules" :model="loginForm" label-width="80px">
              <el-form-item label="用户名" prop="name">
                <el-input v-model="loginForm.name"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit()">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </el-main>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        name: "admin",
        password: "1111111"
      },
      userFomrRules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$message({
            type: "success",
            message: "验证通过"
          });
          this.$store.dispatch("LoginByUsername", this.loginForm);
          this.$router.push({
            path: '/'
          });
        } else {
          this.$message({
            type: "error",
            message: "验证失败"
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  text-align: center;
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
}
</style>
