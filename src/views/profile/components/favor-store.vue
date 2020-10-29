<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 商品收藏
 * @Date: 2020-10-29 16:20:52
 * @LastEditTime: 2020-10-29 18:45:45
-->
<template>
  <div class="favor-goods el-card">
    <el-tabs value="first">
      <el-tab-pane label="店铺收藏" name="first">
        <el-card v-for="(item, index) in list" :key="index" class="box-card">
          <div @click="handleGoDetail(item)">
            <el-image
              :src="item.logoPath | imgBaseUrl"
              fit="scale-down"
            ></el-image>
            <div class="box-card__content">
              <p>{{ item.name }}</p>
            </div>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { getMyCollectStore } from "@/api/profile";
  export default {
    name: "FavorStore",
    components: {},
    data() {
      return {
        list: [],
      };
    },
    async created() {
      const {
        data: { collectStores },
      } = await getMyCollectStore({});
      this.list = collectStores;
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
        text-align: center;
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
