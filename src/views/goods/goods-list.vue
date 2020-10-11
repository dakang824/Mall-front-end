<!-- 商品列表 -->
<template>
  <div class="goods-list">
    <div class="el-card">
      <div class="header w">
        <logo></logo>
        <search></search>
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
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div class="screen__row">
          <span>产地：</span>
          <ul>
            <li v-for="(item, index) in prodAddress" :key="index">
              {{ item.address }}
            </li>
          </ul>
        </div>
      </div>
      <StoreTabs></StoreTabs>
      <GoodsCard :model="goodsList"></GoodsCard>
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
        currentPage: 1,
        topCateCurrent: 0,
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
      },
      fetchData() {
        this.$store.dispatch("goods/queryProduct", this.postData);
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .goods-list {
    font-size: $text-medium;

    .header {
      @include center-flex(y);

      .search {
        padding: 36px 0 39px 54px;
        margin-left: 93px;
      }
    }

    .el-breadcrumb {
      padding: 20px 0;
      font-size: $text-medium;
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
          padding: 10px 0;
          color: #808080;
          text-align: center;
        }

        ul {
          @include center-flex(y);

          li {
            margin-right: $gap;
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
