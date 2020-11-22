<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 首页
 * @Date: 2020-09-28 21:15:23
 * @LastEditTime: 2020-11-21 10:57:28
-->
<template>
  <div class="home">
    <div class="el-card no-border-radius">
      <div class="header w">
        <div class="header__logo">
          <logo></logo>
        </div>

        <search v-model="keyWord" @search="handleSearch"></search>
      </div>
    </div>

    <Category
      v-loading="loading"
      :model="category"
      @click="handleClick"
    ></Category>
    <div v-for="(item, index) in floorData" :key="index" class="goods-item">
      <Floor v-loading="loading" :model="item"></Floor>
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
      return {
        keyWord: "",
        loading: true,
      };
    },
    computed: mapState({
      category: (state) => state.home.category,
      floorData: (state) => state.home.floorData,
    }),
    async mounted() {
      this.loading = true;
      const res = await this.$store.dispatch("home/homePageInit");
      setTimeout(() => {
        this.loading = false;
      }, 200);
    },
    methods: {
      handleSearch() {
        const { keyWord } = this;
        this.$router.push({
          path: "/goods-list",
          query: { type: "", condition: keyWord },
        });
      },
      handleClick(e) {
        const { keyWord } = this;
        const { cate_id, sub_cate_id } = e;
        this.$router.push({
          path: "/goods-list",
          query: { type: "", condition: keyWord, cate_id, sub_cate_id },
        });
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .header {
    @include center-flex(y);
    @include justify();

    &__logo {
      @include center-flex(y);

      justify-content: center;
      width: 264px;
    }

    .search {
      padding: 36px 0 39px;
    }
  }
</style>
