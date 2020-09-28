<template>
  <div class="index">
    <Header></Header>
    <Footer />
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
    created() {},
    methods: {},
  };
</script>
<style lang="scss" scoped>
  .index {
  }
</style>
