<!-- 首页楼层 -->
<template>
  <div v-if="model.data.length" class="floor w el-card">
    <div class="floor__title">
      <div class="floor__title__left">
        {{ model.name }}
        <span>每日{{ model.name }}推荐</span>
      </div>
      <div class="floor__title__right">
        <router-link :to="{ path: '/goods-list', query: { type: getType } }">
          <el-link>
            更多
            <i class="el-icon-d-arrow-right"></i>
          </el-link>
        </router-link>
      </div>
    </div>
    <el-container>
      <el-aside width="300px">
        <router-link
          v-if="getPreTwo.length >= 1"
          :to="{
            path: '/goods-detail',
            query: { type: getType, id: getPreTwo[0].id },
          }"
        >
          <el-image
            :src="getPreTwo[0].pics[0].path | imgBaseUrl"
            fit="scale-down"
            style="width: 300px; height: 196px"
          ></el-image>
        </router-link>
        <router-link
          v-if="getPreTwo.length >= 2"
          :to="{
            path: '/goods-detail',
            query: { type: getType, id: getPreTwo[1].id },
          }"
        >
          <el-image
            :src="getPreTwo[1].pics[0].path | imgBaseUrl"
            fit="scale-down"
            style="width: 300px; height: 368px"
          ></el-image>
        </router-link>
      </el-aside>
      <el-main class="clearfix">
        <div
          v-for="(item, index) in getList"
          :key="index"
          class="goods-item fl"
        >
          <GoodsItem :model="item"></GoodsItem>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import GoodsItem from "@/components/goods-item.vue";
  export default {
    components: {
      GoodsItem,
    },
    props: {
      model: {
        type: Object,
        default: () => {
          return {};
        },
      },
    },
    data() {
      return {};
    },
    computed: {
      getPreTwo() {
        return this.model.data.length ? this.model.data.slice(0, 2) : [];
      },
      getList() {
        return this.model.data.length ? this.model.data.slice(2) : [];
      },
      getType() {
        return this.getPreTwo.length ? this.getPreTwo[0].type : "";
      },
    },
    created() {},
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .floor {
    padding: 28px 20px;
    margin: 10px auto;

    &__title {
      padding-bottom: 16px;
      color: $color5;

      @include justify();
      @include center-flex(y);

      &__left {
        @include center-flex(y);

        font-size: $text-small;
        font-weight: bold;
        color: $green;

        span {
          margin: 5px 6px 0;
          font-size: $text-x-small;
          font-weight: initial;
        }

        &::before {
          display: block;
          width: 3px;
          height: 29px;
          margin-right: 14px;
          content: "";
          background: $green;
        }
      }

      &__right {
        .el-link {
          font-size: $text-x-small;
          font-weight: bold;
        }
      }
    }

    .el-aside {
      .el-image {
        vertical-align: middle;
        background: $imgbg;

        &:first-child {
          margin-bottom: 10px;
        }
      }
    }

    .el-main {
      padding: 0;

      > .goods-item {
        margin-left: 24px;

        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4) {
          margin-bottom: 25px;
        }
      }
    }
  }
</style>
