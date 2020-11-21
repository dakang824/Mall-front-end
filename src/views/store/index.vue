<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 
 * @Date: 2020-10-02 22:32:19
 * @LastEditTime: 2020-11-21 17:59:27
-->
<!-- 商铺 -->
<template>
  <div v-if="showPage" class="store">
    <storeHeader :model="store" />
    <div class="box w">
      <el-container>
        <el-aside width="278px">
          <storeAside
            :model="storeSubCate"
            :current-index="currentIndex"
            @click="handleItemClick"
          />
        </el-aside>
        <el-main>
          <storeTabs @change="handleChange" />
          <goodsCard v-loading="loading" :model="products.list">
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
        currentIndex: "",
        loading: false,
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
          sub_cate_id: "",
        },
      };
    },
    created() {
      if (this.$route.query.sub_cate_id) {
        this.postData.sub_cate_id = this.$route.query.sub_cate_id;
      }
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
        const { postData } = this;
        this.loading = true;

        const { products, store, storeSubCate } = await this.$store.dispatch(
          "store/getStoreDetail",
          this.$baseLodash.pickBy(postData, this.$baseLodash.identity)
        );
        this.storeSubCate = storeSubCate;
        this.products = products;
        this.store = store;
        this.$nextTick(() => {
          this.showPage = true;
          this.loading = false;
          this.currentIndex = storeSubCate.findIndex(
            (item) => item.id == this.$route.query.sub_cate_id
          );
        });
      },
      handleItemClick(id) {
        this.postData.sub_cate_id = id;
        this.getData();
      },
      handleChange(e) {
        const {
          orderBySellCount: orderbySellCount,
          onlineTime,
          orderByPrice: orderByprice,
          orderByViewCount: orderbyViewCount,
        } = e;

        this.postData = {
          ...this.postData,
          orderbySellCount,
          onlineTime,
          orderByprice,
          orderbyViewCount,
        };
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
