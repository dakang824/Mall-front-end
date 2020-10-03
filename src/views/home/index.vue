<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 首页
 * @Date: 2020-09-28 21:15:23
 * @LastEditTime: 2020-10-03 20:56:30
-->
<template>
  <div class="home">
    <div class="el-card">
      <div class="header w">
        <logo></logo>
        <search></search>
      </div>
    </div>

    <Category></Category>
    <div v-for="(item, index) in floorData" :key="index" class="goods-item">
      <Floor :model="item"></Floor>
    </div>
  </div>
</template>

<script>
  import Logo from "@/components/logo.vue";
  import Search from "@/components/search.vue";
  import Category from "./components/category.vue";
  import Floor from "./components/floor.vue";
  export default {
    name: "Home",
    components: {
      Search,
      Category,
      Floor,
      Logo,
    },
    data() {
      return {
        floorData: ["菜品", "菜谱", "菜盒", "设备"],
      };
    },
    created() {},
    methods: {},
  };
</script>
<style lang="scss" scoped>
  @import "@/assets/scss/settings";
  .header {
    @include center-flex(y);
    .search {
      margin-left: 93px;
      padding: 36px 0 39px 54px;
    }
  }
</style>
