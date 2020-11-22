<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 确定订单
 * @Date: 2020-10-04 18:36:18
 * @LastEditTime: 2020-10-25 17:26:11
-->
<template>
  <div class="box footer">
    <div class="box__info">
      <p>
        实付款：
        <span>
          <i>¥</i>
          {{ postData.pay_amount }}
        </span>
      </p>
      <p>寄送至：{{ postData.address }}</p>
      <p>收货人：{{ postData.name }} {{ postData.mobile }}</p>
    </div>
    <el-image
      class="pay_image"
      :src="require('@/assets/imgs/pay-submit.png')"
      fit="contain"
      @click="handleSubmit"
    ></el-image>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    components: {},
    data() {
      return {};
    },
    computed: {
      ...mapState({
        postData: (state) => state.pay.postData,
      }),
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
    justify-content: space-between;

    .box {
      &__info {
        width: 420px;
        padding: 10px $gap;
        border: 1px solid $green;

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
            padding: 10px 0;
          }
        }
      }

      .pay_image {
        width: 200px;
        cursor: pointer;
      }
    }
  }
</style>
