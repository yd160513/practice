<template>
  <div>
    <label for="1">单选框1</label>
    <input type="radio" name="radio" id="1" value="单选框1" v-model="radioText">
    <label for="3">单选框2</label>
    <input type="radio" name="radio" id="3" value="单选框2" v-model="radioText">
    <div>
      选中的值为：{{ radioText }}
    </div>
    <br/>
    <label for="2">单个多选框声明监听的值为字符串时</label>
    <input type="checkbox" name="checkbox" id="2" value="单个多选框声明监听的值为字符串时" v-model="checkboxText">
    <div>
      选中的值为：{{ checkboxText }}
    </div>
    <br/>
    <label for="checkbox2">单个多选框声明监听的值为数组时</label>
    <input type="checkbox" name="checkbox" id="checkbox2" value="单个多选框声明监听的值为数组时" v-model="checkboxTextArr">
    <div>
      选中的值为：{{ checkboxTextArr }}
    </div>
    <br/>
    <label for="jack">多选框1</label>
    <input type="checkbox" name="checkbox1" value="jack" id="jack" v-model="checkboxList">
    <label for="john">多选框2</label>
    <input type="checkbox" name="checkbox2" value="john" id="john" v-model="checkboxList">
    <label for="mike">多选框3</label>
    <input type="checkbox" name="checkbox3" value="mike" id="mike" v-model="checkboxList">
    <div>
      选中的值为：{{ checkboxList }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'radioCheckbox',
  data() {
    return {
      radioText: '',
      checkboxText: '',
      checkboxTextArr: [],
      checkboxList: []
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
