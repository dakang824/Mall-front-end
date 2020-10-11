<!--  -->
<template>
  <div class="pay-goods-item">
    <div class="pay-goods-item__main">
      <div class="table__header">
        <el-row
          type="flex"
          class="row-bg"
          justify="space-between"
          align="middle"
        >
          <el-col :span="4" style="width: 12.66667%">店铺商品</el-col>
          <el-col :span="2" style="position: relative; left: 49px">
            商品属性
          </el-col>
          <el-col :span="1">单价</el-col>
          <el-col :span="1">数量</el-col>
          <el-col :span="2" style="position: relative; left: -22px">
            金额（元）
          </el-col>
        </el-row>
      </div>
      <div v-for="(it, ind) in 2" :key="ind" class="table__main">
        <div class="table__main__store">
          <div class="title">店铺：壹只菜直营店</div>
        </div>
        <div class="table__main__box">
          <div
            v-for="(item, index) in tableData"
            :key="index"
            class="table__main__item"
          >
            <el-row type="flex" class="row-bg" justify="space-between">
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
              <el-col :span="3">{{ item.name }}</el-col>
              <el-col :span="2">{{ item.num }}</el-col>
              <el-col :span="2">
                <div class="money">{{ item.price }}</div>
              </el-col>
              <el-col :span="2">
                <div class="money">¥{{ item.money }}</div>
              </el-col>
            </el-row>
          </div>
          <el-row
            type="flex"
            justify="space-between"
            align="middle"
            class="el-form__row"
          >
            <el-col :span="14">
              <el-form ref="form" :model="form">
                <el-form-item label="给卖家留言" label-width="100">
                  <el-input
                    v-model="textarea"
                    type="textarea"
                    :rows="2"
                    placeholder="选填，请先和商家协商一致"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="1">运费：</el-col>
            <el-col :span="2"><div class="money">¥8.00</div></el-col>
          </el-row>
          <el-row
            type="flex"
            class="row-bg"
            justify="space-between"
            align="middle"
          >
            <el-col :span="14" class="el-form__row"></el-col>
            <el-col :span="5">店铺合计（含运费）：</el-col>
            <el-col :span="2"><div class="money">¥8.00</div></el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
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
      };
    },
    created() {
      this.tableData.map((item) => {
        item.money = this.$utils.currency(item.price * item.num);
      });
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .pay-goods-item {
    font-size: $text-medium;

    &__main {
      &__table {
        padding: 0 10px;
      }

      .table__header {
        padding: 20px 20px 0;
        text-align: center;
      }

      .table__main {
        margin: 33px 0 0 0;

        &__box {
          border: solid 1px #e6e6e6;

          > .el-row {
            &:last-child {
              padding: $gap;
              border-top: solid 1px #e6e6e6;
            }
          }
        }

        &__item {
          padding: 15px $gap;
          border-bottom: solid 1px #e6e6e6;

          &:last-child {
            border-color: transparent;
          }

          .el-checkbox {
            margin-left: 20px;
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
          padding: 15px 0;

          @include center-flex(y);
        }

        &:last-child {
          margin-bottom: 10px;
        }
      }

      .el-menu {
        ::v-deep .el-menu-item.is-active {
          font-size: $text-medium;
          font-weight: bold;
        }
      }

      .el-form {
        &__row {
          padding: $gap;

          ::v-deep {
            .el-form {
              &-item {
                @include center-flex(y);

                margin-bottom: 0;

                &__label {
                  font-size: $text-medium;
                  color: #303133;
                }
              }

              textarea {
                width: 623px;
                height: 90px;
              }
            }
          }
        }
      }

      .money {
        font-weight: bold;
        color: $green;
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
  }
</style>
