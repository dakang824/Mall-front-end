<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 个人资料
 * @Date: 2020-10-24 19:28:43
 * @LastEditTime: 2020-10-24 23:49:26
-->
<template>
  <div class="profile el-card">
    <el-tabs value="first">
      <el-tab-pane label="基本信息" name="first">
        <el-form
          ref="elForm"
          :model="userInfo"
          :rules="rules"
          size="medium"
          label-width="100px"
        >
          <el-form-item label="" prop="icon">
            <el-upload
              ref="userInfo.icon"
              class="avatar-uploader"
              :action="fileUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <el-image
                v-if="userInfo.icon"
                :src="userInfo.icon | imgBaseUrl"
                class="avatar"
              >
                <div slot="error">
                  <i class="avatar el-icon-user-solid"></i>
                </div>
              </el-image>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="userInfo.name"
              placeholder="请输入您的姓名"
              show-word-limit
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input
              v-model="userInfo.nickname"
              placeholder="请输入您的昵称"
              show-word-limit
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="userInfo.gender">
              <el-radio
                v-for="(item, index) in genderOptions"
                :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日" prop="birthday">
            <el-date-picker
              v-model="userInfo.birthday"
              :picker-options="pickerOptions"
              format="yyyy年MM月dd日"
              value-format="yyyy-MM-dd HH:mm:ss"
              :style="{ width: '100%' }"
              placeholder="请选择生日"
              clearable
            ></el-date-picker>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="submitForm">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { modifyMyInfo } from "@/api/profile";
  import { fileUpload } from "@/config";
  export default {
    name: "Profile",
    components: {},
    data() {
      return {
        fileUpload,
        userInfo: {},
        pickerOptions: {
          disabledDate(time) {
            let curDate = new Date().getTime(); // 当前日期
            let one = 31 * 24 * 3600 * 1000; //一个月时间
            let oneMonth = curDate - one; //时间差
            return time.getTime() > Date.now(); //如果当天可选 就不用减8.64e7
          },
        },
        rules: {
          gender: [
            {
              required: true,
              message: "性别不能为空",
              trigger: "change",
            },
          ],
        },
        genderOptions: [
          {
            label: "保密",
            value: "s",
          },
          {
            label: "男",
            value: "m",
          },
          {
            label: "女",
            value: "f",
          },
        ],
      };
    },
    created() {
      this.userInfo = JSON.parse(this.$store.state.user.userInfo);
    },
    methods: {
      submitForm() {
        this.$refs["elForm"].validate(async (valid) => {
          if (valid) {
            const userInfo = JSON.parse(JSON.stringify(this.userInfo));
            userInfo.userId = userInfo.id;
            const {
              data: { user },
              msg,
            } = await modifyMyInfo(userInfo);
            this.$message({
              message: msg,
              type: "success",
            });
            this.$store.commit("user/setUserInfo", JSON.stringify(user));
          } else {
            return false;
          }
        });
      },
      handleAvatarSuccess(e) {
        this.userInfo.icon = e.data.tempUrl;
      },
      beforeAvatarUpload(file) {
        let isRightSize = file.size / 1024 / 1024 < 2;
        if (!isRightSize) {
          this.$message.error("文件大小超过 2MB");
        }
        return isRightSize;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";
  .profile {
    .el-form {
      width: 355px;
      margin: 17px auto 36px;
      text-align: center;
    }
    ::v-deep {
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 50px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover {
          border-color: $green;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 100px;
          height: 100px;
          line-height: 100px;
          text-align: center;
        }
        .avatar {
          width: 100px;
          height: 100px;
          display: block;
        }
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
