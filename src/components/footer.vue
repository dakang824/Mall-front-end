<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 
 * @Date: 2020-10-02 22:32:19
 * @LastEditTime: 2020-10-10 22:11:32
-->
<template>
  <el-container class="footer">
    <el-footer height="107px">
      嗨厨玩味信息科技(上海)有限公司 版权所有 备案号
    </el-footer>
  </el-container>
</template>
<script>
  export default {
    name: "Footer",
    components: {},
    props: {
      hidden: {
        type: Boolean,
        default: false,
      },
    },
    created() {},
    methods: {},
  };
</script>
<style lang="scss" scoped>
  .footer {
    background: #fff;

    .el-footer {
      font-size: 18px;
      line-height: 107px;
      color: #1b1b1b;
      text-align: center;
    }
  }
</style>
