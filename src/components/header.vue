<template>
  <div class="header">
    <div class="header__box w">
      <div class="header__box__left">
        <span>嗨，欢迎来嗨厨玩味</span>
        <i><router-link to="/login">请登录</router-link></i>
      </div>
      <div class="header__box__right">
        <ul>
          <li>我的嗨厨</li>
          <li><router-link to="/login">购物车</router-link></li>
          <li>商家登录</li>
        </ul>
      </div>
    </div>
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
  @import "@/assets/scss/settings";
  .header {
    border-bottom: 1px solid $colorBorder;
    padding: $gap;
    &__box {
      @include justify();
      @include center-flex(y);
      &__left {
        i {
          padding-left: 30px;
        }
      }
      &__right {
        ul {
          @include justify();
          li {
            margin-left: 30px;
          }
        }
      }
    }
  }
</style>
