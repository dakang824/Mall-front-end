<!--
 * @Author: yukang 1172248038@qq.com
 * @Date: 2020-10-02 22:32:19
 * @LastEditTime: 2020-10-10 21:59:55
-->
<template>
  <div class="logo">
    <router-link to="/">
      <el-image
        fit="contain"
        class="logo__img"
        :src="require('@/assets/imgs/logo.png')"
        :style="getStyle"
      ></el-image>
    </router-link>
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
