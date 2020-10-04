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
            <el-menu-item index="1">我的购物车 3</el-menu-item>
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
                  <el-checkbox>全选</el-checkbox>
                </el-col>
                <el-col :span="4" style="width: 12.66667%">店铺商品</el-col>
                <el-col :span="2" style="margin-right: 34px">商品属性</el-col>
                <el-col :span="1" style="margin-right: 34px">单价</el-col>
                <el-col :span="1" style="position: relative; left: 49px">
                  数量
                </el-col>
                <el-col :span="2" style="position: relative; left: 30px">
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
            <div v-for="(it, ind) in 2" :key="ind" class="table__main">
              <div class="table__main__store">
                <el-checkbox></el-checkbox>
                <div class="title">店铺：壹只菜直营店</div>
              </div>
              <div class="table__main__box">
                <div
                  v-for="(item, index) in tableData"
                  :key="index"
                  class="table__main__item"
                >
                  <el-row type="flex" class="row-bg" justify="space-between">
                    <el-col :span="1">
                      <el-checkbox></el-checkbox>
                    </el-col>
                    <el-col :span="5">
                      <div class="table__main__item__store">
                        <el-image
                          style="width: 80px; height: 80px"
                          :src="item.src"
                          fit="contain"
                        ></el-image>
                        <span>{{ item.title }}</span>
                      </div>
                    </el-col>
                    <el-col :span="2">{{ item.price }}</el-col>
                    <el-col :span="3">¥{{ item.name }}</el-col>
                    <el-col :span="2">
                      <el-input-number
                        v-model="item.num"
                        :min="1"
                        :max="10"
                        size="small"
                        @change="handleChange"
                      ></el-input-number>
                    </el-col>
                    <el-col :span="2">
                      <div class="money">{{ item.money }}</div>
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
              <el-checkbox>全选</el-checkbox>
              <el-button type="text" class="del">删除</el-button>
            </el-col>
            <el-col :span="14" class="total">
              已选商品
              <span>3</span>
              件 合计（不含运费）:
              <div class="money">￥6098.00</div>
              <el-image
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
  export default {
    name: "Cart",
    components: {},
    data() {
      return {
        tableData: [
          {
            date: "2016-05-03",
            name: "净含量：5KG",
            price: 55.8,
            num: 1,
            title: "临安天目山小香薯5斤新鲜红薯正宗...",
            src: require("@/assets/imgs/goods3.png"),
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            date: "2016-05-03",
            name: "净含量：5KG",
            price: 55.8,
            num: 1,
            title: "临安天目山小香薯5斤新鲜红薯正宗...",
            src:
              "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            address: "上海市普陀区金沙江路 1518 弄",
          },
        ],
        multipleSelection: [],
      };
    },
    watch: {},
    created() {
      this.tableData.map((item) => {
        item.money = this.$utils.currency(item.price * item.num);
      });
    },
    mounted() {},
    methods: {
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
      font-size: $text-medium;
      &__main {
        margin: 10px 0 0;
        &__table {
          padding: 0 10px;
        }
        .table__header {
          padding: 20px 20px 0;
          text-align: center;
        }

        .table__main {
          margin: 60px 0 0 0;
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
              font-size: $text-medium;
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
            font-weight: bold;
            font-size: $text-medium;
          }
        }
        ::v-deep .el-checkbox {
          &__label {
            font-size: $text-medium;
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
        margin: 10px 0;
        padding: 20px 0;
        color: $black;
        .el-row {
          padding: 0 0 0 20px;
          .el-checkbox {
            @include center-flex(y);
          }
          .del {
            margin: 0 0 0 78px;
            font-size: $text-medium;
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
      }
    }
  }
</style>
