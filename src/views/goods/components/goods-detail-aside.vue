<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 商品详情侧边栏
 * @Date: 2020-10-05 23:21:38
 * @LastEditTime: 2020-10-15 22:22:18
-->

<template>
  <div class="goods-detail-aside">
    <StoreAside></StoreAside>
    <StoreAside title="店内排行">
      <el-tabs type="border-card" stretch>
        <el-tab-pane
          v-for="(item, index) in rankingList"
          :key="index"
          :label="item.title"
        >
          <div v-for="(it, ind) in item.child" :key="ind" class="goods-item">
            <el-image :src="it.img"></el-image>
            <div class="right">
              <p>{{ it.title }}</p>
              <span>￥{{ it.money }}</span>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </StoreAside>
  </div>
</template>

<script>
  import StoreAside from "../../store/components/store-aside.vue";
  export default {
    components: { StoreAside },
    data() {
      return {
        rankingList: [
          {
            title: "销售量",
            child: [
              {
                img: require("@/assets/imgs/goods2.png"),
                title: "四川正宗家用烧菜烧豆腐",
                money: "24.50",
              },
              {
                img: require("@/assets/imgs/goods3.png"),
                title: "四川正宗家用烧菜烧豆腐",
                money: "24.50",
              },
              {
                img: require("@/assets/imgs/goods3.png"),
                title: "四川正宗家用烧菜烧豆腐",
                money: "24.50",
              },
              {
                img: require("@/assets/imgs/goods3.png"),
                title: "四川正宗家用烧菜烧豆腐",
                money: "24.50",
              },
              {
                img: require("@/assets/imgs/goods3.png"),
                title: "四川正宗家用烧菜烧豆腐",
                money: "24.50",
              },
            ],
          },
          {
            title: "收藏数",
            child: [
              {
                img: require("@/assets/imgs/goods3.png"),
                title: "四川正宗家用烧菜烧豆腐",
                money: "24.50",
              },
              {
                img: require("@/assets/imgs/goods3.png"),
                title: "四川正宗家用烧菜烧豆腐",
                money: "24.50",
              },
              {
                img: require("@/assets/imgs/goods3.png"),
                title: "四川正宗家用烧菜烧豆腐",
                money: "24.50",
              },
              {
                img: require("@/assets/imgs/goods3.png"),
                title: "四川正宗家用烧菜烧豆腐",
                money: "24.50",
              },
              {
                img: require("@/assets/imgs/goods3.png"),
                title: "四川正宗家用烧菜烧豆腐",
                money: "24.50",
              },
              {
                img: require("@/assets/imgs/goods3.png"),
                title: "四川正宗家用烧菜烧豆腐",
                money: "24.50",
              },
            ],
          },
        ],
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .goods-detail-aside {
    ::v-deep {
      .el-tabs {
        .el-tabs__item {
          height: 54px;
          padding: 0;
          padding-right: 0 !important;
          padding-left: 0 !important;
          font-size: $text-x-small;
          line-height: 54px;
          color: $black;

          &:hover {
            color: $green;
          }
        }

        &--border-card {
          & > .el-tabs__header {
            background-color: #d4d4d4;
          }
        }
      }
    }

    .store-aside {
      margin-right: $padding;
      margin-bottom: $padding;

      .goods-item {
        @include center-flex(y);

        margin-bottom: $padding;
        font-size: $text-small;

        &:last-child {
          margin-bottom: 0;
        }

        .el-image {
          width: 80px;
          min-width: 80px;
          height: 80px;
          margin-right: $padding;
        }

        span {
          font-weight: bold;
          color: $error;
        }
      }
    }
  }
</style>
