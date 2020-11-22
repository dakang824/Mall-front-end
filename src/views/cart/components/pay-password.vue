<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 支付确认支付密码
 * @Date: 2020-11-22 11:04:59
 * @LastEditTime: 2020-11-22 11:10:05
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
            this.$emit("confirm", this.step2.pay_pwd);
          } else {
            return;
          }
          this.close();
        });
      },
    },
  };
</script>

<style lang="scss" scoped></style>
