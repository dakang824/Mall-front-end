<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 
 * @Date: 2020-10-02 22:32:19
 * @LastEditTime: 2020-10-18 23:31:27
-->
<!--  -->
<template>
  <div class="cart-header el-card no-border-radius">
    <div class="w">
      <logo />
      <el-steps :active="active" align-center process-status="wait">
        <el-step title="我的购物车"></el-step>
        <el-step title="确认订单"></el-step>
        <el-step title="付款"></el-step>
        <el-step title="支付成功"></el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
  import Logo from "@/components/logo.vue";
  export default {
    components: {
      Logo,
    },
    props: {
      active: {
        type: Number,
        default: 1,
      },
    },
    data() {
      return {};
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .cart-header {
    .w {
      @include justify();
      @include center-flex(y);

      padding: 26px 0;

      .logo {
        width: auto;

        @include center-flex(y);

        &::after {
          display: block;
          width: 1px;
          height: 112px;
          margin: 0 25px 0 46px;
          content: "";
          background: #ebebeb;
        }
      }

      .el-steps {
        position: relative;
        right: -65px;
        width: 850px;

        ::v-deep {
          .el-step {
            &.is-horizontal .el-step__line {
              top: 0;
              bottom: 0;
              margin: auto;
            }

            .el-step__icon {
              width: 40px;
              height: 40px;
              font-size: $text-small;
            }
          }
          .el-step__title {
            font-size: $text-x-small;
          }
          .is-finish {
            .el-step__icon {
              color: #fff;
              background: $green;
            }

            &.el-step__title {
              font-weight: bold;
              color: $color3;
              font-size: $text-x-small;
            }

            &.el-step__head {
              border-color: $green;
            }
          }
        }
      }
    }
  }
</style>
