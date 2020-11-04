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
      return {};
    },
    methods: {
      handleClose() {
        this.$emit("input", false);
      },
      show(qr_code) {
        this.$nextTick(() => {
          var canvas = document.getElementById("canvas");
          QRCode.toCanvas(canvas, qr_code, { width: 300, margin: 2 }, function (
            error
          ) {
            if (error) console.error(error);
          });
        });
      },
    },
  };
</script>

<style lang="scss" scoped></style>
