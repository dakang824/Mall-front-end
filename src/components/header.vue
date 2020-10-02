<template>
  <div class="header">
    <div class="header__box w">
      <div class="header__box__left">
        <span>嗨，欢迎来嗨厨玩味</span>
        <el-image
          :src="require('@/assets/imgs/header-avatar.png')"
          class="avatar"
        ></el-image>
        <i><router-link to="/login">请登录</router-link></i>
      </div>
      <div class="header__box__right">
        <ul>
          <li>
            <el-image
              :src="require('@/assets/imgs/header-user.png')"
            ></el-image>
            我的嗨厨
          </li>
          <li>
            <router-link to="/cart">
              <el-image
                :src="require('@/assets/imgs/header-cart.png')"
              ></el-image>
              购物车
            </router-link>
          </li>
          <li><router-link to="/login">商家登录</router-link></li>
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
    padding: $gap;
    font-size: $text-small;
    color: $colorA;
    &__box {
      @include justify();
      @include center-flex(y);
      &__left {
        @include center-flex(y);
        span {
          margin-right: 33px;
        }
        .avatar {
          min-width: 54px;
          width: 54px;
          height: 54px;
        }
        i {
          padding-left: 7px;
        }
      }
      &__right {
        ul {
          @include justify();
          li {
            margin-left: 30px;
            @include center-flex(y);
            .el-image {
              margin-right: 10px;
            }
            a {
              @include center-flex(y);
            }
            &:nth-child(2) {
              a {
                padding: 0 35px;
              }

              &::after,
              &::before {
                content: "";
                width: 2px;
                height: 47px;
                background-color: #afafaf;
              }
            }
          }
        }
      }
    }
  }
</style>
