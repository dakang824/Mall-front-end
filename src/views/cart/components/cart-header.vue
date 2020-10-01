<!--  -->
<template>
  <div class="cart-header">
    <Logo />
    <el-steps :active="2" align-center process-status="wait">
      <el-step title="我的购物车"></el-step>
      <el-step title="确认订单"></el-step>
      <el-step title="付款"></el-step>
      <el-step title="支付成功"></el-step>
    </el-steps>
  </div>
</template>

<script>
  import Logo from "@/components/logo.vue";
  export default {
    components: {
      Logo,
    },
    data() {
      return {};
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";
  .cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-steps {
      width: 800px;
      ::v-deep .is-finish {
        .el-step__icon {
          background: $error;
          color: #fff;
        }
        &.el-step__title {
          color: $color3;
          font-weight: bold;
        }
        &.el-step__head {
          border-color: $error;
        }
      }
    }
  }
</style>
