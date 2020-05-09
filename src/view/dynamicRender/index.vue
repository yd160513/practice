<template>
  <div class="dynamicRendering">
    <el-tabs v-model="activeName">
      <el-tab-pane label="第一种数据格式" name="first">
        <el-form ref="form" :model="form" label-width="90px">
          <el-row
            type="flex"
            v-for="(item, index) in mockList1"
            :key="index"
            class="row-bg"
            justify="center"
          >
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item>
                  <el-checkbox :label="item.label" v-model="checkedList1[index].checked"></el-checkbox>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label>
                  <el-input
                    :disabled="!checkedList1[index].checked"
                    v-model="checkedList1[index].inputValue"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-input disabled v-model="checkedList1[index].inputValue"></el-input>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <el-button @click="btn">打印</el-button>
      </el-tab-pane>
      <el-tab-pane label="第二种数据格式" name="second">
        <el-form label-width="90px">
          <el-row
            type="flex"
            v-for="(item, index) in mockList2"
            :key="index"
            class="row-bg"
            justify="center"
          >
            <el-checkbox-group v-model="checkList2">
              <el-form-item>
                <el-checkbox :label="item.label"></el-checkbox>
              </el-form-item>
            </el-checkbox-group>
            <el-form-item>
              <el-input v-model="item.inputValue"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-button @click="btn2">打印</el-button>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        value: ""
      },
      form1: {
        value: ""
      },
      activeName: "second",
      /* ********************第一种数据格式********************** */
      // 后台
      mockList1: [{ label: "babel1" }, { label: "babel2" }],
      // 选中的
      checkedList1: [
        { checked: "", inputValue: "" },
        { checked: "", inputValue: "" }
      ],
      /* ********************第二种数据格式********************** */
      // 后台
      mockList2: [
        { label: "babel1", inputValue: "" },
        { label: "babel2", inputValue: "" }
      ],
      // 选中的
      checkList2: []
    };
  },
  created() {},
  methods: {
    btn() {
      console.log(this.checkedList1);
    },
    btn2() {
      const newArr = [];
      for (let value of this.checkList2) {
        for (let item of this.mockList2) {
          if (value === item.label) {
            newArr.push(item);
          }
        }
      }
      console.log(newArr);
    }
  },
  watch: {
    isChecked(val) {
      this.form.isChecked = val;
    },
    checkedList1(val) {
      console.log(val);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
