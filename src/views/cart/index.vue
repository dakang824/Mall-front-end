<template>
  <div class="cart w">
    <CartHeader></CartHeader>
    <div class="cart__container w">
      <div class="cart__container__main">
        <el-menu
          default-active="1"
          class="el-menu-demo"
          mode="horizontal"
          active-text-color="#ff0000"
        >
          <el-menu-item index="1">我的购物车 3</el-menu-item>
        </el-menu>
        <div class="cart__container__main__table">
          <div class="table__header">
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="1">
                <el-checkbox>全选</el-checkbox>
              </el-col>
              <el-col :span="6">店铺商品</el-col>
              <el-col :span="6">商品属性</el-col>
              <el-col :span="1">单价</el-col>
              <el-col :span="1">数量</el-col>
              <el-col :span="2">金额（元）</el-col>
              <el-col :span="2">操作</el-col>
            </el-row>
          </div>
          <div v-for="(item, index) in 2" :key="index" class="table__main">
            <div class="table__main__store">
              <el-checkbox></el-checkbox>
              <div class="title">店铺：壹只菜直营店</div>
            </div>
            <div
              v-for="(item, index) in tableData"
              :key="index"
              class="table__main__item"
            >
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="1">
                  <el-checkbox></el-checkbox>
                </el-col>
                <el-col :span="6">
                  <div class="table__main__item__store">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="item.src"
                      fit="contain"
                    ></el-image>
                    <span>{{ item.title }}</span>
                  </div>
                </el-col>
                <el-col :span="6">{{ item.name }}</el-col>
                <el-col :span="1">{{ item.price }}</el-col>
                <el-col :span="1">{{ item.num }}</el-col>
                <el-col :span="2">
                  <div class="money">{{ item.money }}</div>
                </el-col>
                <el-col :span="2">
                  <el-button size="mini" type="danger">删除</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="cart__container__footer">
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="3">
              <el-checkbox>全选</el-checkbox>
              <el-button size="mini" type="danger" class="del">删除</el-button>
            </el-col>
            <el-col :span="14" class="total">
              已选商品
              <span>3</span>
              件 合计（不含运费）:
              <div class="money">￥6098.00</div>
              <el-button type="danger" @click="handlePay">结算</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CartHeader from "./components/cart-header.vue";
  export default {
    name: "Cart",
    components: {
      CartHeader,
    },
    data() {
      return {
        tableData: [
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
      handlePay() {
        this.$router.push({ path: "/pay" });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";
  .cart {
    &__container {
      &__main {
        margin: 30px 0;
        background: #fff;
        .table__header {
          padding: 20px;
          text-align: center;
          border-bottom: 1px solid #eee;
        }
        .table__main {
          text-align: center;
          &__item {
            background: #f2f2f2;
            padding: 15px 20px;
            border-bottom: 1px dashed $colorC;
            .money {
              color: $error;
              font-weight: bold;
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
            display: flex;
            padding: 15px 20px;
            .title {
              margin-left: 30px;
            }
          }
        }
        .el-menu {
          ::v-deep .el-menu-item.is-active {
            color: $color3 !important;
          }
        }
      }
      &__footer {
        .el-row {
          margin-top: 20px;
          background: #f2f2f2;
          padding: 0 0 0 20px;
          .del {
            margin: 0 0 0 15px;
          }
          .total {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            span {
              color: $error;
              font-weight: bold;
              padding: 0 8px;
              font-size: 16px;
            }
            .el-button {
              margin-left: 20px;
              border-radius: 0;
              height: 50px;
              width: 160px;
              font-size: 20px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .money {
              color: $error;
              font-weight: bold;
              font-size: 23px;
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
