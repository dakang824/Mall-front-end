<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 
 * @Date: 2020-11-04 22:43:54
 * @LastEditTime: 2020-12-15 22:05:56
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
  import { fuiouPayNotify } from "@/api/profile";
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
      };
    },
    computed: {
      ...mapState({
        payData: (state) => state.profile.payData,
      }),
    },
    methods: {
      handleClose() {
        this.$emit("input", false);
        clearInterval(this.time);
      },
      show(qr_code) {
        this.$nextTick(() => {
          var canvas = document.getElementById("canvas");
          QRCode.toCanvas(canvas, qr_code, { width: 300, margin: 2 }, function (
            error
          ) {
            if (error) console.error(error);
          });
          this.time = setInterval(() => {
            this.getResult();
          }, 2000);
        });
      },
      async getResult() {
        await fuiouPayNotify({ ...this.payData });
      },
    },
  };
</script>

<style lang="scss" scoped></style>
