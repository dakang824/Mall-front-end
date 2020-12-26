<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 确认订单
 * @Date: 2020-10-02 22:32:19
 * @LastEditTime: 2020-12-26 17:23:04
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
        <PayFooter @click="handleChecking"></PayFooter>
      </div>
    </div>
    <PayPassword v-model="show" @confirm="handleConfirm" />
    <qrCode
      ref="qrCode"
      v-model="showPayDialog"
      :type="postData.pay_type"
      @result="handleSuccess"
    />
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import PayAddress from "./components/pay-address.vue";
  import PayGoodsItem from "./components/pay-goods-item.vue";
  import PayType from "./components/pay-type.vue";
  import PayFooter from "./components/pay-footer.vue";
  import PayPassword from "./components/pay-password.vue";
  import QrCode from "^/profile/components/qr-code.vue";
  import filters from "@/filters";
  export default {
    components: {
      PayAddress,
      PayGoodsItem,
      PayType,
      PayFooter,
      PayPassword,
      QrCode,
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
        showPayDialog: false,
        show: false,
        payData: "",
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
    destroyed() {
      this.$store.commit("pay/clearPostData");
    },
    async created() {
      this.$store.commit("cart/setCartState", 2);
      let obj = null;
      if (this.$route.params.obj) {
        obj = JSON.parse(this.$route.params.obj);
        localStorage.setItem("pay", this.$route.params.obj);
      } else {
        obj = JSON.parse(localStorage.getItem("pay"));
      }
      this.setStore(obj);
    },
    methods: {
      async handleChecking() {
        const {
          pay_amount,
          pay_type,
          address,
          name,
          mobile,
          is_buy, //检测用户是否已购买过
        } = this.postData;

        if (address === "") {
          this.$message({
            type: "error",
            message: "请添加收货地址",
          });
          return;
        }

        // if (is_buy) {
        //   this.$message({
        //     type: "error",
        //     message: "检测到该订单已支付,请勿重复支付",
        //   });
        //   return;
        // }
        if (pay_type === 4 && pay_amount > this.userInfo.balance) {
          this.$message({
            type: "error",
            message: "账户余额不足,请选择其它支付方式",
          });
          return;
        }

        const { accLevel, payPwd } = this.userInfo;
        // 显示支付密码
        if (accLevel == 2 && payPwd != null && pay_type === 4) {
          this.show = true;
        } else {
          this.handlePay();
        }
      },
      async handlePay() {
        this.postData.orders.forEach((item) => {
          item.pay_type = this.postData.pay_type;
        });
        this.postData.total_amount = filters.getDecimal(
          this.postData.total_amount
        );
        this.postData.pay_amount = filters.getDecimal(this.postData.pay_amount);
        const {
          userId = this.userInfo.id,
          total_amount,
          pay_amount,
          pay_type,
          name,
          mobile,
          orders,
        } = this.postData;

        // 生成签名
        this.postData.sign = await this.$store.dispatch(
          "pay/generateSignature",
          {
            userId,
            total_amount,
            pay_amount,
            pay_type,
            name,
            mobile,
            orders,
          }
        );
        let { data } = await this.$store.dispatch(
          "pay/unifityOrder",
          this.postData
        );

        if (data.pay_params && data.pay_params.qr_code) {
          this.showPayDialog = true;
          data.pay_type = this.postData.pay_type;
          this.$refs.qrCode.show(data);
          this.payData = data;
          return;
        }
        this.handleSuccess(true);
      },
      async handleSuccess(e) {
        // 更新用户余额
        await this.$store.dispatch("profileWelcome/getMyInfo", {});

        // 如果是从购物车来的,支付成功后删除购物车里面的数据
        this.postData.orders.map((item) =>
          item.items.map(async (i) => {
            if (i.cartItemId) {
              await this.$store.dispatch("cart/deleteCartItem", {
                id: i.cartItemId,
              });
            }
          })
        );
        localStorage.removeItem("pay");
        this.$router.replace({
          path: `/cart/pay-result`,
          query: {
            state: e ? "success" : "error",
            params: JSON.stringify({
              payData: this.payData,
              postData: this.postData,
            }),
          },
        });
      },
      handleConfirm(e) {
        this.postData.pay_pwd = e;
        this.handlePay();
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
