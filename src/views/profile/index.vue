<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 个人中心
 * @Date: 2020-10-19 22:34:06
 * @LastEditTime: 2020-11-19 19:28:09
-->
<template>
  <div class="profile">
    <div class="el-card no-border-radius header">
      <div class="w">
        <logo></logo>
      </div>
    </div>
    <div class="w profile__box">
      <el-container>
        <el-aside width="234px" class="el-card profile__left">
          <div
            v-for="(item, index) in list"
            :key="index"
            :class="['title', { active: index === current }]"
            @click="handleClick(index)"
          >
            {{ item.name }}
            <i class="el-icon-arrow-right"></i>
          </div>
        </el-aside>
        <el-main>
          <el-collapse-transition>
            <component :is="list[current].components"></component>
          </el-collapse-transition>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
  import Logo from "@/components/logo.vue";
  import Profile from "./components/profile.vue";
  import Welcome from "./components/welcome.vue";
  import Account from "./components/account";
  import Address from "./components/address";
  import Recharge from "./components/recharge.vue";
  import Orders from "./components/orders.vue";
  import Refund from "./components/refund.vue";
  import FavorGoods from "./components/favor-goods.vue";
  import FavorStore from "./components/favor-store.vue";
  import Financial from "./components/financial.vue";
  import Remittance from "./components/remittance.vue";
  import Cart from "./components/cart.vue";

  export default {
    components: {
      Logo,
      Welcome,
      Profile,
      Account,
      Address,
      Recharge,
      Orders,
      Refund,
      FavorGoods,
      FavorStore,
      Financial,
      Remittance,
      Cart,
    },
    provide() {
      return {
        setCurrent: this.handleChange,
      };
    },
    data() {
      return {
        current: "",
        list: [
          { name: "欢迎页", components: "Welcome" },
          { name: "个人资料", components: "Profile" },
          { name: "账户安全", components: "Account" },
          { name: "收货地址", components: "Address" },
          { name: "我的购物车", components: "Cart" },
          { name: "我的订单", components: "Orders" },
          { name: "退款退货", components: "Refund" },
          { name: "财务明细", components: "Financial" },
          { name: "在线充值", components: "Recharge" },
          { name: "汇款确认", components: "Remittance" },
          { name: "商品收藏", components: "FavorGoods" },
          { name: "店铺收藏", components: "FavorStore" },
        ],
      };
    },
    created() {
      this.handleChange(this.$route.query.page || "Welcome");
    },
    methods: {
      handleClick(e) {
        this.current = e;
      },
      handleChange(e) {
        this.current = this.list.findIndex((item) => item.components === e);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .profile {
    .header {
      padding: 35px 0;
      margin-bottom: $padding;
    }

    &__left {
      margin-right: 10px;
      background: transparent;
      border-color: transparent;

      .title {
        padding: 10.46px;
        text-align: center;
        cursor: pointer;
        background: #fff;
        border-bottom: 1px dashed $colorBorder;

        @include justify();
        @include center-flex(y);

        &::before {
          content: "";
        }

        &:hover,
        &.active {
          color: $green;
          background: $colorBg;
          border-top: 1px dashed $green;
          border-bottom: 1px dashed $green;
        }
      }
    }

    &__box {
      min-height: calc(100vh - 590px);
    }

    ::v-deep {
      .el-main {
        padding: 0;
      }
    }
  }
</style>
