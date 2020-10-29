<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 商品收藏
 * @Date: 2020-10-29 16:20:52
 * @LastEditTime: 2020-10-29 18:37:57
-->
<template>
  <div class="favor-goods el-card">
    <el-tabs value="first">
      <el-tab-pane label="商品收藏" name="first">
        <el-card v-for="(item, index) in list" :key="index" class="box-card">
          <div @click="handleGoDetail(item)">
            <el-image
              :src="item.pics[0].path | imgBaseUrl"
              fit="scale-down"
            ></el-image>
            <div class="box-card__content">
              <p>{{ item.name }}</p>
              <span>
                <i>¥</i>
                15.60
              </span>
            </div>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { getMyCollectProd } from "@/api/profile";
  export default {
    components: {},
    data() {
      return {
        list: [],
      };
    },
    async created() {
      const {
        data: { collectProds },
      } = await getMyCollectProd({});
      this.list = collectProds;
    },
    methods: {
      handleGoDetail(e) {
        const { id, type } = e;
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
  .favor-goods {
    min-height: 529px;
    .box-card {
      width: 172px;
      .el-image {
        background: $imgbg;
      }

      &__content {
        padding: $padding;
        span {
          color: $green;
          font-size: 18px;
          font-weight: bold;
          i {
            font-size: 14px;
          }
        }
      }
    }
  }
  .el-image {
    width: 172px;
    height: 172px;
  }
  ::v-deep {
    .el-card {
      margin: 0 18px 18px 0;
      cursor: pointer;
      &__body {
        padding: 0;
      }

      &:nth-child(5n) {
        margin-right: 0;
      }
    }
    .el-tabs {
      &__item {
        width: 150px !important;
        height: 46px;
        line-height: 46px;
        text-align: center;
        font-size: $text-x-small;
      }
      .el-tab-pane {
        padding: 0 $padding;
        @include center-flex(y);
        flex-wrap: wrap;
      }
    }
  }
</style>
