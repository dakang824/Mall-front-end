<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <demo msg="My is Demo" />
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
  </div>
</template>

<script>
import Demo from "@/components/Demo.vue";
export default {
  name: "Home",
  components: {
    Demo
  }
};
</script>
