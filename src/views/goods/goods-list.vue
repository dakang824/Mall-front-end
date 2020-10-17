<!-- 商品列表 -->
<template>
  <div class="goods-list">
    <div class="el-card">
      <div class="header w">
        <logo />
        <search v-model="postData.condition" @search="fetchData"></search>
      </div>
    </div>
    <div class="box w">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <ul>
            <li
              v-for="(item, index) in categoryList"
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
              v-for="(item, index) in getSubCategoryList"
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
      <storeTabs @change="handleChange"></storeTabs>
      <goodsCard v-loading="loading" :model="goodsList">
        <el-pagination
          :current-page="postData.pageNum"
          :page-size="postData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="goodsList.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </goodsCard>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import logo from "@/components/logo.vue";
  import search from "@/components/search.vue";
  import storeTabs from "../store/components/store-tabs.vue";
  import goodsCard from "../store/components/goods-card.vue";
  export default {
    name: "GoodsList",
    components: {
      search,
      storeTabs,
      goodsCard,
      logo,
    },
    data() {
      return {
        loading: true,
        currentPage: 1,
        topCateCurrent: null,
        subCateCurrent: null,
        addressCurrent: null,
      };
    },
    computed: {
      ...mapState({
        postData: (state) => state.goods.postData,
        goodsList: (state) => state.goods.goodsList,
        categoryList: (state) => state.goods.categoryList,
        prodAddress: (state) => state.goods.prodAddress,
      }),
      getSubCategoryList() {
        const data = this.categoryList[
          this.topCateCurrent === null ? 0 : this.topCateCurrent
        ];
        return data ? data.subCategoryList : "";
      },
    },
    async mounted() {
      const { type: prodType, condition = "" } = this.$route.query;
      this.reset();
      await this.$store.dispatch("goods/findCategroyByProdType", {
        prodType,
      });
      await this.$store.dispatch("goods/findAddressByProdType", {
        prodType,
      });
      this.handleChange({ condition, ...this.$route.query });
    },
    methods: {
      handleCurrentChange(e) {
        this.reset({ pageNum: e });
        this.fetchData();
      },
      handleSizeChange(e) {
        this.reset({ pageSize: e, pageNum: 1 });
        this.fetchData();
      },
      reset(params = {}) {
        this.$store.commit("goods/setPostData", {
          ...this.postData,
          ...{
            cate_id: "",
            sub_cate_id: "",
            address_id: "",
            condition: "",
            orderBySellCount: "",
            orderByPrice: "",
            orderByViewCount: "",
            pageNum: 1,
            pageSize: 10,
          },
          ...params,
        });
      },
      handleTopCateCurrent(item, index) {
        this.postData.cate_id = item.id;
        this.topCateCurrent = index;
        this.postData.sub_cate_id = "";
        this.subCateCurrent = "";
        this.postData.address_id = "";
        this.addressCurrent = "";
        this.fetchData();
      },
      handleSubCateCurrent(item, index) {
        this.postData.sub_cate_id = item.id;
        this.subCateCurrent = index;
        this.fetchData();
      },
      handleAddress(item, index) {
        this.postData.address_id = item.id;
        this.addressCurrent = index;
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
