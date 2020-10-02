<template>
  <div class="logo">
    <el-image
      fit="contain"
      class="logo__img"
      :src="require('@/assets/imgs/logo.png')"
      :style="getStyle"
    ></el-image>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      width: {
        type: String,
        default: "238",
      },
      height: {
        type: String,
        default: "39",
      },
    },
    data() {
      return {};
    },
    computed: {
      getStyle() {
        return { width: this.width + "px", height: this.height + "px" };
      },
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
