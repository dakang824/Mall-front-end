<!-- 商品item -->
<template>
  <div class="goods-item">
    <el-card :body-style="{ padding: '0px' }">
      <el-image
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      ></el-image>
      <div class="footer">
        <span class="title">好吃的汉堡</span>
        <div type="text" class="money">￥1.50</div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {};
    },
  };
</script>

<style lang="scss" scoped>
  .goods-item {
    .el-card {
      width: 250px;
      .el-image {
        width: 100%;
      }
      .footer {
        padding: 10px;
        text-align: center;
        .title {
          font-weight: 700;
        }
        .money {
          color: #ff0000;
          font-size: 15px;
          font-weight: bold;
        }
      }
    }
  }
</style>
