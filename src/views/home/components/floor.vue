<!-- 首页楼层 -->
<template>
  <div class="floor w el-card">
    <div class="floor__title">
      <div class="floor__title__left">
        {{ model }}
        <span>每日菜谱推荐</span>
      </div>
      <div class="floor__title__right">
        <router-link to="/goods-list">
          更多
          <i class="el-icon-d-arrow-right"></i>
        </router-link>
      </div>
    </div>

    <el-container>
      <el-aside width="468px">
        <el-image
          :src="require('@/assets/imgs/goods1.png')"
          fit="cover"
        ></el-image>
        <el-image
          :src="require('@/assets/imgs/goods2.png')"
          fit="cover"
        ></el-image>
      </el-aside>
      <el-main class="clearfix">
        <div v-for="(item, index) in list" :key="index" class="goods-item fl">
          <GoodsItem :model="item"></GoodsItem>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import GoodsItem from "@/components/goods-item.vue";
  export default {
    components: {
      GoodsItem,
    },
    props: {
      model: {
        type: String,
        default: "",
      },
    },
    data() {
      return {
        list: [
          {
            img: require("@/assets/imgs/goods3.png"),
            title: "麻婆豆腐川味麻婆豆腐",
            assess: "1678",
            collect: 2,
            money: 15.6,
            sell: 213,
          },
          {
            img: require("@/assets/imgs/goods4.png"),
            title: "麻婆豆腐川味麻婆豆腐",
            assess: "1678",
            collect: 2,
            money: 15.6,
            sell: 213,
          },
          {
            img: require("@/assets/imgs/goods5.png"),
            title: "麻婆豆腐川味麻婆豆腐",
            aassess: "1678",
            collect: 2,
            money: 15.6,
            sell: 213,
          },
          {
            img: require("@/assets/imgs/goods3.png"),
            title: "麻婆豆腐川味麻婆豆腐",
            assess: "1678",
            collect: 2,
            money: 15.6,
            sell: 213,
          },
          {
            img: require("@/assets/imgs/goods4.png"),
            title: "麻婆豆腐川味麻婆豆腐",
            assess: "1678",
            collect: 2,
            money: 15.6,
            sell: 213,
          },
          {
            img: require("@/assets/imgs/goods5.png"),
            title: "麻婆豆腐川味麻婆豆腐",
            assess: "1678",
            collect: 2,
            money: 15.6,
            sell: 213,
          },
          {
            img: require("@/assets/imgs/goods4.png"),
            title: "麻婆豆腐川味麻婆豆腐",
            assess: "1678",
            collect: 2,
            money: 15.6,
            sell: 213,
          },
          {
            img: require("@/assets/imgs/goods5.png"),
            title: "麻婆豆腐川味麻婆豆腐",
            assess: "1678",
            collect: 2,
            money: 15.6,
            sell: 213,
          },
        ],
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .floor {
    padding: 28px 36px;
    margin: 10px auto;

    &__title {
      padding-bottom: 16px;
      color: $color5;

      @include justify();
      @include center-flex(y);

      &__left {
        @include center-flex(y);

        font-size: $text-large;
        font-weight: bold;
        color: $green;

        span {
          margin: 10px 6px 0;
          font-size: 14px;
          font-weight: initial;
        }

        &::before {
          display: block;
          width: 3px;
          height: 29px;
          margin-right: 14px;
          content: "";
          background: $green;
        }
      }

      &__right {
        font-size: $text-large;

        i {
          font-size: $text-small;
        }
      }
    }

    .el-aside {
      .el-image {
        vertical-align: middle;

        &:first-child {
          margin-bottom: 10px;
        }
      }
    }

    .el-main {
      padding: 0;

      > .goods-item {
        margin-left: 9px;

        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4) {
          margin-bottom: 9px;
        }
      }
    }
  }
</style>
