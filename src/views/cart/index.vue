<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 统一使用公共头部
 * @Date: 2020-10-03 23:25:04
 * @LastEditTime: 2020-10-04 19:07:56
-->
<template>
  <div class="index">
    <CartHeader></CartHeader>
    <router-view class="w"></router-view>
  </div>
</template>

<script>
  import CartHeader from "./components/cart-header.vue";
  export default {
    components: {
      CartHeader,
    },
    data() {
      return {};
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {},
  };
</script>

<style lang="scss" scoped></style>
