<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 商品详情说明
 * @Date: 2020-10-05 23:12:09
 * @LastEditTime: 2020-10-05 23:31:23
-->

<template>
  <div class="goods-detail-info">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">规格参数</span>
        规格参数
      </el-tab-pane>
      <el-tab-pane label="商品详情">商品详情</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {};
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .goods-detail-info {
    ::v-deep {
      .el-tabs {
        &__content {
          padding: $padding;
        }

        .el-tabs__item {
          position: relative;
          width: 297px;
          height: 54px;
          padding: 0;
          font-size: $text-medium;
          line-height: 54px;
          color: $black;
          text-align: center;

          &:hover {
            color: $green;
          }

          &.is-active {
            color: $green;

            &::after {
              position: absolute;
              top: 0;
              left: 0;
              display: block;
              width: 100%;
              height: 4px;
              content: "";
              background: $green;
            }
          }
        }

        &--border-card {
          & > .el-tabs__header {
            background-color: #d4d4d4;
          }
        }
      }
    }
  }
</style>
