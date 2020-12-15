<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 统一使用公共头部
 * @Date: 2020-10-03 23:25:04
 * @LastEditTime: 2020-12-15 22:17:21
-->
<template>
  <div class="index">
    <cartHeader :active="cartState" />
    <router-view class="w main"></router-view>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import CartHeader from "./components/cart-header.vue";
  export default {
    components: {
      CartHeader,
    },
    data() {
      return {};
    },
    computed: {
      ...mapState({
        cartState: (state) => state.cart.cartState,
      }),
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {},
  };
</script>

<style lang="scss" scoped>
  .main {
    min-height: calc(100vh - 377px);
  }
</style>
