<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 添加编辑地址
 * @Date: 2020-10-25 10:08:22
 * @LastEditTime: 2020-10-25 11:41:20
-->
<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="close">
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="small"
        label-width="101px"
      >
        <el-form-item label="收货人" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="请输入收货人姓名"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input
            v-model="formData.mobile"
            placeholder="请输入收货人手机号码"
            :maxlength="11"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="固定电话" prop="phone">
          <el-input
            v-model="formData.phone"
            placeholder="请输入固定电话"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="所在地区" prop="area">
          <el-cascader
            v-model="formData.area"
            :options="addressOptions"
            :props="addressProps"
            :style="{ width: '100%' }"
            placeholder="请选择所在地区"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input
            v-model="formData.address"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="详细地址:如道路、门牌号、小区、楼栋号、单元室等"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" @click="close">取消</el-button>
        <el-button size="small" type="primary" @click="handelConfirm">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { regionData, CodeToText, TextToCode } from "element-china-area-data";
  import {
    addUserAddress,
    modifyUserAddress,
    findAllProvinceCode,
  } from "@/api/profile";
  export default {
    name: "AddressEdit",
    components: {},
    props: [],
    data() {
      return {
        title: "",
        province: "",
        dialogFormVisible: false,
        formData: {
          name: "",
          area: [],
          address: "",
          mobile: "",
          phone: "",
        },
        rules: {
          name: [
            {
              required: true,
              message: "请输入收货人姓名",
              trigger: "blur",
            },
          ],
          address: [
            {
              required: true,
              message: "请填写您的详细地址",
              trigger: "change",
            },
          ],
          area: [
            {
              required: true,
              type: "array",
              message: "请选择所在地区",
              trigger: "change",
            },
          ],
          mobile: [
            {
              required: true,
              message: "请输入您的手机号码",
              trigger: "blur",
            },
            {
              pattern: /^1(3|4|5|7|8|9)\d{9}$/,
              message: "手机号格式错误",
              trigger: "blur",
            },
          ],
        },
        addressOptions: regionData,
        addressProps: {
          multiple: false,
        },
      };
    },
    async created() {
      const {
        data: { province },
      } = await findAllProvinceCode();
      this.province = province;
    },
    methods: {
      showEdit(row) {
        if (!row) {
          this.postTempArea = [];
          this.title = "添加收货地址";
        } else {
          this.title = "编辑收货地址";
          row.area = [];
          const province = TextToCode[row.province];
          const city = province[row.city];
          const county = city[row.county];
          row.area.push(province.code, city.code, county.code);
          this.formData = { ...row };
        }
        this.dialogFormVisible = true;
      },
      close() {
        this.$refs["elForm"].resetFields();
        this.formData = this.$options.data().formData;
        this.dialogFormVisible = false;
      },
      handelConfirm() {
        this.$refs["elForm"].validate(async (valid) => {
          if (valid) {
            const form = JSON.parse(JSON.stringify(this.formData));
            form.province = CodeToText[form.area[0]];
            form.province_code = this.province.filter(
              (item) => item.name === form.province
            )[0].code;
            form.city = CodeToText[form.area[1]];
            form.county = CodeToText[form.area[2]];
            if (this.title.includes("添加")) {
              const { msg } = await addUserAddress(form);
              this.$baseMessage(msg, "success");
            } else {
              const { msg } = await modifyUserAddress(form);
              this.$baseMessage(msg, "success");
            }
            // eslint-disable-next-line vue/custom-event-name-casing
            this.$emit("fetchData");
            this.close();
          } else {
            return false;
          }
        });
      },
      getAddressOptions() {
        // TODO 发起请求获取数据
        this.addressOptions;
      },
    },
  };
</script>

<style lang="scss" scoped></style>
