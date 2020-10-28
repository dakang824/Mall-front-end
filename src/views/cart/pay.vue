<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 确认订单
 * @Date: 2020-10-02 22:32:19
 * @LastEditTime: 2020-10-29 00:32:34
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
        <component :is="item.name" v-model="postData.pay_type"></component>
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
  import { mapState } from "vuex";
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
    computed: {
      ...mapState({
        postData: (state) => state.pay.postData,
        userInfo: (state) => JSON.parse(state.user.userInfo),
      }),
    },
    watch: {
      postData: {
        handler: function () {
          this.$store.commit("pay/computedPost");
        },
      },
    },
    async created() {
      this.$store.commit("cart/setCartState", 2);
      this.setStore(JSON.parse(this.$route.query.obj));
    },
    methods: {
      async handlePay() {
        const {
          pay_amount,
          pay_type,
          address,
          name,
          mobile,
          is_buy, //检测用户是否已购买过
        } = this.postData;
        if (is_buy) {
          this.$message({
            type: "error",
            message: "检测到该订单已支付,请勿重复支付",
          });
          return;
        }
        if (pay_type === 1 && pay_amount > this.userInfo.balance) {
          this.$message({
            type: "error",
            message: "账户余额不足,请选择其它支付方式",
          });
          return;
        }
        await this.$store.dispatch("pay/unifityOrder", this.postData);

        // 更新用户余额
        await this.$store.dispatch("profileWelcome/getMyInfo", {});
        this.$router.push({
          path: `/cart/pay-result`,
          query: {
            state: "success",
            params: JSON.stringify({
              pay_amount,
              address,
              name,
              mobile,
            }),
          },
        });
      },
      setStore(e) {
        this.$store.commit("pay/addPostData", e);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .pay {
    .el-menu {
      ::v-deep .el-menu-item.is-active {
        font-size: $text-small;
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
      }
    }
  }
</style>
