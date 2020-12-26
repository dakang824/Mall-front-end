<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 充值页面
 * @Date: 2020-10-28 23:21:12
 * @LastEditTime: 2020-12-26 14:09:08
-->
<template>
  <div class="recharge el-card">
    <qrCode
      ref="qrCode"
      v-model="show"
      :type="params.pay_type"
      @result="handleSuccess"
    />
    <el-tabs value="first">
      <el-tab-pane label="在线充值" name="first">
        <el-form ref="ruleForm" :model="params" :rules="rules">
          <div class="recharge__box">
            <p>
              <i>当前余额:</i>
              <span>{{ userInfo.balance }}元</span>
            </p>
            <p>
              <i>预付金额:</i>
              <el-form-item prop="amount">
                <el-input
                  v-model="params.amount"
                  placeholder="请输入预付金额"
                ></el-input>
              </el-form-item>
              元
            </p>
            <payType v-model="params.pay_type" :hidden="[4]" />

            <el-button type="primary" @click="handleComfirm">
              确认支付
            </el-button>
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { unifityRechargeOrder } from "@/api/profile";
  import PayType from "@/views/cart/components/pay-type.vue";
  import qrCode from "./qr-code.vue";
  import filters from "@/filters";
  export default {
    name: "Recharge",
    components: { PayType, qrCode },
    data() {
      return {
        show: false,
        params: {
          pay_type: 1,
          amount: "",
        },
        rules: {
          amount: [
            { required: true, message: "请输入预付金额", trigger: "blur" },
          ],
        },
      };
    },
    computed: {
      ...mapState({
        userInfo: (state) => JSON.parse(state.user.userInfo),
      }),
    },
    methods: {
      handleSuccess(e) {
        e ? this.$store.dispatch("profileWelcome/getMyInfo", {}) : "";
      },
      handleComfirm() {
        this.$refs["ruleForm"].validate(async (valid) => {
          if (valid) {
            this.params.sign = await this.$store.dispatch(
              "pay/generateSignature",
              {
                userId: this.userInfo.id,
                amount: filters.getDecimal(this.params.amount),
                pay_type: this.params.pay_type,
              }
            );
            const { data } = await unifityRechargeOrder(this.params);
            if ("qr_code" in data.pay_params && data.pay_params.qr_code) {
              this.show = true;
              data.pay_type = this.params.pay_type;
              this.$refs.qrCode.show(data);
            }
          } else {
            return false;
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .recharge {
    min-height: 529px;

    &__box {
      width: 50%;
      margin: 0 auto;
      text-align: center;

      .el-form-item {
        position: relative;
        top: 10px;
      }

      p {
        @include center-flex(y);

        justify-content: center;
        margin: 30px 0;
        text-align: center;

        span {
          font-size: $text-small;
          font-weight: bold;
          color: $green;
        }

        i {
          min-width: 100px;
        }

        .el-input {
          width: 258px;
          margin-right: 20px;
        }
      }

      .el-button {
        width: 209px;
        height: 50px;
        margin: 32px 0;
        font-size: 16px;
      }
    }
  }

  ::v-deep {
    .el-tabs {
      &__item {
        height: 46px;
        padding-right: 45px !important;
        padding-left: 45px !important;
        font-size: $text-x-small;
        line-height: 46px;
      }

      &__active-bar {
        width: 100% !important;
        transform: translateX(0) !important;
      }
    }

    .pay-type {
      @include center-flex(y);

      justify-content: center;
      padding: 10px 0;

      li {
        &:last-child {
          a {
            margin-right: 0;
          }
        }
      }

      a {
        width: 204px !important;
        height: 105px !important;
        font-size: $text-x-small;
      }

      .el-image__inner,
      .el-image {
        width: 64px !important;
        height: 64px !important;
        margin-right: 8px !important;
      }
    }
  }
</style>
