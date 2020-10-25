<!-- 收货地址 -->
<template>
  <div class="pay-address">
    <div class="box">
      <div
        v-for="(item, index) in myAddress"
        :key="index"
        :class="{ card: true, active: item.def }"
        @click="handleChange(item)"
      >
        <el-tag v-if="item.def" type="info">默认地址</el-tag>
        <div class="user">{{ item.name }}</div>
        <p>{{ item.province + item.city + item.county + item.address }}</p>
        <p>{{ item.mobile }}</p>
        <div class="footer">
          <span @click.stop="handleEdit(item)">修改</span>
          <span @click.stop="handleDelete(item)">删除</span>
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
  import { deleteUserAddress, modifyUserAddress } from "@/api/profile";
  import Edit from "@/views/profile/components/address/components/addressEdit.vue";
  export default {
    components: { Edit },
    data() {
      return {};
    },
    computed: {
      ...mapState({
        myAddress: (state) => state.profile.myAddress,
      }),
    },
    watch: {
      myAddress(v) {
        const item = v.filter((item) => item.def === 1)[0];
        this.$store.commit("pay/addPostData", {
          mobile: item.mobile,
          address: item.province + item.city + item.county + item.address,
          province_code: item.province_code,
          name: item.name,
        });
      },
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
      async handleChange(e) {
        e.def = 1;
        await modifyUserAddress(e);
        this.fetchData();
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
