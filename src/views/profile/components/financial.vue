<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 财务明细
 * @Date: 2020-10-29 18:47:47
 * @LastEditTime: 2020-10-29 22:29:09
-->
<template>
  <div class="financial el-card">
    <el-tabs value="first">
      <el-tab-pane label="财务明细" name="first">
        <div>
          <el-form
            ref="queryForm"
            :inline="true"
            :model="queryForm"
            size="small"
            @submit.native.prevent
          >
            <el-form-item prop="value" label="交易时间:">
              <el-date-picker
                v-model="queryForm.value"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                range-separator="至"
                clearable
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button
                icon="el-icon-search"
                type="primary"
                @click="fetchData"
              >
                搜索
              </el-button>
            </el-form-item>
          </el-form>
        </div>

        <el-table v-loading="listLoading" :data="list" border>
          <el-table-column
            show-overflow-tooltip
            prop="trade_no"
            label="订单号"
            align="center"
            min-width="150"
          />
          <el-table-column
            show-overflow-tooltip
            label="交易类型"
            align="center"
          >
            <template #default="scope">
              {{ scope.row.type | getPayName }}
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="onlineTime"
            label="交易时间"
            align="center"
            min-width="150"
          >
            <template #default="scope">
              {{ scope.row.create_time | slice(0, 16) }}
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="交易金额（元）"
            align="center"
            min-width="150"
          >
            <template #default="scope">
              {{ scope.row.amount | toFixed }}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          :current-page="queryForm.pageNum"
          :page-size="queryForm.pageSize"
          :layout="layout"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { findMyCashRecords } from "@/api/profile";
  export default {
    components: {},
    filters: {
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
    data() {
      return {
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        listLoading: true,
        queryForm: {
          value: [],
          form: "",
          to: "",
          pageNum: 1,
          pageSize: 10,
        },
        list: [],
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      handleSizeChange(val) {
        this.queryForm.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.queryForm.pageNum = val;
        this.fetchData();
      },
      async fetchData() {
        const queryForm = JSON.parse(JSON.stringify(this.queryForm));
        if (queryForm.value.length) {
          queryForm.form = queryForm.value[0];
          queryForm.to = queryForm.value[1];
        }

        this.listLoading = true;
        const {
          data: { cashRecords },
        } = await findMyCashRecords(queryForm);

        this.list = cashRecords.list;
        this.total = cashRecords.total;
        setTimeout(() => {
          this.listLoading = false;
        }, 300);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";
  .financial {
    min-height: 529px;
    margin-bottom: $padding;
    ::v-deep {
      .el-table {
        th {
          background: $green;
          color: #fff;
        }
      }
      .el-pagination {
        text-align: center;
        padding: 20px;
      }
      .el-tabs {
        &__item {
          width: 150px !important;
          height: 46px;
          line-height: 46px;
          text-align: center;
          font-size: $text-x-small;
        }
        .el-tab-pane {
          padding: 0 $padding;
          flex-wrap: wrap;
        }
      }
    }
  }
</style>
