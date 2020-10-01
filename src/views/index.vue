<template>
  <div class="index">
    <Header></Header>
    <router-view class="main"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from "@/components/header.vue";
  import Footer from "@/components/footer.vue";
  export default {
    name: "Index",
    components: {
      Header,
      Footer,
    },
    data() {
      return {};
    },
    created() {},
    methods: {},
  };
</script>
<style lang="scss" scoped></style>
