<!-- 登录 -->
<template>
  <div class="login-container">
    <div class="login-container__logo w">
      <Logo />
      <div class="right">
        <el-image :src="require('@/assets/imgs/login-info.png')"></el-image>
        “登录界面”改进建议
      </div>
    </div>
    <div class="login-container__main">
      <el-image
        :src="require('@/assets/imgs/login-bg.png')"
        fit="cover"
      ></el-image>
      <div class="w">
        <el-form
          ref="form"
          :rules="rules"
          :model="form"
          label-width="80px"
          class="el-form"
        >
          <div class="el-form__title">账号登录</div>
          <el-form-item prop="account" label-width="auto">
            <el-image
              :src="require('@/assets/imgs/login-user.png')"
              class="icon"
            ></el-image>
            <el-input
              v-model="form.account"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="pwd" label-width="auto">
            <el-image
              :src="require('@/assets/imgs/login-password.png')"
              class="icon"
            ></el-image>
            <el-input
              v-model="form.pwd"
              placeholder="请输入密码"
              type="password"
            ></el-input>
          </el-form-item>

          <el-form-item prop="code" label-width="auto">
            <el-input v-model="form.code" placeholder="请输入验证码">
              <div slot="append" class="el-form__code" @click="refreshCode">
                <div class="append">
                  <IdentifyCode
                    :identify-code="identifyCode"
                    :content-height="62"
                    @click="refreshCode"
                  ></IdentifyCode>
                  <span>看不清,换一张</span>
                </div>
              </div>
            </el-input>
          </el-form-item>

          <el-image
            :src="require('@/assets/imgs/login-btn.png')"
            class="el-form__submit"
            @click="submitForm('form')"
          ></el-image>

          <ul class="el-form__other">
            <li>忘记密码</li>
            <li>忘记用户名</li>
            <li>免费注册</li>
          </ul>
        </el-form>
      </div>
    </div>
    <div class="login-container__footer"><Footer :show="false" /></div>
  </div>
</template>

<script>
  import Footer from "@/components/footer.vue";
  import Logo from "@/components/logo.vue";
  import IdentifyCode from "@/components/identify-code.vue";
  export default {
    name: "Login",
    components: {
      Footer,
      Logo,
      IdentifyCode,
    },
    directives: {
      focus: {
        inserted(el) {
          el.querySelector("input").focus();
        },
      },
    },
    data() {
      var checkCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请输入验证码"));
        }
        setTimeout(() => {
          if (value !== this.identifyCode) {
            callback(new Error("请输入正确的验证码"));
          } else {
            callback();
          }
        }, 1000);
      };
      return {
        identifyCode: "",
        form: {
          account: "",
          pwd: "",
          code: "",
        },
        rules: {
          account: [
            { required: true, message: "请输入用户名", trigger: "blur" },
          ],
          pwd: [
            {
              required: true,
              trigger: "blur",
              message: "请输入密码",
            },
          ],
          code: [
            {
              validator: checkCode,
              trigger: "blur",
            },
          ],
        },
        loading: false,
        passwordType: "password",
        redirect: undefined,
      };
    },
    watch: {},
    created() {},
    mounted() {
      this.refreshCode();
    },
    methods: {
      async submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const res = await this.$store.dispatch(
              "user/getLoginInfo",
              this.form
            );
            res.code === 200 ? this.$router.replace("/") : "";
          } else {
            return false;
          }
        });
      },
      refreshCode() {
        this.identifyCode = "";
        this.makeCode();
      },
      makeCode() {
        for (let i = 0; i < 4; i++) {
          this.identifyCode += this.$utils.random(0, 9);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";
  .login-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: #fff;

    &__logo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 47px 0 36px;

      .right {
        .el-image {
          margin-right: 11px;
          vertical-align: middle;
        }

        display: flex;
        align-items: center;
        font-size: 18px;
      }
    }

    &__main {
      height: calc(100vh - 230px);
      .el-image {
        width: 100%;
        height: 100%;
      }

      .w {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: flex-end;
        height: 508px;
        margin: auto;
      }

      .el-form {
        right: 0;
        width: 550px;
        padding: 0 44px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 4px;

        .icon {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 1px;
          z-index: 1;
          width: 62px;
          min-width: 62px;
          height: 60px;
          padding: 0;
          margin: auto;
        }

        ::v-deep .el-form-item {
          &__content {
            height: 62px;
          }

          .el-input__inner {
            height: 62px;
            font-size: 18px;
            text-indent: 62px;
            border-radius: 0;
          }

          .el-input-group--append {
            .el-input__inner {
              text-indent: 0;
            }
          }
        }

        &__title {
          margin: 37px 0 33px;
          font-size: 24px;
          text-align: center;
        }

        &__code {
          #s-canvas,
          .s-canvas {
            height: 60px;
            overflow: hidden;
            vertical-align: bottom;
          }
        }

        &__submit {
          width: 100%;
          height: 62px;
          font-size: 16px;
        }

        ::v-deep .el-input-group__append {
          padding: 0 0 0 20px;
          cursor: pointer;
          background-color: transparent;
          border-color: transparent;

          .append {
            display: flex;
            align-items: center;
            padding: 0;
            color: #1e6a84;
            text-decoration: underline;
            background-color: #fff;
            border: 1px solid #dcdfe6;

            span {
              padding: 0 20px;
            }
          }
        }

        &__other {
          display: flex;
          justify-content: flex-end;
          margin-top: 25px;
          font-size: $text-x-small;

          li {
            padding-left: 26px;
            cursor: pointer;
          }
        }

        .el-form-item__content {
          margin-bottom: 20px;
        }
      }
    }

    &__footer {
      flex: 0.1;
    }
  }
</style>
