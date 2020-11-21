<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 订单详情
 * @Date: 2020-10-31 15:51:17
 * @LastEditTime: 2020-11-21 16:24:07
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
        <el-step title="绑定验证手机号"></el-step>
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
            <el-form-item label="新手机号码:" prop="mobile">
              <el-input
                v-model="step2.mobile"
                placeholder="请输入新手机号码"
                :maxlength="11"
                show-word-limit
                clearable
                prefix-icon="el-icon-mobile"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
            <el-form-item label="手机验证码:" prop="code">
              <el-input
                v-model="step2.code"
                placeholder="请输入手机验证码"
                :maxlength="11"
                clearable
                :style="{ width: '100%' }"
              >
                <template slot="append">
                  <VerificationCode
                    ref="uCodeStep2"
                    :seconds="seconds"
                    @change="codeChangeStep2"
                  ></VerificationCode>
                  <div class="code" @click="getCodeStep2">{{ tipsStep2 }}</div>
                </template>
              </el-input>
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
            新手机号修改成功！
          </p>
          <p>恭喜您手机号修改成功！</p>
          <el-button
            type="primary"
            style="width: 194px; margin-top: 70px"
            @click="handleClose"
          >
            关闭
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { sendSMS, checkMobileCodeValid, bindMobil } from "@/api/profile";
  import VerificationCode from "@/components/u-verification-code.vue";
  export default {
    components: { VerificationCode },
    props: {
      model: {
        type: Array,
        default: () => [],
      },
      value: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        tips: "",
        tipsStep2: "",
        seconds: 60,
        active: 1,
        userInfo: "",
        step1: {
          code: "",
          sign: "",
        },
        step2: {
          mobile: "",
          code: "",
          sign: "",
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
          mobile: [
            {
              required: true,
              message: "请输入新手机号码",
              trigger: "blur",
            },
            {
              pattern: /^1(3|4|5|7|8|9)\d{9}$/,
              message: "手机号格式错误",
              trigger: "blur",
            },
          ],
        },
      };
    },
    created() {
      this.userInfo = JSON.parse(this.$store.state.user.userInfo);
    },
    methods: {
      codeChange(text) {
        this.tips = text;
      },
      codeChangeStep2(text) {
        this.tipsStep2 = text;
      },
      async getCodeStep2() {
        if (this.$refs.uCodeStep2.canGetCode) {
          const {
            data: { sign },
          } = await sendSMS({ mobile: this.userInfo.mobile });
          this.step2.sign = sign;
          this.$refs.uCodeStep2.start();
        }
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
      handleClose() {
        this.step1 = {
          code: "",
          sign: "",
        };
        this.step2 = {
          mobile: "",
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
            if (this.step2.sign === "") {
              this.showToast("请先发送验证码", "warning");
              return;
            }
            await bindMobil({
              ...this.step2,
            });
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
            margin-left: 20px;
            width: 85px;
            display: block;
          }
        }
        .code {
          cursor: pointer;
          width: 100%;
          height: 100%;
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
