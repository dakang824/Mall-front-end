<!-- 商品列表 -->
<template>
  <div class="goods-list">
    <div class="el-card">
      <div class="header w">
        <logo></logo>
        <search v-model="postData.condition" @search="fetchData"></search>
      </div>
    </div>
    <div class="box w">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <ul>
            <li
              v-for="(item, index) in category"
              :key="index"
              :class="{ active: index === topCateCurrent }"
              @click="handleTopCateCurrent(item, index)"
            >
              {{ item.name }}
            </li>
          </ul>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="screen el-card">
        <div class="screen__row">
          <span>分类：</span>
          <ul>
            <li
              v-for="(item, index) in category[topCateCurrent].subCategoryList"
              :key="index"
              :class="{ active: index === subCateCurrent }"
              @click="handleSubCateCurrent(item, index)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div class="screen__row">
          <span>产地：</span>
          <ul>
            <li
              v-for="(item, index) in prodAddress"
              :key="index"
              :class="{ active: index === addressCurrent }"
              @click="handleAddress(item, index)"
            >
              {{ item.address }}
            </li>
          </ul>
        </div>
      </div>
      <StoreTabs @change="handleChange"></StoreTabs>
      <GoodsCard v-loading="loading" :model="goodsList"></GoodsCard>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import Logo from "@/components/logo.vue";
  import Search from "@/components/search.vue";
  import StoreTabs from "../store/components/store-tabs.vue";
  import GoodsCard from "../store/components/goods-card.vue";
  export default {
    name: "GoodsList",
    components: {
      Search,
      StoreTabs,
      GoodsCard,
      Logo,
    },
    data() {
      return {
        loading: true,
        currentPage: 1,
        topCateCurrent: 0,
        subCateCurrent: null,
        addressCurrent: null,
      };
    },
    computed: mapState({
      postData: (state) => state.goods.postData,
      goodsList: (state) => state.goods.goodsList,
      category: (state) => state.home.category,
      prodAddress: (state) => state.goods.prodAddress,
    }),
    async mounted() {
      this.category.length ? "" : this.$store.dispatch("home/homePageInit");
      await this.$store.dispatch("goods/findAllProdAddress");
      this.postData.type = this.$route.query.type;
      this.fetchData();
    },
    methods: {
      handleTopCateCurrent(item, e) {
        this.postData.cate_id = item.id;
        this.topCateCurrent = e;
        this.postData.sub_cate_id = "";
        this.subCateCurrent = "";
        this.postData.address_id = "";
        this.addressCurrent = "";
        this.fetchData();
      },
      handleSubCateCurrent(item, e) {
        this.postData.sub_cate_id = item.id;
        this.subCateCurrent = e;
        this.fetchData();
      },
      handleAddress(item, e) {
        this.postData.address_id = item.id;
        this.addressCurrent = e;
        this.fetchData();
      },
      handleChange(e) {
        this.$store.commit("goods/setPostData", { ...this.postData, ...e });
        this.fetchData();
      },
      async fetchData() {
        this.loading = true;
        await this.$store.dispatch("goods/queryProduct", this.postData);
        this.loading = false;
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .goods-list {
    .header {
      @include center-flex(y);
      @include justify();
      .search {
        padding: 36px 0 39px 54px;
      }
    }

    .el-breadcrumb {
      padding: 20px 0;
      font-size: $text-x-small;
    }

    .screen {
      &__row {
        color: $colorC;

        @include center-flex(y);

        border-bottom: 1px dashed #ccc;

        &:last-child {
          border-color: transparent;
        }

        span {
          min-width: 150px;
          padding: 17px 0;
          color: #808080;
          text-align: center;
        }

        ul {
          @include center-flex(y);

          li {
            margin-right: $gap;
            cursor: pointer;
            &.active {
              color: $green;
            }
          }
        }
      }
    }

    ::v-deep {
      .el-breadcrumb__item {
        ul {
          @include center-flex(y);
          li {
            margin-right: $gap;
            color: $colorC;
            cursor: pointer;
            &.active {
              color: $green;
            }
          }
        }
      }
      .goods-card {
        margin-bottom: 10px;

        .box {
          > .goods-item {
            &:nth-child(5n) {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
</style>
