<!-- 商品列表 -->
<template>
  <div class="goods-list">
    <Search></Search>
    <div class="box w">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>蔬菜</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="screen el-card">
        <div v-for="(item, index) in list" :key="index" class="screen__row">
          <span>{{ item.title }}：</span>
          <ul>
            <li v-for="(it, ind) in item.value" :key="ind">{{ it }}</li>
          </ul>
        </div>
      </div>
      <StoreTabs></StoreTabs>
      <GoodsCard></GoodsCard>
    </div>
  </div>
</template>

<script>
  import Search from "../home/components/search.vue";
  import StoreTabs from "../store/components/store-tabs.vue";
  import GoodsCard from "../store/components/goods-card.vue";
  export default {
    name: "GoodsList",
    components: {
      Search,
      StoreTabs,
      GoodsCard,
    },
    data() {
      return {
        currentPage: 1,
        current: 0,

        list: [
          {
            title: "分类",
            value: [
              "叶菜类",
              "西红柿/茄果类",
              "花菜/球茎类",
              "土豆/根茎类",
              "菌菇类",
              "豆类/芽苗类",
              "葱姜蒜椒",
              "豆制品",
            ],
          },

          {
            title: "产地",
            value: ["中国大陆", "越南", "希腊", "泰国", "马来西亚", "不丹"],
          },
        ],
      };
    },
    created() {},
    methods: {},
  };
</script>
<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .goods-list {
    font-size: $text-medium;

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
            margin-right: 20px;
          }
        }
      }
    }

    ::v-deep .goods-card {
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
</style>
