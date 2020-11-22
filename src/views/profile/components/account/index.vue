<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 个人资料
 * @Date: 2020-10-24 19:28:43
 * @LastEditTime: 2020-11-21 16:48:54
-->
<template>
  <div class="account el-card">
    <el-tabs value="first">
      <el-tab-pane label="账户安全" name="first">
        <p class="title">您的账户信息</p>
        <div class="baseInfo">
          <el-image
            v-if="userInfo.icon"
            class="user_pic"
            :src="userInfo.icon | imgBaseUrl"
          />
          <el-image
            v-else
            :src="require('@/assets/imgs/header-avatar.png')"
            class="user_pic"
          />
          <div>
            <p>登录账号：{{ userInfo.account }}</p>
            <p>绑定手机: {{ userInfo.mobile }}</p>
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

        <el-row style="border-bottom-color: transparent;">
          <el-col :span="5">
            <div class="col1">
              <el-image
                :src="require('@/assets/imgs/profile-right.png')"
                style="widows: 32px;"
              ></el-image>
              手机验证
            </div>
          </el-col>
          <el-col :span="19">
            <div class="col2">
              <span>
                您绑定的手机：
                <i>
                  {{ userInfo.mobile | hiddenTel }}
                </i>
                ，该手机可用于账号登录，快速找回登录密码、
                支付密码，接收账户余额变动提醒等。
              </span>
              <el-button type="primary" size="small" @click="handleUpdatePhone">
                修改手机
              </el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="col1">
              <el-image
                :src="require('@/assets/imgs/profile-right.png')"
                style="widows: 32px;"
              ></el-image>
              登录密码
            </div>
          </el-col>
          <el-col :span="19">
            <div class="col2">
              <span>已设置登录密码</span>
              <el-button
                type="primary"
                size="small"
                @click="handleUpdatePassWord"
              >
                修改密码
              </el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="col1">
              <el-image
                :src="require('@/assets/imgs/profile-error.png')"
                style="widows: 32px;"
              ></el-image>
              支付密码
            </div>
          </el-col>
          <el-col :span="19">
            <div class="col2">
              <span>
                启用支付密码后，可保障您账户余额的支付安全,在使用账户资产时，需通过支
                付密码进行支付认证。
              </span>
              <el-button type="danger" size="small" @click="handlePay">
                {{ userInfo.payPwd ? "修改" : "开启" }}支付密码
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <modifyPassWord v-model="showUpdatePassWord" :type="type" />
    <modifyPhone v-model="showUpdatePhone" />
  </div>
</template>

<script>
  import { modifyMyInfo } from "@/api/profile";
  import ModifyPassWord from "./modifyPassWord";
  import ModifyPhone from "./modifyPhone";
  export default {
    name: "Profile",
    components: { ModifyPassWord, ModifyPhone },
    data() {
      return {
        level: ["低", "中", "高"],
        type: 1,
        userInfo: {},
        showUpdatePassWord: false,
        showUpdatePhone: false,
      };
    },
    created() {
      this.userInfo = JSON.parse(this.$store.state.user.userInfo);
    },
    methods: {
      handleUpdatePassWord() {
        if (this.userInfo.mobile) {
          this.showUpdatePassWord = true;
          this.type = 1;
        } else {
          this.$message({
            message: "请先绑定手机号码!",
            type: "warning",
          });
        }
      },
      handleUpdatePhone() {
        this.showUpdatePhone = true;
      },
      handlePay() {
        if (this.userInfo.mobile) {
          this.showUpdatePassWord = true;
          this.type = 2;
        } else {
          this.$message({
            message: "请先绑定手机号码!",
            type: "warning",
          });
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .account {
    min-height: 529px;

    .baseInfo {
      margin: 20px 0;

      @include center-flex(y);

      .user_pic {
        width: 56px;
        height: 56px;
        margin-right: 45px;
      }

      p {
        margin-bottom: 5px;
      }
    }

    .leve {
      padding: 22px 15px;
      margin-bottom: $padding;
      background: #d5d5d5;

      @include center-flex(y);

      ul {
        @include center-flex(y);

        li {
          width: 43px;
          height: 20px;
          margin-left: 15px;
          font-size: 12px;
          line-height: 20px;
          text-align: center;
          background: #fff;
          border: 1px solid #282828;
          border-radius: 50px;

          &.active {
            color: #fff;
            background: $green;
            border-color: $green;
          }
        }
      }
    }

    ::v-deep {
      .el-tab-pane {
        padding: 0 20px;
      }

      .el-row {
        border: 1px solid $colorBorder;

        &:last-child {
          border-top-color: transparent;
        }

        .col1 {
          .el-image {
            margin-right: 30px;
          }

          @include center-flex(y);

          position: relative;
          justify-content: center;
          padding: 22px 0;

          &::after {
            position: absolute;
            right: 0;
            display: block;
            width: 1px;
            height: 48px;
            content: "";
            background: $colorBorder;
          }
        }

        .col2 {
          @include center-flex(y);

          align-items: center;
          justify-content: space-between;
          padding: 22px;

          span {
            max-width: 431px;

            i {
              color: #f00;
            }
          }
        }
      }

      .el-tabs {
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
