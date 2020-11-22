<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 支付确认支付密码
 * @Date: 2020-11-22 11:04:59
 * @LastEditTime: 2020-11-22 19:11:36
-->
<template>
  <div>
    <el-dialog :visible.sync="value" title="确认支付密码" @close="onClose">
      <el-form
        ref="formStep2"
        :model="step2"
        :rules="rules"
        size="medium"
        label-width="106px"
      >
        <el-form-item label="支付密码" prop="pay_pwd">
          <el-input
            v-model="step2.pay_pwd"
            placeholder="请输入您的支付密码"
            clearable
            :style="{ width: '100%' }"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    components: {},
    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        step2: {
          pay_pwd: null,
        },
        rules: {
          pay_pwd: [
            {
              required: true,
              message: "请输入您的支付密码",
              trigger: "blur",
            },
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
      onClose() {
        this.close();
        this.$refs["formStep2"].resetFields();
      },
      close() {
        this.$emit("input", false);
      },
      handelConfirm() {
        this.$refs["formStep2"].validate((valid) => {
          if (valid) {
            const pay_pwd = this.$utils.md5(this.step2.pay_pwd);
            if (pay_pwd === this.userInfo.payPwd) {
              this.$emit("confirm", pay_pwd);
              this.close();
            } else {
              this.$message({
                type: "error",
                message: "支付密码错误!",
              });
            }
          } else {
            return;
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped></style>
