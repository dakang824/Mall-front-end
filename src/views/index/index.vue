<template>
  <div class="index">
    <Header></Header>
    <Search></Search>
    <Category></Category>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from "@/components/header.vue";
  import Search from "./components/search.vue";
  import Category from "./components/category.vue";
  import Footer from "@/components/footer.vue";
  export default {
    name: "Index",
    components: {
      Header,
      Footer,
      Search,
      Category,
    },
    created() {},
    methods: {},
  };
</script>
<style lang="scss" scoped>
  .index {
  }
</style>
