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
          <el-form-item prop="username" label-width="auto">
            <el-image
              :src="require('@/assets/imgs/login-user.png')"
              class="icon"
            ></el-image>
            <el-input
              v-model="form.username"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" label-width="auto">
            <el-image
              :src="require('@/assets/imgs/login-password.png')"
              class="icon"
            ></el-image>
            <el-input
              v-model="form.password"
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
    <div class="login-container__footer"><Footer hidden /></div>
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
      return {
        identifyCode: "",
        form: {
          username: "",
          password: "",
          code: "",
        },
        rules: {
          username: [
            { required: true, message: "请输入用户名", trigger: "blur" },
          ],
          password: [
            {
              required: true,
              trigger: "blur",
              message: "请输入密码",
            },
          ],
          code: [
            {
              required: true,
              trigger: "blur",
              message: "请输入验证码",
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push("/");
          } else {
            console.log("error submit!!");
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
        }
        display: flex;
        align-items: center;
        font-size: 18px;
      }
    }
    &__main {
      flex: 1;
      .el-image {
        width: 100%;
        height: 100%;
      }
      .w {
        position: absolute;
        height: 571px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        display: flex;
        justify-content: flex-end;
      }
      .el-form {
        border-radius: 4px;
        width: 620px;
        right: 0;
        background: rgba(255, 255, 255, 0.7);
        padding: 0 77px;
        .icon {
          min-width: 62px;
          width: 62px;
          height: 60px;
          margin: auto;
          left: 1px;
          top: 0;
          bottom: 0;
          padding: 0;
          z-index: 1;
          position: absolute;
        }
        ::v-deep .el-form-item {
          &__content {
            height: 62px;
          }
          .el-input__inner {
            height: 62px;
            text-indent: 62px;
            font-size: 18px;
            border-radius: 0;
          }
          .el-input-group--append {
            .el-input__inner {
              text-indent: 0;
            }
          }
        }

        &__title {
          text-align: center;
          margin: 42px 0 33px;
          font-size: 24px;
        }
        &__code {
          #s-canvas,
          .s-canvas {
            vertical-align: bottom;
            height: 60px;
            overflow: hidden;
          }
        }
        &__submit {
          width: 100%;
          height: 62px;
          font-size: 16px;
          margin-top: 20px;
        }
        ::v-deep .el-input-group__append {
          cursor: pointer;
          padding: 0 0 0 20px;
          border-color: transparent;
          background-color: transparent;
          .append {
            border: 1px solid #dcdfe6;
            display: flex;
            align-items: center;
            background-color: #fff;
            color: #1e6a84;
            text-decoration: underline;
            padding: 0;
            span {
              padding: 0 20px;
            }
          }
        }
        &__other {
          display: flex;
          justify-content: flex-end;
          margin-top: 41px;
          font-size: 18px;
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
