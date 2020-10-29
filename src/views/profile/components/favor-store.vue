<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 商品收藏
 * @Date: 2020-10-29 16:20:52
 * @LastEditTime: 2020-10-29 23:13:27
-->
<template>
  <div v-loading="listLoading" class="favor-goods el-card">
    <el-tabs value="first">
      <div class="favor-goods__box">
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
      </div>
      <el-pagination
        background
        :current-page="pageNum"
        :page-size="pageSize"
        :layout="layout"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
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
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        listLoading: true,
        pageNum: 1,
        pageSize: 10,
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.fetchData();
      },
      async fetchData() {
        this.listLoading = true;
        const {
          data: { collectStores },
        } = await getMyCollectStore({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        });
        this.list = collectStores.list;
        this.total = collectStores.total;
        setTimeout(() => {
          this.listLoading = false;
        }, 300);
      },
      handleGoDetail(e) {
        console.log(e);
        const { id, type } = e;
        this.$router.push({
          path: "/store",
          query: { id },
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";
  .favor-goods {
    &__box {
      @include center-flex(y);
      flex-wrap: wrap;
    }
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
    .el-pagination {
      text-align: center;
      padding: 20px;
    }
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
      }
    }
  }
</style>
