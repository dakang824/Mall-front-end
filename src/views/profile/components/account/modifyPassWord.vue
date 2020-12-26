<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 订单详情
 * @Date: 2020-10-31 15:51:17
 * @LastEditTime: 2020-12-26 15:12:24
-->
<template>
  <div class="modifyPassWord">
    <el-dialog
      title="修改密码"
      :visible="value"
      width="960px"
      @close="handleClose"
    >
      <el-steps :active="active" finish-status="success" simple>
        <el-step title="验证身份"></el-step>
        <el-step :title="'设置' + getTxt + '密码'"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <div class="box">
        <div v-if="active === 1" class="step1">
          <p>
            <i>已验证手机:</i>
            {{ userInfo.mobile }}
          </p>
          <el-form
            ref="elForm"
            :model="step1"
            :rules="rules"
            size="medium"
            label-width="106px"
          >
            <el-form-item label="手机验证码:" prop="code">
              <el-input
                v-model="step1.code"
                placeholder="请输入动态验证码"
                :maxlength="11"
                clearable
              >
                <template slot="append">
                  <VerificationCode
                    ref="uCode"
                    :seconds="seconds"
                    @change="codeChange"
                  ></VerificationCode>
                  <div class="code" @click="getCode">{{ tips }}</div>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item size="large">
              <el-button
                type="primary"
                style="width: 194px; margin-top: 70px"
                @click="submitForm"
              >
                下一步
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="active === 2">
          <el-form
            ref="formStep2"
            :model="step2"
            :rules="rules"
            size="medium"
            label-width="106px"
          >
            <el-form-item
              v-if="type === 1"
              :label="getTxt + '密码:'"
              prop="pwd"
            >
              <el-input
                v-model="step2.pwd"
                :placeholder="'请输入' + getTxt + '密码'"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>

            <el-form-item
              v-if="type === 2"
              :label="getTxt + '密码:'"
              prop="payPwd"
            >
              <el-input
                v-model="step2.payPwd"
                :placeholder="'请输入' + getTxt + '密码'"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
            <el-form-item size="large">
              <el-button
                type="primary"
                el-button
                style="width: 194px; margin-top: 70px"
                @click="submitFormStep2"
              >
                下一步
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="active === 3" class="step3">
          <p class="result">
            <i class="el-icon-success"></i>
            新{{ getTxt }}密码设置成功！
          </p>
          <p>请您牢记新{{ getTxt }}密码！</p>
          <el-button
            type="primary"
            style="width: 194px; margin-top: 70px"
            @click="handleOver"
          >
            关闭
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { sendSMS, checkMobileCodeValid, modifyPwd } from "@/api/profile";
  import VerificationCode from "@/components/u-verification-code.vue";
  export default {
    components: { VerificationCode },
    props: {
      model: {
        type: Object,
        default: () => {},
      },
      type: {
        type: Number,
        default: 1,
      },
      value: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        tips: "",
        seconds: 60,
        active: 1,
        userInfo: {},
        step1: {
          code: "",
          sign: "",
        },
        step2: {
          mobile: "",
          code: "",
          sign: "",
          payPwd: "",
          pwd: "",
        },
        rules: {
          code: [
            {
              required: true,
              message: "请输入手机验证码",
              trigger: "blur",
            },
            {
              pattern: /^\d{4}$/,
              message: "验证码格式错误",
              trigger: "blur",
            },
          ],
          pwd: [
            {
              required: true,
              message: "请输入登录密码",
              trigger: "blur",
            },
          ],
          payPwd: [
            {
              required: true,
              message: "请输入支付密码",
              trigger: "blur",
            },
          ],
        },
      };
    },
    computed: {
      getTxt() {
        return this.type === 2 ? "支付" : "登录";
      },
    },
    created() {
      if (this.model && this.model.account) {
        this.userInfo.mobile = this.model.account;
      } else {
        this.userInfo = JSON.parse(this.$store.state.user.userInfo);
      }
    },
    methods: {
      codeChange(text) {
        this.tips = text;
      },
      async getCode() {
        if (this.$refs.uCode.canGetCode) {
          const {
            data: { sign },
          } = await sendSMS({ mobile: this.userInfo.mobile });
          this.step1.sign = sign;
          this.$refs.uCode.start();
        }
      },
      showToast(message, type = "success") {
        this.$message({
          message,
          type,
        });
      },
      handleOver() {
        this.$store.commit("user/resetUserInfo");
        this.handleClose();
        location.reload();
      },
      handleClose() {
        this.step1 = {
          code: "",
          sign: "",
        };
        this.step2 = {
          code: "",
          sign: "",
          payPwd: "",
          pwd: "",
        };
        this.active = 1;
        this.$emit("input", false);
      },
      submitForm() {
        this.$refs["elForm"].validate(async (valid) => {
          if (valid) {
            if (this.step1.sign === "") {
              this.showToast("请先发送验证码", "warning");
              return;
            }
            await checkMobileCodeValid({
              ...this.step1,
              mobile: this.userInfo.mobile,
            });
            this.active = 2;
          } else {
            return;
          }
        });
      },
      submitFormStep2() {
        this.$refs["formStep2"].validate(async (valid) => {
          if (valid) {
            const data = {
              ...this.step2,
              ...this.step1,
              mobile: this.userInfo.mobile,
            };
            if (this.type === 2) {
              data.payPwd = this.$utils.md5(data.payPwd);
              delete data.pwd;
            } else if (this.type === 1) {
              data.pwd = this.$utils.md5(data.pwd);
              delete data.payPwd;
            }

            await modifyPwd(data);
            this.active = 3;
            await this.$store.dispatch("profileWelcome/getMyInfo", {});
          } else {
            return;
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .modifyPassWord {
    .box {
      width: 50%;
      margin: 90px auto 65px;

      .step1 {
        p {
          margin-bottom: 20px;

          @include center-flex(y);

          i {
            display: block;
            width: 85px;
            margin-left: 20px;
          }
        }

        .code {
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
      }
    }

    .step3 {
      text-align: center;

      .result {
        @include center-flex(y);

        justify-content: center;
        font-size: 20px;

        i {
          margin-right: 20px;
        }

        color: $green;

        .el-icon-success {
          font-size: 60px;
        }
      }

      p {
        margin-top: 20px;
      }
    }
  }
</style>
