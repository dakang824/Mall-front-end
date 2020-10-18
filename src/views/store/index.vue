<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 
 * @Date: 2020-10-02 22:32:19
 * @LastEditTime: 2020-10-18 22:15:02
-->
<!-- 商铺 -->
<template>
  <div v-if="showPage" class="store">
    <storeHeader :model="store" />
    <div class="box w">
      <el-container>
        <el-aside width="278px">
          <storeAside :model="storeSubCate" />
        </el-aside>
        <el-main>
          <storeTabs @change="handleChange" />
          <goodsCard :model="products.list">
            <el-pagination
              :current-page="postData.pageNum"
              :page-size="postData.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="products.list.length"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            ></el-pagination>
          </goodsCard>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
  import StoreHeader from "./components/store-header.vue";
  import StoreTabs from "./components/store-tabs.vue";
  import StoreAside from "./components/store-aside.vue";
  import GoodsCard from "./components/goods-card.vue";

  export default {
    name: "Store",
    components: {
      StoreHeader,
      StoreTabs,
      StoreAside,
      GoodsCard,
    },
    data() {
      return {
        showPage: false,
        products: {
          list: [],
        },
        store: {},
        storeSubCate: {},
        postData: {
          storeId: this.$route.query.id,
          orderbySellCount: "",
          onlineTime: "",
          orderByprice: "",
          orderbyViewCount: "",
          pageNum: 1,
          pageSize: 10,
        },
      };
    },
    created() {
      this.getData();
    },
    methods: {
      handleSizeChange(e) {
        this.postData.pageNum = 1;
        this.postData.pageSize = e;
        this.getData();
      },
      handleCurrentChange(e) {
        this.postData.pageNum = e;
        this.getData();
      },
      async getData() {
        const { products, store, storeSubCate } = await this.$store.dispatch(
          "store/getStoreDetail",
          this.postData
        );
        this.storeSubCate = storeSubCate;
        this.products = products;
        this.store = store;
        this.$nextTick(() => {
          this.showPage = true;
        });
      },
      handleChange(e) {
        this.postData = { ...this.postData, ...e };
        this.getData();
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .store {
    .el-aside {
      margin: 10px 10px 0 0;
    }

    .el-main {
      padding: 0;

      ::v-deep .goods-card {
        margin-bottom: 10px;

        .box {
          > .goods-item {
            margin-right: 30px;
            margin-bottom: 30px;

            &:nth-child(4n) {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
</style>
