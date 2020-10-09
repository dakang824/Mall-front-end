<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 
 * @Date: 2020-10-02 22:32:19
 * @LastEditTime: 2020-10-09 22:57:10
-->
<!-- 商品item -->
<template>
  <div class="goods-item" @click="handleGoDetail">
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
      <el-image :src="model.img"></el-image>
      <div class="box">
        <span class="title">{{ model.title }}</span>
        <div class="middle">
          <span>收藏{{ model.collect }}</span>
        </div>
        <div class="footer">
          <div type="text" class="money">￥{{ model.money }}</div>
          <span>月销{{ model.sell }}笔</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      //type 1普通商品,2菜谱
      type: {
        type: Number,
        default: 1,
      },
      model: {
        type: Object,
        default: () => {
          return {};
        },
      },
    },
    data() {
      return {};
    },
    methods: {
      handleGoDetail() {
        this.$router.push({
          name: "GoodsDetail",
          query: { type: this.type },
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .goods-item {
    .el-card {
      width: 258px;
      font-size: 12px;
      color: $color5;
      cursor: pointer;

      .el-image {
        width: 258px;
        vertical-align: middle;
      }

      .box {
        padding: 10px;

        .title {
          font-size: $text-small;
        }

        .middle {
          span {
            margin-right: 10px;
          }
        }

        .money {
          font-size: $text-small;
          font-weight: bold;
          color: $green;
        }

        .footer {
          margin: 20px 0 0;

          @include justify();
          @include center-flex(y);
        }
      }
    }
  }
</style>
