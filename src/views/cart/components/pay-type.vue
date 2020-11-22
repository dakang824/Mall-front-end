<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 支付方式
 * @Date: 2020-10-04 17:00:30
 * @LastEditTime: 2020-10-29 00:32:07
-->
<template>
  <div class="pay-type">
    <ul>
      <li
        v-for="(item, index) in getPayList"
        :key="index"
        @click="handleChange(index)"
      >
        <a
          v-if="!item.hidden"
          href="javascript:void(0)"
          :class="[{ active: item.value === value }]"
        >
          <div v-if="index === 0">
            账户余额:¥{{ userInfo.balance | toFixed }}
            <p v-if="userInfo.balance < postData.pay_amount" class="no-money">
              余额不足，请先充值
            </p>
          </div>
          <div v-else>
            <el-image
              style="width: 80px; height: 80px"
              :src="item.img"
              fit="contain"
            ></el-image>
            {{ item.title }}
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    components: {},
    props: {
      hidden: {
        type: Array,
        default: () => [],
      },
      value: {
        type: Number,
        default: 4,
      },
    },

    data() {
      return {
        payList: [
          {
            title: "账户余额",
            value: 4,
            hidden: false,
          },
          {
            title: "微信支付",
            img: require("@/assets/imgs/wx.png"),
            value: 1,
            hidden: false,
          },
          {
            title: "支付宝支付",
            img: require("@/assets/imgs/alipay.png"),
            value: 2,
            hidden: false,
          },
        ],
      };
    },
    computed: {
      ...mapState({
        postData: (state) => state.pay.postData,
        userInfo: (state) => JSON.parse(state.user.userInfo),
      }),
      getPayList() {
        const pay = this.hidden.length
          ? this.hidden
              .map((item) => {
                return this.payList.filter((it) => {
                  if (it.value === item) {
                    it.hidden = true;
                  }
                  return it;
                });
              })
              .flat()
          : this.payList;
        return pay;
      },
    },
    methods: {
      handleChange(e) {
        this.$emit("input", this.payList[e].value);
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
        a {
          width: 282px;
          height: 136px;
          margin-right: $padding;
          text-align: center;
          cursor: pointer;
          border: 2px dashed $black;

          @include center-flex();

          &.active {
            color: $green;
            border-color: $green;
          }

          .no-money {
            color: #f00;
          }
        }

        &:nth-child(2),
        &:nth-child(3) {
          a > div {
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
