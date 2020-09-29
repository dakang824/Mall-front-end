<template>
  <div class="login-container">
    <div class="login-container__logo w"><Logo /></div>
    <div class="login-container__main">
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
            <el-input
              v-model="form.username"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" label-width="auto">
            <el-input
              v-model="form.password"
              placeholder="请输入密码"
              type="password"
            ></el-input>
          </el-form-item>

          <el-form-item prop="code" label-width="auto">
            <el-input v-model="form.code" placeholder="请输入验证码">
              <div slot="append" class="el-form__code" @click="refreshCode">
                <IdentifyCode
                  :identify-code="identifyCode"
                  :content-height="35"
                  @click="refreshCode"
                ></IdentifyCode>
              </div>
            </el-input>
          </el-form-item>

          <el-button
            type="danger"
            size="medium"
            class="el-form__submit"
            @click="submitForm('form')"
          >
            立即登录
          </el-button>
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
            alert("submit!");
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
    &__logo {
    }
    &__main {
      background: #ccffcc;
      flex: 1;
      .w {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        .el-form {
          border-radius: 4px;
          width: 410px;
          position: absolute;
          right: 0;
          background: #fff;
          padding: 20px;
          &__title {
            text-align: center;
            margin: 10px 0 20px;
            font-weight: bold;
            font-size: 18px;
          }
          &__code {
            #s-canvas,
            .s-canvas {
              vertical-align: bottom;
              height: 35px;
              overflow: hidden;
            }
          }
          &__submit {
            width: 100%;
            height: 50px;
            font-size: 16px;
            margin-top: 20px;
          }
          ::v-deep .el-input-group__append {
            padding: 0 8px;
          }
          .el-form-item__content {
            margin-bottom: 20px;
          }
        }
      }
    }
    &__footer {
      flex: 0.1;
    }
  }
</style>
