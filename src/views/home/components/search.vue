<!-- 首页搜索 -->
<template>
  <div class="el-card">
    <div class="search w">
      <logo></logo>
      <div class="search__input">
        <el-input
          v-model="keyWord"
          placeholder="请输入需要搜索的商品名称"
          class="input-with-select"
        >
          <div slot="append">
            <el-image
              :src="require('@/assets/imgs/search-icon.png')"
              class="search"
              fit="cover"
            ></el-image>
          </div>
        </el-input>
      </div>
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
  @import "@/assets/scss/settings";
  .search {
    @include center-flex(y);
    background: $white;
    padding: 36px 0 39px 54px;

    &__input {
      width: 1126px;
      margin-left: 93px;
    }
    ::v-deep {
      .el-input {
        color: #a0a0a0;
        &__inner {
          height: 80px;
          font-size: $text-small;
          border: 2px solid $green;
          position: relative;
          top: 1px;
        }
      }
      .el-input-group {
        &__append {
          padding: 0;
          border-color: transparent;
          .search {
            width: 239px;
            height: 80px;
            padding: 0;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
