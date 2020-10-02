<!-- 首页楼层 -->
<template>
  <div class="floor w">
    <div class="floor__title">{{ model }}</div>
    <el-container>
      <el-aside width="231px">
        <!-- <el-image
          :src="require('@/assets/imgs/img1.jpeg')"
          fit="cover"
        ></el-image> -->
      </el-aside>
      <el-main>
        <div v-for="(item, index) in 6" :key="index" class="goods-item">
          <GoodsItem></GoodsItem>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import GoodsItem from "@/components/goods-item.vue";
  export default {
    components: {
      GoodsItem,
    },
    props: {
      model: {
        type: String,
        default: "",
      },
    },
    data() {
      return {};
    },
  };
</script>

<style lang="scss" scoped>
  .floor {
    margin: 40px auto;
    &__title {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 20px;
    }
    .el-aside {
      .el-image {
        height: 680px;
      }
    }
    .el-main {
      padding: 0;
      margin-left: 30px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .goods-item {
        &:nth-child(2) {
          margin-bottom: 35px;
        }
      }
    }
  }
</style>
