<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 商品item组件
 * @Date: 2020-10-02 22:32:19
 * @LastEditTime: 2020-11-19 11:59:49
-->
<!-- 商品item -->
<template>
  <div class="goods-item" @click="handleGoDetail">
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
      <el-image
        :src="model.pics.length ? model.pics[0].path : '' | imgBaseUrl"
        fit="scale-down"
      ></el-image>
      <div class="box">
        <span class="title">{{ model.name }}</span>
        <div class="middle">
          <span>收藏{{ model.collectCount }}</span>
        </div>
        <div class="footer">
          <div type="text" class="money">￥{{ model.specList | minPrice }}</div>
          <span>月销{{ model.sellCount }}笔</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    components: {},
    filters: {
      minPrice: (value) => {
        if (value.length) {
          return JSON.parse(JSON.stringify(value)).sort((a, b) => {
            return a.sellPrice - b.sellPrice;
          })[0].sellPrice;
        }
      },
    },
    props: {
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
        const { id, type } = this.model;
        this.$router.push({
          path: "/goods-detail",
          query: { type, id },
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .goods-item {
    .el-card {
      width: 190px;
      font-size: 12px;
      color: $color5;
      cursor: pointer;

      ::v-deep .el-image {
        width: 190px;
        height: 190px;
        vertical-align: middle;
        background: $imgbg;
        transition: all 0.2s ease-in;

        &__inner {
          &:hover {
            transform: scale(1.2);
          }
        }
      }

      .box {
        padding: 5px 10px;

        .title {
          font-size: $text-x-small;
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
          margin: 5px 0 0;

          @include justify();
          @include center-flex(y);
        }
      }
    }
  }
</style>
