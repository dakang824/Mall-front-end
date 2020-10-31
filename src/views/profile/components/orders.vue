<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 我的订单
 * @Date: 2020-10-29 09:56:44
 * @LastEditTime: 2020-10-31 17:34:56
-->
<template>
  <div v-loading="listLoading" class="orders el-card">
    <el-tabs v-model="activeName" @tab-click="handleChange">
      <el-tab-pane
        v-for="(item, index) in list"
        :key="index"
        :label="item.name"
        :name="item.name"
      >
        <el-form
          ref="queryForm"
          :inline="true"
          :model="queryForm"
          size="small"
          @submit.native.prevent
        >
          <el-form-item prop="order_no">
            <el-input
              v-model.trim="queryForm.order_no"
              placeholder="输入商品标题或订单号"
              clearable
            />
          </el-form-item>
          <el-form-item prop="status">
            <el-select
              v-model="queryForm.status"
              placeholder="请选择交易状态"
              :disabled="current !== 0"
            >
              <el-option
                v-for="options in statusOptions"
                :key="options.value"
                :label="options.label"
                :value="options.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="from">
            <el-date-picker
              v-model="queryForm.from"
              type="date"
              placeholder="选择下单时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              @click="handleSearch"
            >
              搜索
            </el-button>
          </el-form-item>
        </el-form>
        <div v-if="list[current].data.length">
          <ul class="orders__title">
            <li
              v-for="(it, ind) in title"
              :key="ind"
              :style="{
                width: it.width + 'px',
              }"
            >
              {{ it.name }}
            </li>
          </ul>

          <p>
            <el-checkbox v-model="allChecked" @change="handleAll">
              全选
            </el-checkbox>
            <el-button
              type="primary"
              size="small"
              class="orders__del__btn"
              @click="handleDelAll"
            >
              批量删除订单
            </el-button>
          </p>
          <div
            v-for="(ite, inde) in list[current].data"
            :key="inde"
            class="orders__item"
          >
            <div class="orders__item__th">
              <el-checkbox v-model="ite.checked" />
              <i>{{ ite.create_time }}</i>
              <i>订单号：{{ ite.trade_no }}</i>
              <i>{{ ite.store_name }}</i>
            </div>

            <div class="orders__item__row">
              <div class="orders__item__row__col" style="max-width: 394px">
                <div
                  v-for="(items, indexs) in ite.items"
                  :key="indexs"
                  class="name"
                >
                  <div :style="{ width: title[0].width + 'px' }">
                    <el-image
                      :src="items.item_pic | imgBaseUrl"
                      style="width: 60px"
                    ></el-image>
                    <h5>{{ items.name }}</h5>
                  </div>
                  <span :style="{ width: 9 + title[1].width * 1 + 'px' }">
                    {{ items.sell_price | toFixed }}
                  </span>
                  <i :style="{ width: title[2].width + 'px' }">
                    {{ items.quantity }}
                  </i>
                </div>
              </div>
              <div
                class="orders__item__row__col"
                :style="{
                  width: title[3].width + 'px',
                }"
              >
                <div class="money">
                  <span>总金额￥{{ ite.total_amount | toFixed }}</span>
                  <span v-if="ite.discount">
                    优惠金额:￥{{ ite.discount | toFixed }}
                  </span>
                  <span>待付款：</span>
                  <i>￥{{ (ite.total_amount - ite.discount) | toFixed }}</i>
                </div>
              </div>
              <div
                class="orders__item__row__col"
                :style="{
                  width: title[4].width + 'px',
                }"
              >
                <div class="money">
                  <span v-if="ite.status === 0">订单已确认,等待买家付款</span>
                  <span v-else-if="ite.status === 2">
                    买家已付款，等待卖家发货
                  </span>
                  <span v-else-if="ite.status === 5">交易关闭</span>
                  <span v-else-if="ite.status === 4">交易成功</span>
                  <span v-else>卖家已发货，等待买家确认收</span>
                  <el-link @click="handleClick(ite)">订单详情</el-link>
                </div>
              </div>
              <div
                class="orders__item__row__col"
                :style="{
                  width: title[5].width + 'px',
                }"
              >
                <div v-if="ite.status !== 4" class="money">
                  <div v-if="ite.status === 2 || ite.post_status">
                    <p>
                      <el-button
                        type="primary"
                        size="small"
                        @click="handleConfirm"
                      >
                        确认收货
                      </el-button>
                    </p>
                    <p v-if="ite.post_status">
                      <el-button
                        size="small"
                        type="info"
                        @click="handleDelayed"
                      >
                        延迟收货时间
                      </el-button>
                    </p>
                    <p>
                      <el-button
                        size="small"
                        type="warning"
                        @click="handleRefund"
                      >
                        我要退款
                      </el-button>
                    </p>
                  </div>
                  <div v-else>
                    <span>还剩00天00小时59分59秒</span>
                    <p>
                      <el-button type="primary" size="small" @click="handlePay">
                        立即付款
                      </el-button>
                    </p>
                    <p>
                      <el-button
                        size="small"
                        type="danger"
                        @click="handleCancel"
                      >
                        取消订单
                      </el-button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <el-pagination
            background
            :current-page="queryForm.pageNum"
            :page-size="queryForm.pageSize"
            :page-sizes="[5, 10, 15, 20, 25, 50, 100]"
            :layout="layout"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
        <div v-else>
          <empty icon="order" text="暂无订单" margin-top="90"></empty>
        </div>
      </el-tab-pane>
    </el-tabs>
    <ordersDetail v-model="showDialog" :model="currentItems" />
  </div>
