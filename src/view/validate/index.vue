<template>
  <div>
    <h3>每三位用逗号分隔</h3>
    <input id="validate" @blur="setInputValue" type="text" v-model="inputValue">
    <div>输入框中的值：{{ inputValue }}</div>
  </div>
</template>
<script>
export default {
  name: "validate",
  data() {
    return {
      inputValue: '1123123.23'
    }
  },
  methods: {
    setInputValue() {
      /* ***************第三版******************* */
      let inputVal = this.inputValue;
      if (inputVal.includes(',')) {
        inputVal = inputVal.replace(/,/g, '');
      }
      console.log(`第三版：${inputVal}`);



      /* ***************第一版******************* */
      // let len = inputVal.length;
      // let newStr = '';
      // let k = 0; // 用来判断新的字符串中有几位了
      // console.log(`数据源：${inputVal}`);
      // for (let i = len - 1; i >= 0; i--) {
      //   if (k % 3 === 0 && k !== 0) { // 有三位了就加一个逗号，0除任何数都得0，所以不能等于0
      //     newStr = inputVal.charAt(i) + ',' + newStr;
      //   } else {
      //     newStr = inputVal.charAt(i) + newStr;
      //   }
      //   k++;
      // }
      // console.log(`新字符串：${newStr}`);
      // console.log(`K：${k}`);
      /* ***************第二版******************* */
      // 遇到小数点不分隔
      // inputVal.indexOf('.') 遇到第一个小数点，返回小数点之前的长度
      let count = 0;
      let newStr2 = '';
      let newInputVal = inputVal.indexOf('.');
      console.log(newInputVal);
      for (let i = newInputVal - 1; i >= 0; i--) {
        if (count % 3 === 0 && count !== 0) {
          newStr2 = inputVal[i] + ',' + newStr2;
        } else {
          newStr2 = inputVal[i] + newStr2;
        }
        count++;
      }
      let newStr3 = inputVal.substr(newStr2.length - 2, 4); // 因为newStr2.length包括了小数点所以要减2，后边的那个是保留几位小数
      console.log(`新字符串2：${newStr2}${newStr3}`);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
