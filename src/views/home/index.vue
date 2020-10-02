<!-- 首页 -->
<template>
  <div class="home">
    <Search></Search>
    <Category></Category>
    <div v-for="(item, index) in floorData" :key="index" class="goods-item">
      <Floor :model="item"></Floor>
    </div>
  </div>
</template>

<script>
  import Search from "./components/search.vue";
  import Category from "./components/category.vue";
  import Floor from "./components/floor.vue";
  export default {
    name: "Home",
    components: {
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
<style lang="scss" scoped></style>
