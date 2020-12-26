<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 订单详情
 * @Date: 2020-10-31 15:51:17
 * @LastEditTime: 2020-12-26 18:55:20
-->
<template>
  <div class="orders-detail">
    <el-dialog
      title="订单详情"
      :visible="value"
      width="960px"
      @close="handleClose"
    >
      <div class="row">
        <div class="box">
          <p class="box__title">订单详情</p>
          <div class="box__content">
            <p>
              收货地址：{{ model.name }}，{{ model.mobile }}，{{
                model.address
              }}
            </p>
            <p>买家留言：{{ model.buyer_common ? model.buyer_common : "-" }}</p>
            <p>订单编号：{{ model.trade_no }}</p>
            <p>支付方式：{{ model.pay_type | getPayName }}</p>
            <p>卖家信息：{{ model.store_name }}</p>
          </div>
        </div>
        <div class="box">
          <div class="box__content__right">
            <div v-if="model.status === 0">订单已确认,等待买家付款</div>
            <div v-else-if="model.status === 2">买家已付款，等待卖家发货</div>
            <div v-else-if="model.status === 5">
              <p class="status">
                <i class="el-icon-warning-outline"></i>
                订单状态：交易关闭
              </p>

              <p>关闭类型：系统取消订单</p>
              <p>关闭原因：订单超时未支付，系统自动关闭</p>
            </div>
            <div v-else-if="model.status === 4">交易成功</div>
            <div v-else-if="model.status === 6">
              退款申请已提交,等待卖家退款
            </div>
            <div v-else-if="model.status === 7">已退款</div>
            <div v-else-if="model.status === 3">卖家已发货，等待买家确认收</div>
          </div>
        </div>
      </div>

      <div class="table">
        <ul class="head">
          <li
            v-for="(item, index) in title"
            :key="index"
            :style="{ width: item.width + 'px' }"
          >
            {{ item.name }}
          </li>
        </ul>
        <div class="table__row">
          <div class="left">
            <div v-for="(item, index) in model.items" :key="index" class="row">
              <div class="col">
                <div :style="{ width: title[0].width + 'px' }" class="name">
                  <el-image :src="item.item_pic | imgBaseUrl"></el-image>
                  <span>四川正宗家用烧菜烧豆腐</span>
                </div>
              </div>

              <div class="col" :style="{ width: title[1].width + 'px' }">
                {{ item.spe_name }}
              </div>
              <div class="col" :style="{ width: title[2].width + 'px' }">
                ¥
                {{
                  item.quantity >= item.w_num ? item.w_price : item.sell_price
                }}
              </div>
              <div class="col" :style="{ width: title[3].width + 'px' }">
                {{ item.quantity }}
              </div>
              <div class="col" :style="{ width: title[4].width + 'px' }">
                {{ model.status | getStatusStr }}
              </div>
            </div>
          </div>

          <div class="right" :style="{ width: title[5].width + 'px' }">
            <div style="text-align: center">
              <p>￥{{ model.post_amount | toFixed }}</p>
              （快递）
            </div>
          </div>
        </div>
        <div class="footer">
          商品总额：￥{{ model.pay_amount | toFixed }}+ 运费：￥{{
            model.post_amount | toFixed
          }}
          = 订单总金额：
          <span>￥{{ (model.pay_amount + model.post_amount) | toFixed }}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    components: {},
    filters: {
      getStatusStr(v) {
        return v === 0
          ? "待付款"
          : v === 2
          ? "待发货"
          : v === 3
          ? "待收货"
          : v === 4
          ? "已完成"
          : v === 5
          ? "已取消"
          : v === 6
          ? "待退款"
          : v === 7
          ? "已退款"
          : "";
      },
      getPayName(v) {
        return v === 1
          ? "微信"
          : v === 2
          ? "支付宝"
          : v === 3
          ? "银联"
          : v === 4
          ? "余额"
          : "其它";
      },
    },
    props: {
      model: {
        type: [Object, Array],
        default: () => {},
      },
      value: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        title: [
          {
            name: "商品",
            width: "260",
          },
          {
            name: "商品属性",
            width: "150",
          },
          {
            name: "单价",
            width: "100",
          },
          {
            name: "数量",
            width: "100",
          },
          {
            name: "状态",
            width: "100",
          },
          {
            name: "运费",
            width: "197",
          },
        ],
      };
    },
    methods: {
      handleClose() {
        this.$emit("input", false);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .orders-detail {
    .row {
      @include center-flex(y);

      .box {
        width: 465px;
        min-height: 270px;
        border: 1px solid $colorBorder;

        &__title {
          padding: $padding;
          font-weight: bold;
          background: #d5d5d5;
        }

        &__content {
          padding: $padding;

          p {
            line-height: 34px;
          }

          &__right {
            align-items: center;
            justify-content: center;
            min-height: 270px;
            text-align: center;

            @include center-flex(y);

            > div {
              .status {
                @include center-flex(y);

                justify-content: center;
                padding-bottom: 30px;
              }
            }

            p {
              line-height: 34px;
            }

            .el-icon-warning-outline {
              margin-right: 14px;
              font-size: 60px;
              font-weight: bold;
              color: #f00;
            }
          }
        }

        &:first-child {
          margin-right: $padding;
        }
      }
    }

    .table {
      margin: $padding 0 0;
      border: 1px solid $colorBorder;

      &__row {
        .left {
          .row {
            @include center-flex(y);

            border-bottom: 1px solid $colorBorder;
          }

          border-right: 1px solid $colorBorder;

          .col {
            text-align: center;

            .name {
              @include center-flex(y);

              align-items: center;
              justify-content: center;
            }
          }

          .el-image {
            width: 60px;
            padding: $padding;
          }
        }

        .right {
          @include center-flex(y);

          justify-content: center;
        }

        @include center-flex(y);
      }

      .head {
        padding: $padding;
        font-weight: bold;
        text-align: center;
        background: #d5d5d5;

        @include center-flex(y);
      }

      .footer {
        padding: $padding;
        text-align: right;
        background: #d5d5d5;

        span {
          font-weight: bold;
          color: $green;
        }
      }
    }
  }
</style>
