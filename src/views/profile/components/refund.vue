<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 我的订单
 * @Date: 2020-10-29 09:56:44
 * @LastEditTime: 2020-10-29 16:17:35
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

          <div
            v-for="(ite, inde) in list[current].data"
            :key="inde"
            class="orders__item"
          >
            <div class="orders__item__th">
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
                  <span>等待卖家确认</span>
                  <span>卖家已确认</span>
                  <span>卖家拒绝退款</span>
                </div>
              </div>
              <div
                class="orders__item__row__col"
                :style="{
                  width: title[5].width + 'px',
                }"
              >
                <div class="money">
                  <span>待确认</span>
                  <span>退款完成</span>
                  <span>退款失败</span>
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
          <empty icon="order" text="暂无退款退货订单" margin-top="90"></empty>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { findMyOrders } from "@/api/profile";
  import Empty from "@/components/empty.vue";
  export default {
    components: {
      Empty,
    },
    data() {
      return {
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
            name: "申请时间",
            width: "183",
          },
          {
            name: "交易操作",
            width: "194",
          },
        ],

        activeName: "退款退货",
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
            name: "退款退货",
            data: [],
          },
        ],
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
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
      margin: 0 0 15px 0;
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
