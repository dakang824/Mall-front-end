<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 支付状态页
 * @Date: 2020-09-28 21:12:51
 * @LastEditTime: 2020-11-22 11:39:43
-->
<!--  -->
<template>
  <div class="pay-reuslt" :class="'pay-reuslt--' + state">
    <div class="el-card">
      <div class="pay-reuslt__title">
        <el-image :src="getImg"></el-image>
        您已成功付款
      </div>
      <div class="pay-reuslt__result">
        <div v-if="state === 'error'">
          <p>
            如果您已付款，可能因为交易量激增导致交易单延迟处理（最长数秒至数分钟）
          </p>
          <p>
            您可稍后
            <span>刷新页面</span>
            或前往
            <span>我的订单</span>
            查看支付情况
          </p>
        </div>
        <div v-if="state === 'success'">
          <ul>
            <li>
              收货地址: {{ params.address }} {{ params.name }}
              {{ params.mobile }}
            </li>
            <li>
              实付款：¥
              <span style="padding-left: 8px;">
                {{ params.pay_amount | toFixed }}
              </span>
            </li>
          </ul>
          <p>
            您可以：
            <el-link v-if="false" @click="handleJump">
              <span>查看买到的宝贝</span>
            </el-link>
            <el-link @click="handleJump"><span>查看交易记录</span></el-link>
          </p>
        </div>
      </div>
    </div>
    <div v-if="state === 'error'" class="el-card error">
      <p>以下交易单尚未支付成功，请尽快完成支付！</p>
      <ul>
        <li>
          交易单号：
          <span>39628432832743749087</span>
        </li>
        <li>
          应付金额：
          <span>¥90.00</span>
        </li>
      </ul>
      <div class="box">
        <PayType></PayType>
        <el-image :src="require('@/assets/imgs/error-pay.png')"></el-image>
      </div>
    </div>
  </div>
</template>

<script>
  import PayType from "./components/pay-type.vue";
  export default {
    name: "PayResult",
    components: { PayType },
    data() {
      return {
        state: "error", //两种状态 error success
        params: {},
      };
    },
    computed: {
      getImg() {
        return require("@/assets/imgs/" +
          (this.state === "error" ? "pay-error.png" : "pay-success.png"));
      },
    },
    mounted() {
      this.state = this.$route.query.state;
      this.params = JSON.parse(this.$route.query.params);
      this.$store.commit("cart/setCartState", this.state === "success" ? 4 : 3);

      var i = 0;
      window.addEventListener(
        "popstate",
        (e) => {
          if (i === 0) {
            this.$router.back(1);
            i++;
            window.removeEventListener("popstate", () => {}, false);
          }
        },
        false
      );
    },
    methods: {
      handleJump() {
        this.$router.push({
          path: "/profile",
          query: { page: "Orders" },
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .pay-reuslt {
    &__title {
      font-size: $text-small;
      font-weight: bold;
      color: #fff;

      @include center-flex(y);

      .el-image {
        margin: $gap 28px;
      }
    }

    &--error {
      .pay-reuslt {
        &__title {
          background: $error;
        }

        &__result {
          padding: 28px 128px;

          p {
            margin-bottom: 20px;

            &:last-child {
              margin-bottom: 0;
            }

            span {
              color: $green;
              text-decoration: underline;
            }
          }
        }
      }
    }

    &--success {
      .pay-reuslt {
        &__title {
          background: $green;
        }

        &__result {
          padding: 38px 128px;

          ul {
            li {
              @include center-flex(y);

              &::before {
                display: block;
                width: 6px;
                height: 6px;
                margin-right: 10px;
                content: "";
                background: $black;
                border-radius: 50px;
              }

              margin-bottom: 20px;

              &:last-child {
                margin-bottom: 0;
              }

              span {
                color: $green;
              }
            }
          }

          p {
            margin: 50px 0 0 15px;

            a {
              margin-left: 40px;
              color: $green;
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
      }
    }

    .error {
      p {
        padding: 28px 30px;
      }

      ul {
        @include center-flex(y);

        padding-bottom: $padding;
        padding-left: 75px;
        border-bottom: solid 1px #e6e6e6;

        li {
          margin-right: 122px;

          span {
            color: $error;
          }
        }
      }

      .box {
        padding: $padding;
        text-align: right;

        .el-image {
          width: 200px;
          margin: 53px 0 51px;
          cursor: pointer;
        }
      }
    }

    .el-card {
      margin: $padding 0 0;

      &:last-child {
        margin-bottom: $padding;
      }
    }
  }
</style>
