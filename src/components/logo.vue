<template>
  <div class="logo">
    <el-image
      fit="contain"
      class="logo__img"
      :src="require('@/assets/imgs/logo.png')"
    ></el-image>
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
  .logo {
    width: 238px;
    &__img {
      vertical-align: middle;
    }
  }
</style>
