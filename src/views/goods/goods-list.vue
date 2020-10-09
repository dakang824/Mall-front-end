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
              v-for="(item, index) in topCategory"
              :key="index"
              :class="{ active: index === topCateCurrent }"
              @click="handleChangeCurrent(index)"
            >
              {{ item }}
            </li>
          </ul>
        </el-breadcrumb-item>
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
        topCategory: [
          "蔬菜",
          "肉蛋禽",
          "海鲜水产",
          "速冻食品",
          "粮油调味",
          "菜系",
          "设备",
        ],
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

    methods: {
      handleChangeCurrent(e) {
        this.topCateCurrent = e;
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
