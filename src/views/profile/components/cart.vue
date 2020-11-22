<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 购物车
 * @Date: 2020-10-29 21:16:49
 * @LastEditTime: 2020-10-29 22:15:31
-->
<template>
  <div class="cart">
    <cart />
  </div>
</template>

<script>
  import Cart from "@/views/cart/cart.vue";
  export default {
    components: { Cart },
    data() {
      return {};
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .cart {
    ::v-deep {
      .el-col-14 {
        width: 68%;
      }

      .cart__container__main {
        min-height: 529px;
      }

      .cart__container__main {
        margin: 0;
      }

      .el-menu--horizontal > .el-menu-item {
        width: 150px !important;
        height: 46px !important;
        font-size: $text-x-small !important;
        line-height: 46px !important;
        text-align: center;
      }
    }
  }
</style>
