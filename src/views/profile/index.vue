<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 个人中心
 * @Date: 2020-10-19 22:34:06
 * @LastEditTime: 2020-10-20 23:26:30
-->
<template>
  <div class="profile">
    <div class="el-card no-border-radius header">
      <div class="w">
        <logo></logo>
      </div>
    </div>
    <div class="w">
      <el-container>
        <el-aside width="234px" class="el-card profile__left">
          <div
            v-for="(item, index) in list"
            :key="index"
            :class="['title', { active: index === current }]"
            @click="handleClick(index)"
          >
            {{ item.name }}
            <i class="el-icon-arrow-right"></i>
          </div>
        </el-aside>
        <el-main>
          <router-view class="main"></router-view>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
  import Logo from "@/components/logo.vue";
  export default {
    components: { Logo },
    data() {
      return {
        current: 0,
        list: [
          { name: "欢迎页", components: "welcome" },
          { name: "个人资料", components: "welcome" },
          { name: "账户安全", components: "welcome" },
          { name: "收货地址", components: "welcome" },
          { name: "我的购物车", components: "welcome" },
          { name: "我的订单", components: "welcome" },
          { name: "退款退货", components: "welcome" },
          { name: "财务明细", components: "welcome" },
          { name: "在线充值", components: "welcome" },
          { name: "汇款确认", components: "welcome" },
          { name: "商品收藏", components: "welcome" },
          { name: "店铺收藏", components: "welcome" },
        ],
      };
    },
    methods: {
      handleClick(e) {
        this.current = e;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";
  .profile {
    .header {
      padding: 35px 0;
      margin-bottom: $padding;
    }
    &__left {
      margin-right: 10px;

      .title {
        padding: 13px;
        text-align: center;
        cursor: pointer;
        background: #fff;
        border-bottom: 1px dashed $colorBorder;

        @include justify();
        @include center-flex(y);

        &::before {
          content: "";
        }

        &:hover,
        &.active {
          color: $green;
          background: $colorBg;
          border-top: 1px dashed $green;
          border-bottom: 1px dashed $green;
        }
      }
    }
    ::v-deep {
      .el-main {
        padding: 0;
      }
    }
  }
</style>
