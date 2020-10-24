<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 商品详情说明
 * @Date: 2020-10-05 23:12:09
 * @LastEditTime: 2020-10-24 14:49:28
-->

<template>
  <div class="goods-detail-info">
    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in model"
        :key="index"
        :label="item.name"
      >
        <span v-if="index === 0" slot="label">{{ item.name }}</span>
        <div :id="'info_imgs' + index">
          <el-image
            v-for="(it, ind) in item.imgs"
            :id="'img' + ind"
            :key="ind"
            :src="it.path | imgBaseUrl"
            fit="contain"
            class="goods-detail-info__imgs"
          ></el-image>
        </div>
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
    methods: {
      handleClick(e) {
        this.$nextTick(() => {
          setTimeout(() => {
            document
              .querySelector(`#info_imgs${e.index} #img${e.index}`)
              .scrollIntoView({ behavior: "smooth", block: "start" });
          }, 200);
        });
      },
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
