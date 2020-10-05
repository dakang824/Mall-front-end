<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 确认订单
 * @Date: 2020-10-02 22:32:19
 * @LastEditTime: 2020-10-04 20:34:57
-->
<template>
  <div class="pay">
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
      <div class="el-card__inner">
        <PayFooter @click="handlePay"></PayFooter>
      </div>
    </div>
  </div>
</template>

<script>
  import PayAddress from "./components/pay-address.vue";
  import PayGoodsItem from "./components/pay-goods-item.vue";
  import PayType from "./components/pay-type.vue";
  import PayFooter from "./components/pay-footer.vue";
  export default {
    components: {
      PayAddress,
      PayGoodsItem,
      PayType,
      PayFooter,
    },
    data() {
      return {
        cards: [
          {
            name: "PayAddress",
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
    methods: {
      handlePay() {
        this.$router.push({
          path: "/cart/pay-result",
          query: { state: "error" },
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .pay {
    font-size: $text-medium;

    .el-menu {
      ::v-deep .el-menu-item.is-active {
        font-size: $text-medium;
        font-weight: bold;
      }
    }

    .el-card {
      margin-top: $gap-small;

      &__inner {
        padding: $padding;
      }

      &.footer {
        margin-bottom: $padding;

        .el-card__inner {
          padding-bottom: 0;
        }
      }
    }
  }
</style>
