<!-- 商铺 -->
<template>
  <div class="store">
    <StoreHeader></StoreHeader>
    <div class="box w">
      <el-container>
        <el-aside width="278px">
          <ul>
            <li class="title">店内分类</li>
            <li
              v-for="(item, index) in 7"
              :key="index"
              :class="{ active: index === current }"
              @click="handleChange(index)"
            >
              分类{{ item }}
            </li>
          </ul>
        </el-aside>
        <el-main>
          <StoreTabs></StoreTabs>
          <GoodsCard></GoodsCard>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
  import StoreHeader from "./components/store-header.vue";
  import StoreTabs from "./components/store-tabs.vue";
  import GoodsCard from "./components/goods-card.vue";
  export default {
    name: "Store",
    components: {
      StoreHeader,
      StoreTabs,
      GoodsCard,
    },
    data() {
      return {
        current: 0,
      };
    },
    created() {},
    methods: {
      handleChange(e) {
        this.current = e;
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .store {
    .el-aside {
      margin: 10px 10px 0 0;

      ul {
        li {
          box-sizing: border-box;
          padding: 16px 0;
          font-size: $text-medium;
          text-align: center;
          cursor: pointer;
          background: #fff;
          border-bottom: 1px dashed $colorBorder;

          &.active {
            color: #282828;
            border: 2px solid $green;
          }

          &:last-child {
            border-bottom: 0;
          }

          &.title {
            color: #fff;
            background: #5a5a5a;
            border-bottom: 0;
          }
        }
      }
    }

    .el-main {
      padding: 0;

      ::v-deep .goods-card {
        margin-bottom: 10px;

        .box {
          > .goods-item {
            margin-right: 77px;

            &:nth-child(4n) {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
</style>