</template>

<script>
  import OrdersDetail from "./orders-detail.vue";
  import { findMyOrders } from "@/api/profile";
  import Empty from "@/components/empty.vue";
  export default {
    components: {
      Empty,
      OrdersDetail,
    },

    data() {
      return {
        currentItems: [],
        showDialog: false,
        allChecked: false,
        layout: "total, sizes, prev, pager, next, jumper",
        listLoading: true,
        total: 0,
        current: 0,
        selectRows: "",
        queryForm: {
          pageNum: 1,
          pageSize: 5,
          from: "",
          status: "",
          order_no: "",
        },
        title: [
          {
            name: "宝贝",
            width: "260",
          },
          {
            name: "单价（元）",
            width: "94",
          },
          {
            name: "数量",
            width: "80",
          },
          {
            name: "金额（元）",
            width: "155",
          },
          {
            name: "交易状态",
            width: "183",
          },
          {
            name: "交易操作",
            width: "194",
          },
        ],

        activeName: "所有订单",
        statusOptions: [
          {
            label: "全部订单",
            value: "",
          },
          {
            label: "待付款",
            value: 1,
          },
          {
            label: "待发货",
            value: 2,
          },
          {
            label: "待收货",
            value: 3,
          },
          {
            label: "已完成",
            value: 4,
          },
          {
            label: "已取消",
            value: 5,
          },
          {
            label: "待退款",
            value: 6,
          },
          {
            label: "已退款",
            value: 7,
          },
        ],
        list: [
          {
            name: "所有订单",
            data: [],
          },
          {
            name: "代付款",
            data: [],
          },
          {
            name: "代发货",
            data: [],
          },
          {
            name: "待收货",
            data: [],
          },
        ],
      };
    },
    watch: {
      list: {
        handler: function () {
          this.allChecked = this.list[this.current].data.every(
            (item) => item.checked
          );
        },
        deep: true,
      },
    },
    created() {
      this.fetchData();
    },
    methods: {
      handleClick(e) {
        this.currentItems = e;
        this.showDialog = true;
      },
      handleCancel() {
        this.$message({
          message: "取消订单" || msg,
          type: "success",
        });
      },
      handleConfirm() {
        this.$message({
          message: "确认收货" || msg,
          type: "success",
        });
      },
      handleDelayed() {
        this.$message({
          message: "延迟收货" || msg,
          type: "success",
        });
      },
      handleRefund() {
        this.$message({
          message: "退款" || msg,
          type: "success",
        });
      },
      handlePay() {
        this.$message({
          message: "再次付款" || msg,
          type: "success",
        });
      },
      handleDelAll() {
        const items = this.list[this.current].data.filter(
          (item) => item.checked
        );
        console.log(items);
        this.$message({
          message: "删除订单" || msg,
          type: "success",
        });
      },
      handleAll(e) {
        this.list[this.current].data.map((item) => (item.checked = e));
      },
      handleChange(e) {
        const ind = Number(e.index);
        this.queryForm.status = ind === 0 ? "" : ind;
        this.current = ind;
        this.fetchData();
      },
      handleCurrentChange(e) {
        this.queryForm.pageNum = e;
        this.fetchData();
      },
      handleSizeChange(e) {
        this.queryForm.pageNum = 1;
        this.queryForm.pageSize = e;
        this.fetchData();
      },
      getData(cartItems) {
        cartItems.map((item) => {
          item.checked = false;
          item.product.specList = item.product.specList.filter(
            (it) => it.id === item.specId
          );
          item.unitPrice = item.product.specList[0].sellPrice;
        });

        const map = cartItems.reduce((result, item) => {
          result[item.product.storeId] = result[item.product.storeId] || [];
          result[item.product.storeId].push(item);
          return result;
        }, {});

        const result = Object.values(map).map((item) => {
          return {
            checked: false,
            name: item[0].product.store.name,
            data: item,
          };
        });

        return result;
      },
      handleSearch() {
        this.queryForm.pageNum = 1;
        this.fetchData();
      },
      async fetchData() {
        this.listLoading = true;
        const {
          data: { orders },
        } = await findMyOrders(this.queryForm);
        this.total = orders.total;
        orders.list.map((item) => {
          item.checked = false;
        });
        const index = this.list.findIndex(
          (item) => item.name === this.activeName
        );
        this.current = index;
        this.list[index].data = orders.list;
        this.$nextTick(() => {
          this.listLoading = false;
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";
  .orders {
    min-height: 529px;
    padding-bottom: 20px;
    margin-bottom: $padding;
    .el-tab-pane {
      margin: 0 $padding;
    }
    &__del__btn {
      margin-left: $padding;
    }
    &__title {
      @include center-flex(y);
      background: #d5d5d5;
      text-align: center;
      padding: 14px;
      margin: 15px 0;
    }
    &__item {
      margin: $padding 0;
      border: 1px solid $colorBorder;
      &__th {
        background: #d5d5d5;
        padding: $padding;
        @include center-flex(y);
        i {
          margin-left: 10px;
          margin-right: 60px;
        }
      }
      &__row {
        display: flex;
        &__col {
          @include center-flex(y);
          justify-content: center;
          flex-direction: column;

          .name {
            flex: 1;
            @include center-flex(y);
            padding: 20px $padding;
            border-bottom: 1px solid $colorBorder;
            h5 {
              margin: 0 30px 0 9px;
            }
            span {
              color: $green;
              font-weight: bold;
            }
            > div {
              @include center-flex(y);
            }
            &:last-child {
              border-color: transparent;
            }
          }
          .money {
            padding: 20px $padding;
            text-align: center;
            span {
              display: block;
              padding-bottom: 3px;
            }
            i {
              font-weight: bold;
              color: $green;
            }
          }

          &:nth-child(1) {
            flex-wrap: wrap;
            overflow: hidden;
            justify-content: inherit;
          }
          &:nth-child(2) {
            border-left: 1px solid $colorBorder;
            border-right: 1px solid $colorBorder;
          }
          &:nth-child(3) {
            border-right: 1px solid $colorBorder;
            font-size: 12px;
          }
          &:nth-child(4) {
            font-size: 13px;
            p {
              margin-top: $padding;
            }
          }
        }
      }
    }
    ::v-deep {
      .el-pagination {
        text-align: center;
      }
      .el-tabs {
        &__item {
          width: 150px !important;
          height: 46px;
          line-height: 46px;
          text-align: center;
          font-size: $text-x-small;
        }
      }
    }
  }
</style>
