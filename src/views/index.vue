<!--
 * @Author: yukang 1172248038@qq.com
 * @Date: 2020-10-01 09:16:18
 * @LastEditTime: 2020-11-19 19:39:23
-->
<template>
  <div class="index">
    <Header></Header>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" class="main"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" class="main"></router-view>
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
