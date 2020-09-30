<template>
  <div class="index">
    <Header></Header>
    <Search></Search>
    <Category></Category>
    <div v-for="(item, index) in floorData" :key="index" class="goods-item">
      <Floor :model="item"></Floor>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
  import Header from "@/components/header.vue";
  import Search from "./components/search.vue";
  import Category from "./components/category.vue";
  import Floor from "./components/floor.vue";
  import Footer from "@/components/footer.vue";
  export default {
    name: "Index",
    components: {
      Header,
      Footer,
      Search,
      Category,
      Floor,
    },
    data() {
      return {
        floorData: ["菜品", "菜谱", "菜盒", "设备"],
      };
    },
    created() {},
    methods: {},
  };
</script>
<style lang="scss" scoped>
  .index {
  }
</style>
