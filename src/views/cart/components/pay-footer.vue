<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 确定订单
 * @Date: 2020-10-04 18:36:18
 * @LastEditTime: 2020-10-04 19:10:38
-->
<template>
  <div class="footer">
    <div class="box">
      <div class="box__info">
        <p>
          实付款：
          <span>
            <i>¥</i>
            90.00
          </span>
        </p>
        <p>寄送至：上海 上海 市徐汇区龙华西路 585号15A1</p>
        <p>收货人：张力 18917923688</p>
      </div>
      <el-image
        :src="require('@/assets/imgs/pay-submit.png')"
        @click="handleSubmit"
      ></el-image>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {};
    },
    methods: {
      handleSubmit() {
        this.$emit("click");
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";
  .footer {
    display: flex;
    justify-content: flex-end;
    .box {
      &__info {
        text-align: right;
        width: 420px;
        height: 227px;
        border: 1px solid $green;
        padding: 35px $gap;
        p {
          span {
            i {
              font-size: $text-medium;
            }
            font-size: 30px;
            font-weight: bold;
            color: $green;
          }
          &:nth-child(2) {
            padding: $gap 0;
          }
        }
      }
      text-align: right;
    }
  }
</style>
