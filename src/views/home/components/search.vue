<!-- 首页搜索 -->
<template>
  <div class="search w">
    <logo></logo>
    <div class="search__input">
      <el-input
        v-model="keyWord"
        placeholder="请输入内容"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
  import Logo from "@/components/logo.vue";
  export default {
    components: {
      Logo,
    },
    data() {
      return {
        keyWord: "",
      };
    },
  };
</script>

<style lang="scss" scoped>
  .search {
    display: flex;
    align-items: center;
    &__input {
      width: 725px;
      margin-left: 150px;
    }
  }
</style>
