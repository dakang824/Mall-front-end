<template>
  <div class="header">
    <div class="header__box w">
      <div class="header__box__left">
        <span>嗨，{{ userInfo ? userInfo.name : "欢迎来嗨厨玩味" }}</span>
        <span v-if="userInfo" class="login-out" @click="handleLoginOut">
          退出
        </span>
        <div v-else class="login">
          <el-image
            :src="require('@/assets/imgs/header-avatar.png')"
            class="avatar"
          ></el-image>
          <i>
            <router-link to="/login"><el-link>请登录</el-link></router-link>
          </i>
        </div>
      </div>
      <div class="header__box__right">
        <ul>
          <li>
            <a @click="handleClick('/profile')">
              <el-image
                :src="require('@/assets/imgs/header-user.png')"
              ></el-image>
              <el-link>我的嗨厨</el-link>
            </a>
          </li>
          <li>
            <a @click="handleClick('/cart')">
              <el-image
                :src="require('@/assets/imgs/header-cart.png')"
              ></el-image>
              <el-link>购物车</el-link>
            </a>
          </li>
          <li @click="handleJumpStore">
            <el-link>商家登录</el-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { baseURL } from "@/config";
  export default {
    components: {},
    data() {
      return {};
    },
    computed: mapState({
      userInfo: (state) => JSON.parse(state.user.userInfo),
    }),
    created() {},
    methods: {
      handleClick(path) {
        this.$utils.verifyLogin({
          success: (e) => {
            this.$router.push({
              path,
            });
          },
        });
      },
      handleLoginOut() {
        this.$store.commit("user/resetUserInfo");
      },
      handleJumpStore() {
        window.open(
          `${
            process.env.NODE_ENV === "development"
              ? "http://localhost/"
              : baseURL
          }storeAdmin/index.html`
        );
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .header {
    padding: $gap;
    color: $colorA;
    .el-link {
      font-size: $text-x-small;
    }
    &__box {
      @include justify();
      @include center-flex(y);

      &__left {
        @include center-flex(y);
        @include justify();
        min-width: 335px;

        span {
          margin-right: 33px;
        }
        .login-out {
          cursor: pointer;
        }
        .login {
          @include center-flex(y);
        }
        .avatar {
          width: 54px;
          min-width: 54px;
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
              > a {
                padding: 0 28px;
              }

              &::after,
              &::before {
                width: 1px;
                height: 47px;
                content: "";
                background-color: #afafaf;
              }
            }
          }
        }
      }
    }
  }
</style>
