<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 汇款订单
 * @Date: 2020-10-29 20:39:13
 * @LastEditTime: 2020-10-29 22:12:57
-->
<template>
  <div>
    <div class="remittance el-card">
      <el-tabs value="first">
        <el-tab-pane label="汇款确认" name="first">
          <div class="remittance__box">
            <el-form
              ref="form"
              :model="formData"
              :rules="rules"
              size="medium"
              label-width="100px"
            >
              <el-form-item label="姓名:" prop="name">
                <el-input
                  v-model="formData.name"
                  placeholder="汇款人真实姓名"
                  clearable
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
              <el-form-item label="用户名:" prop="user_account">
                <el-input
                  v-model="formData.user_account"
                  placeholder="在本站的登录账号"
                  clearable
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
              <el-form-item label="汇款银行:" prop="bank_name">
                <el-input
                  v-model="formData.bank_name"
                  placeholder="您的汇款银行"
                  clearable
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
              <el-form-item label="汇款账号:" prop="bank_account">
                <el-input
                  v-model="formData.bank_account"
                  placeholder="您的汇款账号"
                  clearable
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
              <el-form-item label="汇款金额:" prop="amount">
                <el-input
                  v-model="formData.amount"
                  placeholder="您的汇款金额"
                  clearable
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
              <el-form-item label="汇款时间:" prop="time">
                <el-date-picker
                  v-model="formData.time"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :style="{ width: '100%' }"
                  placeholder="请选择汇款时间"
                  clearable
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="联系电话:" prop="mobile">
                <el-input
                  v-model="formData.mobile"
                  placeholder="请输入您的联系电话"
                  clearable
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
              <el-form-item label="备注:" prop="common">
                <el-input
                  v-model="formData.common"
                  type="textarea"
                  placeholder="请输入备注"
                  :maxlength="500"
                  show-word-limit
                  :autosize="{ minRows: 4, maxRows: 4 }"
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
              <el-form-item
                label-width="110px"
                label="汇款底单照片:"
                prop="pic_path"
                required
              >
                <el-upload
                  ref="pic_path"
                  :file-list="pic_pathfileList"
                  :action="fileUpload"
                  :before-upload="pic_pathBeforeUpload"
                  :on-success="handlePicsSuccess"
                >
                  <el-button size="small" type="primary" icon="el-icon-upload">
                    选择文件
                  </el-button>
                </el-upload>
              </el-form-item>
              <el-form-item size="large">
                <el-button type="primary" class="btn" @click="submitForm">
                  提交
                </el-button>
                <el-button class="btn" @click="resetForm">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="texts">
      <p>线下转账收款账户</p>
      <ul>
        <li>开户名称：摩耳（上海）信息科技有限公司</li>
        <li>开户银行：中国工商银行股份有限公司某某某支行</li>
        <li>银行账户：1001 1486 0902 8888 136</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { fileUpload } from "@/config";
  import { addRemittance } from "@/api/profile";
  export default {
    components: {},
    data() {
      return {
        fileUpload,
        formData: {
          name: null,
          user_account: null,
          bank_name: null,
          bank_account: null,
          amount: null,
          time: null,
          mobile: null,
          common: null,
          pic_path: null,
        },
        rules: {
          name: [
            {
              required: true,
              message: "汇款人真实姓名",
              trigger: "blur",
            },
          ],
          user_account: [
            {
              required: true,
              message: "在本站的登录账号",
              trigger: "blur",
            },
          ],
          bank_name: [
            {
              required: true,
              message: "您的汇款银行",
              trigger: "blur",
            },
          ],
          bank_account: [
            {
              required: true,
              message: "您的汇款账号",
              trigger: "blur",
            },
          ],
          amount: [
            {
              required: true,
              message: "您的汇款金额",
              trigger: "blur",
            },
          ],
          time: [
            {
              required: true,
              message: "请选择汇款时间",
              trigger: "change",
            },
          ],
          mobile: [
            {
              required: true,
              message: "请输入您的联系电话",
              trigger: "blur",
            },
          ],
          pic_path: {
            required: true,
            message: "请选择上传图片",
            trigger: "blur",
          },
          common: [],
        },
        pic_pathfileList: [],
      };
    },
    methods: {
      handlePicsSuccess(e) {
        this.formData.pic_path = e.data.tempUrl;
        if (e.code === 500) {
          this.$baseAlert(e.msg, "温馨提示");
        }
        this.$refs.form.clearValidate("pic_path");
      },
      submitForm() {
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            const { msg } = await addRemittance(this.formData);
            this.$message({
              message: msg,
              type: "success",
            });
            this.resetForm();
          } else {
            return false;
          }
        });
      },
      resetForm() {
        this.$refs["form"].resetFields();
      },
      pic_pathBeforeUpload(file) {
        let isRightSize = file.size / 1024 / 1024 / 1024 < 2;
        if (!isRightSize) {
          this.$message.error("文件大小超过 2GB");
        }
        return isRightSize;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";
  .remittance {
    &__box {
      width: 50%;
      margin: 30px auto;
      .btn {
        width: 150px;
      }
    }
  }
  .texts {
    background: #d4d4d4;
    padding: 16px 64px;
    margin: $padding 0;
    ul {
      li {
        @include center-flex(y);
        &::before {
          content: "·";
          font-weight: bold;
          display: block;
          margin-right: 10px;
        }
      }
    }
  }

  ::v-deep {
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
</style>
