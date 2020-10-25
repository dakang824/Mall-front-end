<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 支付方式
 * @Date: 2020-10-04 17:00:30
 * @LastEditTime: 2020-10-25 21:04:38
-->
<template>
  <div class="pay-type">
    <ul>
      <li
        v-for="(item, index) in payList"
        :key="index"
        :class="[{ active: item.value === postData.pay_type }]"
        @click="handleChange(index)"
      >
        <div v-if="index === 0">
          账户余额:¥{{ userInfo.balance | toFixed }}
          <p class="no-money">余额不足，请先充值</p>
        </div>
        <div v-else>
          <el-image
            style="width: 80px; height: 80px"
            :src="item.img"
            fit="contain"
          ></el-image>
          {{ item.title }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    components: {},
    data() {
      return {
        payList: [
          {
            title: "账户余额",
            value: 4,
          },
          {
            title: "微信支付",
            img: require("@/assets/imgs/wx.png"),
            value: 1,
          },
          {
            title: "支付宝支付",
            img: require("@/assets/imgs/alipay.png"),
            value: 2,
          },
        ],
      };
    },
    computed: {
      ...mapState({
        postData: (state) => state.pay.postData,
        userInfo: (state) => JSON.parse(state.user.userInfo),
      }),
    },
    methods: {
      handleChange(e) {
        this.postData.pay_type = this.payList[e].value;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .pay-type {
    ul {
      @include center-flex(y);

      font-size: $text-small;

      li {
        width: 282px;
        height: 136px;
        margin-right: $padding;
        text-align: center;
        cursor: pointer;
        border: 2px dashed $black;

        @include center-flex();

        .no-money {
          color: #f00;
        }

        &.active {
          color: $green;
          border-color: $green;
        }

        &:nth-child(2),
        &:nth-child(3) {
          > div {
            @include center-flex(y);

            .el-image {
              margin-right: 14px;
            }
          }
        }
      }
    }
  }
</style>
