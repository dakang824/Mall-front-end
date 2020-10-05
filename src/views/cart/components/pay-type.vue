<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 支付方式
 * @Date: 2020-10-04 17:00:30
 * @LastEditTime: 2020-10-04 17:39:50
-->
<template>
  <div class="pay-type">
    <ul>
      <li
        v-for="(item, index) in payList"
        :key="index"
        :class="[{ active: index === current }]"
        @click="handleChange(index)"
      >
        <div v-if="index === 0">
          账户余额:¥12.30
          <p class="no-money">余额不足，请先充值</p>
        </div>
        <div v-else>
          <el-image
            style="width: 80px; height: 80px;"
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
  export default {
    components: {},
    data() {
      return {
        current: 0,
        payList: [
          {
            title: "账户余额",
          },
          {
            title: "微信支付",
            img: require("@/assets/imgs/wx.png"),
          },
          {
            title: "支付宝支付",
            img: require("@/assets/imgs/alipay.png"),
          },
        ],
      };
    },
    methods: {
      handleChange(e) {
        this.current = e;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .pay-type {
    ul {
      @include center-flex(y);

      font-size: $text-medium;

      li {
        width: 282px;
        height: 148px;
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
