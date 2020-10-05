<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 
 * @Date: 2020-10-02 22:32:19
 * @LastEditTime: 2020-10-05 20:59:51
-->
<!-- 商铺 -->
<template>
  <div class="store">
    <StoreHeader></StoreHeader>
    <div class="box w">
      <el-container>
        <el-aside width="278px">
          <StoreAside></StoreAside>
        </el-aside>
        <el-main>
          <StoreTabs></StoreTabs>
          <GoodsCard></GoodsCard>
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
      return {};
    },
    created() {},
    methods: {},
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
            margin-right: 77px;

            &:nth-child(4n) {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
</style>
