<!-- 收货地址 -->
<template>
  <div class="pay-address">
    <div class="box">
      <div
        v-for="(item, index) in myAddress"
        :key="index"
        :class="{ card: true, active: item.def }"
      >
        <el-tag v-if="item.def" type="info">默认地址</el-tag>
        <div class="user">{{ item.name }}</div>
        <p>{{ item.province + item.city + item.county + item.address }}</p>
        <p>{{ item.mobile }}</p>
        <div class="footer">
          <span @click="handleEdit(item)">修改</span>
          <span @click="handleDelete(item)">删除</span>
        </div>
      </div>
    </div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      class="btn"
      @click="handleEdit"
    >
      {{ myAddress.length ? "使用新地址" : "添加地址" }}
    </el-button>

    <edit ref="edit" @fetchData="fetchData"></edit>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { deleteUserAddress } from "@/api/profile";
  import { regionDataPlus } from "element-china-area-data";
  import Edit from "@/views/profile/components/address/components/addressEdit.vue";
  export default {
    components: { Edit },
    data() {
      return {
        show: false,
        options: regionDataPlus,
        selectedOptions: [],
        formData: {
          mobile: "",
          field101: undefined,
          address: undefined,
          field114: undefined,
          phone: undefined,
        },
        rules: {
          user: [
            {
              required: true,
              message: "请输入收货人",
              trigger: "blur",
            },
          ],
          field101: [
            {
              required: true,
              message: "请输入收货地址",
              trigger: "blur",
            },
          ],
          address: [
            {
              required: true,
              message: "请输入详细地址",
              trigger: "blur",
            },
          ],
          mobile: [
            {
              required: true,
              message: "请输入手机号码",
              trigger: "blur",
            },
            {
              pattern: /^1(3|4|5|7|8|9)\d{9}$/,
              message: "手机号格式错误",
              trigger: "blur",
            },
          ],
          phone: [
            {
              required: true,
              message: "请输入固定号码",
              trigger: "blur",
            },
          ],
        },
        model: [
          {
            checked: false,
            user: "上海上海（何银辉收）",
            address: "徐汇区龙华西路585号A座15A1",
            phone: "15800375957",
          },
          {
            checked: true,
            user: "上海上海（何银辉收）",
            address: "徐汇区龙华西路585号A座15A1",
            phone: "15800375957",
          },
        ],
      };
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
      async handleDelete(e) {
        this.$baseConfirm("你确定要删除当前项吗", null, async () => {
          const { msg } = await deleteUserAddress({ id: e.id });
          this.$baseMessage(msg, "success");
          this.fetchData();
        });
      },
      fetchData() {
        this.$store.dispatch("profile/getMyPostAddress");
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .pay-address {
    .box {
      @include center-flex(y);

      flex-wrap: wrap;

      .card {
        position: relative;
        width: 240px;
        padding: 15px 10px 10px;
        margin-right: 20px;
        height: 167px;
        cursor: pointer;
        background: #fff;
        border: 2px dashed $colorBorder;
        &.active {
          border-color: $green;
          color: #303133;
        }
        .el-tag {
          position: absolute;
          top: 0;
          right: 0;
          height: 25px;
          padding: 0 5px;
          line-height: 25px;
          border-color: transparent;
          border-radius: 0;
        }

        .user {
          padding-bottom: 10px;
          margin-bottom: 10px;
          font-size: 15px;
          font-weight: bold;
          border-bottom: 1px solid #eee;
        }

        p {
          font-size: 14px;
          @include ellipsis-lines(2);
        }

        .footer {
          font-size: $text-x-small;
          color: #c90;
          position: absolute;
          bottom: 6px;
          span {
            display: inline-block;
            padding: 10px 20px 0 0;
          }
        }
      }
    }

    .btn {
      margin-top: $padding;
    }
  }
</style>
