<!-- 收货地址 -->
<template>
  <div class="pay-address">
    {{ myAddress }}
    <div class="box">
      <div
        v-for="(item, index) in model"
        :key="index"
        class="card"
        @click="handleChange(index)"
      >
        <el-tag v-if="item.checked" type="info">默认地址</el-tag>
        <div class="user">{{ item.user }}</div>
        <p>{{ item.address }}</p>
        <p>{{ item.phone }}</p>
        <div class="footer">
          <span @click="handleUpdate">修改</span>
          <span @click="handleDel">删除</span>
        </div>
      </div>
    </div>
    <el-button type="primary" icon="el-icon-plus" class="btn">
      使用新地址
    </el-button>

    <el-dialog title="提示" :visible.sync="show" width="45%">
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        label-width="101px"
      >
        <el-form-item label="收货人" prop="user">
          <el-input
            v-model="formData.user"
            placeholder="请输入收货人"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="收货地址" prop="field101">
          <el-cascader
            v-model="selectedOptions"
            size="large"
            :options="options"
            :style="{ width: '100%' }"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input
            v-model="formData.address"
            placeholder="请输入详细地址"
            clearable
            show-password
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input
            v-model="formData.mobile"
            placeholder="请输入手机号码"
            clearable
            maxlength="11"
            show-word-limit
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="固定号码" prop="phone">
          <el-input
            v-model="formData.phone"
            placeholder="请输入固定号码"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button @click="show = false">取消</el-button>
          <el-button type="danger" @click="handleSubmit">
            保持收货地址
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { regionDataPlus } from "element-china-area-data";
  export default {
    components: {},
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
        myAddress: (state) => state.user.myAddress,
      }),
    },
    async created() {
      await this.$store.dispatch("user/getMyPostAddress");
    },
    methods: {
      handleSubmit() {
        this.show = false;
      },
      handleChange(e) {
        this.model.map((item) => {
          item.checked = false;
        });
        this.model[e].checked = true;
      },
      handleUpdate() {},
      handleDel() {},
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
        cursor: pointer;
        background: #fff;
        border: 2px dashed $green;

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
        }

        .footer {
          font-size: $text-x-small;
          color: #c90;

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
