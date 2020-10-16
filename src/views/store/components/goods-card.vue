<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 商品列表
 * @Date: 2020-10-02 22:32:19
 * @LastEditTime: 2020-10-16 23:23:07
-->
<!-- 商品 -->
<template>
  <div class="goods-card el-card">
    <div class="clearfix box">
      <div v-for="(item, index) in model" :key="index" class="fl goods-item">
        <GoodsItem :model="item"></GoodsItem>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
  import GoodsItem from "@/components/goods-item.vue";
  export default {
    name: "GoodsCard",
    components: { GoodsItem },
    props: {
      currentPage: {
        type: Number,
        default: 1,
      },
      model: {
        type: Array,
        default: () => {
          return [];
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
        margin-right: 47px;
        margin-bottom: 50px;
      }
    }

    ::v-deep .el-pagination {
      padding-bottom: 50px;
      text-align: center;
    }
  }
</style>
