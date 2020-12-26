<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 
 * @Date: 2020-11-04 22:43:54
 * @LastEditTime: 2020-12-26 11:55:45
-->
<template>
  <div class="qr-code">
    <el-dialog
      :title="'请打开' + (type == 1 ? '微信' : '支付宝') + '扫码支付'"
      :visible="value"
      width="340px"
      @close="handleClose"
    >
      <canvas id="canvas"></canvas>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { getOrderPayResult } from "@/api/profile";
  var QRCode = require("qrcode");
  export default {
    components: {},
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      type: {
        type: Number,
        default: 1,
      },
    },
    data() {
      return {
        time: "",
        success: false,
      };
    },
    computed: {
      ...mapState({
        payData: (state) => state.profile.payData,
      }),
    },
    methods: {
      handleClose() {
        if (!this.success) {
          this.$message({
            message: "支付失败",
            type: "error",
          });
          this.$emit("result", false);
        }
        this.$emit("input", false);
        clearInterval(this.time);
      },
      show(data) {
        const {
          pay_params: { qr_code },
          pay_no,
          pay_type,
        } = data;
        this.$nextTick(() => {
          var canvas = document.getElementById("canvas");
          QRCode.toCanvas(canvas, qr_code, { width: 300, margin: 2 }, function (
            error
          ) {
            if (error) console.error(error);
          });
          this.time = setInterval(() => {
            this.getResult({ pay_no, pay_type });
          }, 2000);
        });
      },
      async getResult(e) {
        const {
          data: { payResult },
        } = await getOrderPayResult(e);
        if (payResult === "SUCCESS") {
          this.success = true;
          this.$message({
            type: "success",
            message: "支付成功",
          });
          this.$emit("result", true);
          this.handleClose();
        }
      },
    },
  };
</script>

<style lang="scss" scoped></style>
