<template>
  <div id="app" v-cloak>
    <table style="border: 1px solid;">
      <tr>
        <td>序号</td>
        <td>商品单价</td>
        <td>购买数量</td>
        <td>操作</td>
      </tr>
      <tr v-if="list.length == 0">
        <td>暂无数据</td>
      </tr>
      <tr v-else v-for="(i, index) in list" :key="index">
        <td>{{i.id}}</td>
        <td>{{i.price}}</td>
        <td>
          <button @click="add(index)">+</button>
          &nbsp;&nbsp;{{i.count}}&nbsp;&nbsp;
          <button
            @click="remove(index)"
            :disabled="i.count == 0"
          >-</button>
        </td>
        <td>
          <button @click="remBtn(index)">移除</button>
        </td>
      </tr>
    </table>
    <div>总价：{{ totalPrice }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          name: "iphone",
          price: 588,
          count: 1
        },
        {
          id: 2,
          name: "iphone",
          price: 588,
          count: 1
        },
        {
          id: 3,
          name: "iphone",
          price: 588,
          count: 1
        }
      ],
      total: 0
    };
  },
  computed: {
    totalPrice() {
      var total = 0;
      for (var i = 0; i < this.list.length; i++) {
        total += this.list[i].count * this.list[i].price;
      }
      return total;
    }
  },
  methods: {
    add(index) {
      this.list[index].count++;
    },
    remove(index) {
      this.list[index].count--;
    },
    remBtn(index) {
      this.list.splice(index, 1);
    }
  }
};
</script>
<style>
</style>