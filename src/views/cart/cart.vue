<template>
  <div class="cart">
    <div class="cart__container">
      <div class="cart__container__main">
        <div class="el-card">
          <el-menu
            default-active="1"
            class="el-menu-demo"
            mode="horizontal"
            active-text-color="#04B85D"
          >
            <el-menu-item index="1">我的购物车 {{ cartNum }}</el-menu-item>
          </el-menu>
          <div class="cart__container__main__table">
            <div class="table__header">
              <el-row
                type="flex"
                class="row-bg"
                justify="space-between"
                align="middle"
              >
                <el-col :span="1">
                  <el-checkbox
                    v-model="getAllChecked"
                    @change="handleAllChange"
                  >
                    全选
                  </el-checkbox>
                </el-col>
                <el-col :span="4" style="width: 12.66667%">店铺商品</el-col>
                <el-col :span="2" style="margin-right: 34px">商品属性</el-col>
                <el-col :span="1" style="margin-right: 47px">单价</el-col>
                <el-col :span="1" style="position: relative; left: 21px">
                  数量
                </el-col>
                <el-col :span="2" style="position: relative; left: 50px">
                  金额（元）
                </el-col>
                <el-col
                  :span="2"
                  style="position: relative; left: 15px; text-align: left"
                >
                  操作
                </el-col>
              </el-row>
            </div>
            <div v-for="(it, ind) in cartItems" :key="ind" class="table__main">
              <div class="table__main__store">
                <el-checkbox
                  v-model="it.checked"
                  @change="handleStoreChange(ind)"
                ></el-checkbox>
                <div class="title">店铺：{{ it.name }}</div>
              </div>
              <div class="table__main__box">
                <div
                  v-for="(item, index) in it.data"
                  :key="index"
                  class="table__main__item"
                >
                  <el-row type="flex" class="row-bg" justify="space-between">
                    <el-col :span="1">
                      <el-checkbox v-model="item.checked"></el-checkbox>
                    </el-col>
                    <el-col :span="5">
                      <div class="table__main__item__store">
                        <el-image
                          style="width: 80px; height: 80px"
                          :src="item.product.pics[0].path | imgBaseUrl"
                          fit="contain"
                        ></el-image>
                        <span>{{ item.product.name }}</span>
                      </div>
                    </el-col>
                    <el-col :span="3">{{ item.product.name }}</el-col>
                    <el-col :span="2">¥{{ item.unitPrice }}</el-col>
                    <el-col :span="3">
                      <el-input-number
                        v-model="item.quantity"
                        :min="1"
                        :max="10"
                        size="small"
                        @change="handleChange"
                      ></el-input-number>
                    </el-col>
                    <el-col :span="2" style="text-align: center">
                      <div class="money">
                        ¥{{ item.unitPrice * item.quantity }}
                      </div>
                    </el-col>
                    <el-col :span="2">
                      <el-button type="text">删除</el-button>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="cart__container__footer el-card">
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="3">
              <el-checkbox v-model="getAllChecked" @change="handleAllChange">
                全选
              </el-checkbox>
              <el-button type="text" class="del">删除</el-button>
            </el-col>
            <el-col :span="14" class="total">
              已选商品
              <span>3</span>
              件 合计（不含运费）:
              <div class="money">￥{{ getTotalMoney }}</div>
              <el-image
                class="pay"
                :src="require('@/assets/imgs/cart-pay.png')"
                @click="handlePay"
              ></el-image>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    name: "Cart",
    components: {},
    data() {
      return {
        multipleSelection: [],
      };
    },
    computed: {
      ...mapState({
        cartItems: (state) => state.cart.cartItems,
        cartNum: (state) => state.cart.cartNum,
      }),
      getAllChecked() {
        return this.cartItems.every((item) => item.checked === true);
      },
      getTotalMoney() {
        let money = this.cartItems
          .map((item) =>
            item.data.map((it) => {
              return it.checked ? it.unitPrice * it.quantity : 0;
            })
          )
          .flat()
          .reduce((a, b) => a + b, 0);
        return money;
      },
    },
    watch: {},
    created() {
      this.getData();
    },
    mounted() {},
    methods: {
      handleAllChange(e) {
        this.cartItems.map((item) => {
          item.checked = e;
          item.data.map((it) => (it.checked = e));
        });
      },
      handleStoreChange(e) {
        this.cartItems[e].data.map((item) => {
          item.checked = this.cartItems[e].checked;
        });
      },
      async getData() {
        await this.$store.dispatch("cart/getMyCartItem");
      },
      handleChange() {},
      handlePay() {
        this.$router.push({ path: "/cart/pay" });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .cart {
    &__container {
      &__main {
        margin: 10px 0 0;

        &__table {
          padding: 0 10px;
        }

        .table__header {
          padding: 20px 20px 0;
          text-align: center;
          font-size: 16px;
          font-weight: bold;
        }

        .table__main {
          margin: 30px 0 0 0;

          &__box {
            border: solid 1px #e6e6e6;
          }

          &__item {
            padding: 15px 0;
            border-bottom: solid 1px #e6e6e6;

            &:last-child {
              border-color: transparent;
            }

            .el-checkbox {
              margin-left: 20px;
            }

            .money {
              font-weight: bold;
              color: $green;
            }

            .el-button {
              color: #969696;
            }

            .el-row {
              align-items: center;
            }

            &__store {
              display: flex;
              align-items: center;
              text-align: left;

              span {
                padding-left: 15px;
              }
            }
          }

          &__store {
            padding: 15px 20px;

            @include center-flex(y);

            .title {
              margin-left: 17px;
            }
          }

          &:last-child {
            margin-bottom: 10px;
          }
        }

        .el-menu {
          ::v-deep .el-menu-item.is-active {
            font-size: $text-small;
            font-weight: bold;
          }
        }

        ::v-deep .el-checkbox {
          &__label {
            font-size: $text-x-small;
          }

          &__inner {
            width: 20px;
            height: 20px;

            &::after {
              top: 4px;
              left: 7px;
            }
          }
        }
      }

      &__footer {
        padding: 10px 0;
        margin: 10px 0;
        color: $black;

        .el-row {
          padding: 0 0 0 20px;

          .el-checkbox {
            @include center-flex(y);
          }

          .del {
            margin: 0 0 0 78px;
            color: $black;
          }

          .total {
            display: flex;
            align-items: center;
            justify-content: flex-end;

            span {
              padding: 0 8px;
              font-size: 16px;
              font-weight: bold;
              color: $green;
            }

            .el-image {
              margin: 0 34px 0 65px;
            }

            .money {
              font-size: 23px;
              font-weight: bold;
              color: $green;
            }
          }
        }

        .el-col {
          display: flex;
          align-items: center;
        }
        .pay {
          width: 200px;
          cursor: pointer;
        }
      }
    }
  }
</style>
