<!-- 商品 -->
<template>
  <div class="goods-card el-card">
    <div class="clearfix box">
      <div v-for="(item, index) in model" :key="index" class="fl goods-item">
        <GoodsItem :model="item"></GoodsItem>
      </div>
    </div>

    <el-pagination
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
  import GoodsItem from "@/components/goods-item.vue";
  export default {
    components: { GoodsItem },
    props: {
      currentPage: {
        type: Number,
        default: 1,
      },
      model: {
        type: Array,
        default: () => {
          return [
            {
              img: require("@/assets/imgs/goods3.png"),
              title: "麻婆豆腐川味麻婆豆腐",
              assess: "1678",
              collect: 2,
              money: 15.6,
              sell: 213,
            },
            {
              img: require("@/assets/imgs/goods4.png"),
              title: "麻婆豆腐川味麻婆豆腐",
              assess: "1678",
              collect: 2,
              money: 15.6,
              sell: 213,
            },
            {
              img: require("@/assets/imgs/goods5.png"),
              title: "麻婆豆腐川味麻婆豆腐",
              aassess: "1678",
              collect: 2,
              money: 15.6,
              sell: 213,
            },
            {
              img: require("@/assets/imgs/goods3.png"),
              title: "麻婆豆腐川味麻婆豆腐",
              assess: "1678",
              collect: 2,
              money: 15.6,
              sell: 213,
            },
            {
              img: require("@/assets/imgs/goods4.png"),
              title: "麻婆豆腐川味麻婆豆腐",
              assess: "1678",
              collect: 2,
              money: 15.6,
              sell: 213,
            },
            {
              img: require("@/assets/imgs/goods5.png"),
              title: "麻婆豆腐川味麻婆豆腐",
              assess: "1678",
              collect: 2,
              money: 15.6,
              sell: 213,
            },
            {
              img: require("@/assets/imgs/goods4.png"),
              title: "麻婆豆腐川味麻婆豆腐",
              assess: "1678",
              collect: 2,
              money: 15.6,
              sell: 213,
            },
            {
              img: require("@/assets/imgs/goods5.png"),
              title: "麻婆豆腐川味麻婆豆腐",
              assess: "1678",
              collect: 2,
              money: 15.6,
              sell: 213,
            },
            {
              img: require("@/assets/imgs/goods4.png"),
              title: "麻婆豆腐川味麻婆豆腐",
              assess: "1678",
              collect: 2,
              money: 15.6,
              sell: 213,
            },
            {
              img: require("@/assets/imgs/goods5.png"),
              title: "麻婆豆腐川味麻婆豆腐",
              assess: "1678",
              collect: 2,
              money: 15.6,
              sell: 213,
            },
          ];
        },
      },
    },
    data() {
      return {};
    },
    methods: {
      handleSizeChange() {
        console.log();
      },
      handleCurrentChange() {
        console.log();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .goods-card {
    .box {
      padding: 30px 30px 0 30px;
      > .goods-item {
        margin-right: 65px;
        margin-bottom: 50px;
      }
    }
    ::v-deep .el-pagination {
      text-align: center;
      padding-bottom: 50px;
    }
  }
</style>
