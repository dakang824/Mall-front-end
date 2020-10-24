<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 个人资料
 * @Date: 2020-10-24 19:28:43
 * @LastEditTime: 2020-10-25 00:04:25
-->
<template>
  <div class="account el-card">
    <el-tabs value="first">
      <el-tab-pane label="账户安全" name="first">
        <p class="title">您的账户信息</p>
        <div>
          <el-image src=""></el-image>
          <div>
            <i>登录账号：64638998@qq.com</i>
            <i>绑定手机:13888888888</i>
          </div>
        </div>
        <div class="leve">
          当前安全级别：
          <ul>
            <li v-for="(item, index) in level" :key="index">{{ item }}</li>
          </ul>
        </div>

        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple-dark">第三方</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-dark">地方</div>
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
    ::v-deep {
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
