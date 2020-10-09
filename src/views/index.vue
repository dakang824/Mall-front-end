<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 
 * @Date: 2020-10-01 09:16:18
 * @LastEditTime: 2020-10-09 23:04:25
-->
<template>
  <div class="index">
    <Header></Header>
    <transition name="el-fade-in-linear">
      <router-view class="main"></router-view>
    </transition>
    <Footer></Footer>
    <SideNav></SideNav>
  </div>
</template>

<script>
  import Header from "@/components/header.vue";
  import Footer from "@/components/footer.vue";
  import SideNav from "@/components/sideNav.vue";
  export default {
    name: "Index",
    components: {
      Header,
      Footer,
      SideNav,
    },
    data() {
      return {};
    },
    created() {},
    methods: {},
  };
</script>
<style lang="scss" scoped></style>
