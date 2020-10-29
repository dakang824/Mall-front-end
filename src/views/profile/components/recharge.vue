<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 充值页面
 * @Date: 2020-10-28 23:21:12
 * @LastEditTime: 2020-10-29 09:55:57
-->
<template>
  <div class="recharge el-card">
    <el-dialog
      :title="
        '请打开' + (params.pay_type == 1 ? '微信' : '支付宝') + '扫码支付'
      "
      :visible.sync="show"
      width="340px"
    >
      <canvas id="canvas"></canvas>
    </el-dialog>
    <el-tabs value="first">
      <el-tab-pane label="在线充值" name="first">
        <el-form ref="ruleForm" :model="params" :rules="rules">
          <div class="recharge__box">
            <p>
              <i>当前余额:</i>
              <span>0.00元</span>
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
  var QRCode = require("qrcode");
  import { unifityRechargeOrder } from "@/api/profile";
  import PayType from "@/views/cart/components/pay-type.vue";
  export default {
    name: "Recharge",
    components: { PayType },
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
    methods: {
      handleComfirm() {
        this.$refs["ruleForm"].validate(async (valid) => {
          if (valid) {
            const {
              data: { pay_params },
            } = await unifityRechargeOrder(this.params);
            if (pay_params.result_msg == "SUCCESS") {
              this.show = true;
              this.$nextTick(() => {
                var canvas = document.getElementById("canvas");
                QRCode.toCanvas(
                  canvas,
                  pay_params.qr_code,
                  { width: 300, margin: 2 },
                  function (error) {
                    if (error) console.error(error);
                  }
                );
              });
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
      text-align: center;
      margin: 0 auto;
      width: 50%;
      .el-form-item {
        position: relative;
        top: 10px;
      }
      p {
        @include center-flex(y);
        justify-content: center;
        text-align: center;
        margin: 30px 0;
        span {
          color: $green;
          font-weight: bold;
          font-size: $text-small;
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
        margin: 32px 0;
        height: 50px;
        font-size: 16px;
      }
    }
  }
  ::v-deep {
    .el-tabs {
      &__item {
        padding-right: 45px !important;
        padding-left: 45px !important;
        height: 46px;
        line-height: 46px;
        font-size: $text-x-small;
      }
      &__active-bar {
        width: 100% !important;
        transform: translateX(0) !important;
      }
    }
    .pay-type {
      @include center-flex(y);
      padding: 10px 0;
      justify-content: center;
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
