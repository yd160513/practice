<template>
  <div class="string-render-style">
    <template v-for="(item, index) in dataArray">
      <span :key="index">
        <span>{{ item }}</span>
        <span
          class="money"
          :class="{'red-money': index === Object.values(fields).length - 1}"
        >{{ Object.values(fields)[index] }}</span>
      </span>
    </template>
  </div>
</template>
<script>
export default {
  name: "StringRenderStyle",
  data() {
    return {
      allData:
        "当前工程的批复估算200万元，设计概算5200万元，已编制招标控制价是3500万元，已直接发包的合同金额0，本次招标控制价需要限制在2502万元以内",
      fields: {
        one: 200,
        two: 5200,
        three: 3500,
        four: 0,
        five: 2502
      },
      dataArray: []
    };
  },
  methods: {
    filterNAN(data) {
      return data.match(/\D+/g);
    }
  },
  created() {
    this.dataArray = this.filterNAN(this.allData);
  }
};
</script>
<style lang="scss" scoped>
.string-render-style {
  .money {
    color: blue;
  }
  .red-money {
    color: red;
  }
}
</style>