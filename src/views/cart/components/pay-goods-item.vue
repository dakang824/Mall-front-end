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
          <el-col :span="4" style="width: 12.66667%;">店铺商品</el-col>
          <el-col :span="2" style="position: relative; left: 38px;">
            商品属性
          </el-col>
          <el-col :span="1">单价</el-col>
          <el-col :span="1">数量</el-col>
          <el-col :span="2" style="position: relative; left: -22px;">
            金额（元）
          </el-col>
        </el-row>
      </div>
      <div v-for="(it, ind) in postData.orders" :key="ind" class="table__main">
        <div class="table__main__store">
          <div class="title">店铺：{{ it.store_name }}</div>
        </div>
        <div class="table__main__box">
          <div
            v-for="(item, index) in it.items"
            :key="index"
            class="table__main__item"
          >
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="5">
                <div class="table__main__item__store">
                  <el-image
                    style="width: 80px; height: 80px;"
                    :src="item.item_pic | imgBaseUrl"
                    fit="contain"
                  ></el-image>
                  <span>{{ item.name }}</span>
                </div>
              </el-col>
              <el-col :span="3">{{ item.summary }}</el-col>
              <el-col :span="2">￥{{ item.unitPrice | toFixed }}</el-col>
              <el-col :span="2">
                <div class="money">{{ item.quantity }}</div>
              </el-col>
              <el-col :span="2">
                <div class="money">
                  ¥{{ (item.unitPrice * item.quantity) | toFixed }}
                </div>
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
              <el-form>
                <el-form-item label="给卖家留言" label-width="100">
                  <el-input
                    v-model="it.buyer_common"
                    type="textarea"
                    :rows="2"
                    placeholder="选填，请先和商家协商一致"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="1">运费：</el-col>
            <el-col :span="2">
              <div class="money">¥{{ it.post_amount | toFixed }}</div>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            class="row-bg"
            justify="space-between"
            align="middle"
          >
            <el-col :span="14" class="el-form__row"></el-col>
            <el-col :span="5">店铺合计（含运费）：</el-col>
            <el-col :span="2">
              <div class="money">¥{{ postData.pay_amount | toFixed }}</div>
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
    components: {},
    data() {
      return {};
    },
    computed: {
      ...mapState({
        postData: (state) => state.pay.postData,
      }),
    },
    created() {},
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .pay-goods-item {
    &__main {
      &__table {
        padding: 0 10px;
      }

      .table__header {
        padding: 20px 20px 0;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
      }

      .table__main {
        margin: 15px 0 0 0;

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
          padding: 10px $gap;
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
                  color: #303133;
                }
              }

              textarea {
                width: 568px;
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
