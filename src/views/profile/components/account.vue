<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 个人资料
 * @Date: 2020-10-24 19:28:43
 * @LastEditTime: 2020-10-29 21:46:22
-->
<template>
  <div class="account el-card">
    <el-tabs value="first">
      <el-tab-pane label="账户安全" name="first">
        <p class="title">您的账户信息</p>
        <div class="baseInfo">
          <el-image
            :src="userInfo.icon | imgBaseUrl"
            class="userImg"
          ></el-image>
          <div>
            <p>登录账号：{{ userInfo.account }}</p>
            <p>绑定手机:{{ userInfo.mobile }}</p>
          </div>
        </div>
        <div class="leve">
          当前安全级别：
          <ul>
            <li
              v-for="(item, index) in level"
              :key="index"
              :class="{ active: index == userInfo.accLevel }"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple-dark">登录密码</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-dark">已设置登录密码</div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { modifyMyInfo } from "@/api/profile";
  export default {
    name: "Profile",
    components: {},
    data() {
      return {
        level: ["低", "中", "高"],
        userInfo: {},
      };
    },
    created() {
      this.userInfo = JSON.parse(this.$store.state.user.userInfo);
    },
    methods: {},
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";
  .account {
    .baseInfo {
      @include center-flex(y);
      .userImg {
        width: 60px;
        height: 60px;
        margin-right: 45px;
      }
      p {
        margin-bottom: 5px;
      }
    }
    .leve {
      background: #d5d5d5;
      @include center-flex(y);
      padding: 22px 15px;
      ul {
        @include center-flex(y);
        li {
          width: 43px;
          line-height: 20px;
          height: 20px;
          border: 1px solid #282828;
          background: #fff;
          text-align: center;
          border-radius: 50px;
          margin-left: 15px;
          font-size: 12px;
          &.active {
            background: $green;
            color: #fff;
            border-color: $green;
          }
        }
      }
    }

    ::v-deep {
      .el-tab-pane {
        padding: 0 40px;
      }
      .el-tabs {
        &__item {
          padding-right: 45px !important;
          padding-left: 45px !important;
          height: 46px;
          line-height: 46px;
          font-size: $text-x-small;
        }
        &__active-bar {
          width: 100% !important;
          transform: translateX(0) !important;
        }
      }
    }
  }
</style>
