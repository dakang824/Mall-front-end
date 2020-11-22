<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 个人资料
 * @Date: 2020-10-24 19:28:43
 * @LastEditTime: 2020-10-25 11:44:08
-->
<template>
  <div class="account el-card">
    <el-tabs value="first">
      <el-tab-pane label="收货地址" name="first">
        <el-button type="primary" @click="handleEdit">
          <i class="el-icon-plus"></i>
          新增收货地址
        </el-button>
        <p class="tip">已保存的收货地址</p>

        <el-table :data="myAddress" style="width: 100%" border>
          <el-table-column
            prop="name"
            label="收货人"
            align="center"
            width="90"
          ></el-table-column>
          <el-table-column label="收货地址" align="center">
            <template slot-scope="scope">
              {{
                scope.row.province +
                scope.row.city +
                scope.row.county +
                scope.row.address
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号码"
            align="center"
            width="130"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="固定电话"
            align="center"
            width="130"
          ></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200"
            align="center"
          >
            <template #default="scope">
              <el-button
                type="primary"
                size="small"
                @click="handleEdit(scope.row)"
              >
                编辑
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="handleDelete(scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <edit ref="edit" @fetchData="fetchData"></edit>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { deleteUserAddress } from "@/api/profile";
  import Edit from "./components/addressEdit.vue";
  export default {
    name: "Address",
    components: { Edit },
    data() {
      return {};
    },
    computed: {
      ...mapState({
        myAddress: (state) => state.profile.myAddress,
      }),
    },
    created() {
      this.fetchData();
    },
    methods: {
      handleEdit(row) {
        if (row.id) {
          this.$refs["edit"].showEdit(row);
        } else {
          this.$refs["edit"].showEdit();
        }
      },
      async fetchData() {
        await this.$store.dispatch("profile/getMyPostAddress");
      },
      async handleDelete(e) {
        this.$baseConfirm("你确定要删除当前项吗", null, async () => {
          const { msg } = await deleteUserAddress({ id: e.id });
          this.$baseMessage(msg, "success");
          this.fetchData();
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .account {
    min-height: 529px;

    .tip {
      padding: 19px 0 17px;
      font-size: 14px;
    }

    ::v-deep {
      .el-table {
        th {
          color: #fff;
          background: $green;
        }
      }

      .el-tabs {
        &__content {
          padding: 0 45px;
        }

        &__item {
          height: 46px;
          padding-right: 45px !important;
          padding-left: 45px !important;
          font-size: $text-x-small;
          line-height: 46px;
        }

        &__active-bar {
          width: 100% !important;
          transform: translateX(0) !important;
        }
      }
    }
  }
</style>
