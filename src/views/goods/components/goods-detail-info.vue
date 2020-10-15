<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 商品详情说明
 * @Date: 2020-10-05 23:12:09
 * @LastEditTime: 2020-10-15 22:36:58
-->

<template>
  <div class="goods-detail-info">
    <el-tabs type="border-card">
      <el-tab-pane
        v-for="(item, index) in model"
        :key="index"
        :label="item.name"
      >
        <span v-if="index === 0" slot="label">{{ item.name }}</span>
        <el-image
          v-for="(it, ind) in item.imgs"
          :key="ind"
          :src="it"
          fit="contain"
          class="goods-detail-info__imgs"
        ></el-image>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      model: {
        type: Array,
        default: () => [],
      },
    },
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
          font-size: $text-x-small;
          line-height: 54px;
          color: $black;
          font-weight: bold;
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
    &__imgs {
      display: block;
      width: 100%;
    }
  }
</style>
