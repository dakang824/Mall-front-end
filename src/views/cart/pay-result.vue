<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 支付状态页
 * @Date: 2020-09-28 21:12:51
 * @LastEditTime: 2020-12-26 13:47:30
-->
<!--  -->
<template>
  <div class="pay-reuslt" :class="'pay-reuslt--' + state">
    <div class="el-card">
      <div class="pay-reuslt__title">
        <el-image :src="getImg"></el-image>
        {{ state === "error" ? "尚未支付成功" : "您已成功付款" }}
      </div>
      <div class="pay-reuslt__result">
        <div v-if="state === 'error'">
          <p>
            如果您已付款，可能因为交易量激增导致交易单延迟处理（最长数秒至数分钟）
          </p>
          <p>
            您可稍后
            <a href="javascript:void(0)">
              <span @click="handleReload">刷新页面</span>
            </a>
            或前往
            <a href="javascript:void(0)">
              <span @click="handleJump">我的订单</span>
            </a>
            查看支付情况
          </p>
        </div>
        <div v-if="state === 'success'">
          <ul>
            <li>
              收货地址: {{ params.postData.address }} {{ params.postData.name }}
              {{ params.postData.mobile }}
            </li>
            <li>
              实付款：¥
              <span style="padding-left: 8px">
                {{ params.postData.pay_amount | toFixed }}
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
          <span>{{ params.payData.pay_no }}</span>
        </li>
        <li>
          应付金额：
          <span>¥{{ params.postData.total_amount }}</span>
        </li>
      </ul>
      <div class="box">
        <PayType v-model="params.postData.pay_type"></PayType>
        <el-image
          :src="require('@/assets/imgs/error-pay.png')"
          @click="handleChecking"
        ></el-image>
      </div>
    </div>
    <PayPassword v-model="show" @confirm="handleConfirm" />
    <qrCode
      ref="qrCode"
      v-model="showPayDialog"
      :type="params.postData.pay_type"
      @result="handleSuccess"
    />
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { rePayOrder2 } from "@/api/profile";
  import PayType from "./components/pay-type.vue";
  import PayPassword from "./components/pay-password.vue";
  import QrCode from "^/profile/components/qr-code.vue";
  import filters from "@/filters";
  export default {
    name: "PayResult",
    components: { PayType, PayPassword, QrCode },
    data() {
      return {
        state: "error", //两种状态 error success
        params: {},
        show: false,
        showPayDialog: false,
      };
    },
    computed: {
      ...mapState({
        userInfo: (state) => JSON.parse(state.user.userInfo),
      }),
      getImg() {
        return require("@/assets/imgs/" +
          (this.state === "error" ? "pay-error.png" : "pay-success.png"));
      },
    },

    mounted() {
      this.state = this.$route.query.state;
      this.params = JSON.parse(this.$route.query.params);
      this.$store.commit("cart/setCartState", this.state === "success" ? 4 : 3);
      // var i = 0;
      // window.addEventListener(
      //   "popstate",
      //   (e) => {
      //     if (i === 0) {
      //       this.$router.back(1);
      //       i++;
      //       window.removeEventListener("popstate", () => {}, false);
      //     }
      //   },
      //   false
      // );
    },
    methods: {
      handleReload() {
        location.reload();
      },
      handleConfirm(e) {
        this.params.postData.pay_pwd = e;
        this.handleClick();
      },
      handleJump() {
        this.$router.replace({
          path: "/profile",
          query: { page: "Orders" },
        });
      },
      handleSuccess() {
        if (e) {
          this.state = "success";
        }
      },
      handleChecking() {
        const { accLevel, payPwd } = this.userInfo;
        // 显示支付密码
        if (
          accLevel == 2 &&
          payPwd != null &&
          this.params.postData.pay_type === 4
        ) {
          this.show = true;
        } else {
          this.handleClick();
        }
      },
      async handleClick() {
        const { pay_no } = this.params.payData;

        const {
          pay_type,
          discount,
          total_amount,
          pay_amount,
          pay_pwd,
        } = this.params.postData;

        const sign = await this.$store.dispatch("pay/generateSignature", {
          userId: this.userInfo.id,
          total_amount: filters.getDecimal(total_amount),
          pay_amount: filters.getDecimal(pay_amount),
          pay_type,
        });

        const { data } = await rePayOrder2({
          pay_no,
          discount,
          total_amount,
          pay_amount,
          pay_type,
          pay_pwd,
          sign,
        });
        if (data.pay_params && data.pay_params.qr_code) {
          this.showPayDialog = true;
          data.pay_type = pay_type;
          this.$refs.qrCode.show(data);
          return;
        } else {
          this.state = "success";
        }
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
