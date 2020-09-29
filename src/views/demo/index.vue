<template>
  <div class="home page-bg-gray">
    <div class="home__box">
      <img alt="Vue logo" src="@/assets/logo.png" />
      <demo msg="My is Demo" />
      <el-row>
        <el-button>默认按钮</el-button>
        <el-button type="primary" @click="handlePost">发送post</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
      </el-row>
      <div class="home__gap">
        {{ new Date() | parseTime("YYYY-MM-DD HH:mm:ss") }}
      </div>
    </div>
  </div>
</template>

<script>
  import Demo from "@/components/Demo.vue";
  import { getUserInfo } from "@/api/user";
  export default {
    name: "Home",
    components: {
      Demo,
    },
    created() {
      console.log(this.$utils);
    },
    methods: {
      handlePost() {
        getUserInfo(222);
      },
    },
  };
</script>
<style lang="scss" scoped>
  .home {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    &__box {
      text-align: center;
    }
    &__gap {
      padding: 15px;
    }
  }
</style>
