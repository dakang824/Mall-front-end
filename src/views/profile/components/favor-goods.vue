<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 商品收藏
 * @Date: 2020-10-29 16:20:52
 * @LastEditTime: 2020-10-31 15:40:45
-->
<template>
  <div class="favor-goods el-card">
    <el-tabs value="first">
      <el-tab-pane label="商品收藏" name="first">
        <div v-loading="listLoading" class="favor-goods__box">
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
        </div>
        <el-pagination
          v-if="list.length"
          background
          :current-page="pageNum"
          :page-size="pageSize"
          :layout="layout"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>

        <empty
          icon="favor"
          text="暂无商品收藏"
          margin-top="90"
          :show="!list.length && !listLoading"
        ></empty>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { getMyCollectProd } from "@/api/profile";
  import Empty from "@/components/empty.vue";
  export default {
    components: { Empty },
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
    async created() {
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
          data: { collectProds },
        } = await getMyCollectProd({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        });
        this.list = collectProds.list;
        this.total = collectProds.total;
        setTimeout(() => {
          this.listLoading = false;
        }, 300);
      },
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
    &__box {
      @include center-flex(y);
      flex-wrap: wrap;
    }
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
