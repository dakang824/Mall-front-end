<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 确认订单
 * @Date: 2020-10-02 22:32:19
 * @LastEditTime: 2020-10-04 18:21:55
-->
<template>
  <div class="pay">
    <CartHeader></CartHeader>

    <div class="w">
      <div v-for="(item, index) in cards" :key="index" class="el-card">
        <el-menu
          default-active="1"
          class="el-menu-demo"
          mode="horizontal"
          active-text-color="#04B85D"
        >
          <el-menu-item index="1">{{ item.title }}</el-menu-item>
        </el-menu>
        <div class="el-card__inner">
          <component :is="item.name"></component>
        </div>
      </div>

      <div class="el-card footer">
        <div class="box el-card__inner">
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
          <el-image :src="require('@/assets/imgs/pay-submit.png')"></el-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CartHeader from "./components/cart-header.vue";
  import Address from "./components/address.vue";
  import PayGoodsItem from "./components/pay-goods-item.vue";
  import PayType from "./components/pay-type.vue";
  export default {
    components: {
      CartHeader,
      Address,
      PayGoodsItem,
      PayType,
    },
    data() {
      return {
        cards: [
          {
            name: "Address",
            title: "选择收货地址",
          },
          {
            name: "PayGoodsItem",
            title: "确认订单信息",
          },
          {
            name: "PayType",
            title: "选择支付方式",
          },
        ],
      };
    },
    created() {},
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .pay {
    font-size: $text-medium;
    .el-menu {
      ::v-deep .el-menu-item.is-active {
        font-weight: bold;
        font-size: $text-medium;
      }
    }
    .el-card {
      margin-top: $gap-small;
      &__inner {
        padding: $padding;
      }
    }
    .footer {
      display: flex;
      justify-content: flex-end;
      margin-bottom: $padding;
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
        padding-bottom: 0;
      }
    }
  }
</style>
