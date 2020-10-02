<!-- 确认订单 -->
<template>
  <div class="pay w">
    <CartHeader></CartHeader>
    <Address></Address>
  </div>
</template>

<script>
  import CartHeader from "./components/cart-header.vue";
  import Address from "./components/address.vue";
  export default {
    components: {
      CartHeader,
      Address,
    },
    data() {
      return {};
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .pay {
  }
</style>
