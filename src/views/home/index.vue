<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 首页
 * @Date: 2020-09-28 21:15:23
 * @LastEditTime: 2020-10-14 20:43:00
-->
<template>
  <div class="home">
    <div class="el-card">
      <div class="header w">
        <logo></logo>
        <search></search>
      </div>
    </div>

    <Category :model="category"></Category>
    <div v-for="(item, index) in floorData" :key="index" class="goods-item">
      <Floor :model="item"></Floor>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
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
      return {};
    },
    computed: mapState({
      category: (state) => state.home.category,
      floorData: (state) => state.home.floorData,
    }),
    async mounted() {
      const res = await this.$store.dispatch("home/homePageInit");
      console.log(res);
    },
    methods: {},
  };
</script>
<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .header {
    @include center-flex(y);
    @include justify();
    .search {
      padding: 36px 0 39px;
    }
  }
</style>
