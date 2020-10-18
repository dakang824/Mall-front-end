<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 商品详情侧边栏
 * @Date: 2020-10-05 23:21:38
 * @LastEditTime: 2020-10-18 13:21:14
-->

<template>
  <div class="goods-detail-aside">
    <StoreAside :model="model"></StoreAside>
    <StoreAside title="店内排行">
      <el-tabs type="border-card" stretch>
        <el-tab-pane
          v-for="(item, index) in getRankingList"
          :key="index"
          :label="item.title"
        >
          <div
            v-for="(it, ind) in item.child"
            :key="ind"
            class="goods-item"
            @click="handleClick(it)"
          >
            <el-image
              :src="it.pics[0].path | imgBaseUrl"
              fit="cover"
            ></el-image>
            <div class="right">
              <p>{{ it.name }}</p>
              <span>￥{{ it.specList | minPrice }}</span>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </StoreAside>
  </div>
</template>

<script>
  import StoreAside from "../../store/components/store-aside.vue";
  export default {
    components: { StoreAside },
    filters: {
      minPrice: (value) => {
        if (value.length) {
          return JSON.parse(JSON.stringify(value))
            .sort((a, b) => {
              return a.sellPrice - b.sellPrice;
            })[0]
            .sellPrice.toFixed(2);
        }
      },
    },
    inject: ["getData"],
    props: {
      model: {
        type: Array,
        default: () => {
          return [];
        },
      },
      collectGoods: {
        type: Array,
        default: () => {
          return [];
        },
      },
      sellGoods: {
        type: Array,
        default: () => {
          return [];
        },
      },
    },
    data() {
      return {};
    },
    computed: {
      getRankingList() {
        return [
          {
            title: "销售量",
            child: [...this.collectGoods],
          },
          {
            title: "收藏数",
            child: [...this.sellGoods],
          },
        ];
      },
    },
    methods: {
      handleClick(e) {
        window.open(`#/goods-detail?type=${e.type}&id=${e.id}`);
        // this.$router.push({
        //   path: "/goods-detail",
        //   query: { type: e.type, id: e.id },
        // });
        // this.getData();
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .goods-detail-aside {
    ::v-deep {
      .el-tabs {
        .el-tabs__item {
          height: 54px;
          padding: 0;
          padding-right: 0 !important;
          padding-left: 0 !important;
          font-size: $text-x-small;
          line-height: 54px;
          color: $black;

          &:hover {
            color: $green;
          }
        }

        &--border-card {
          & > .el-tabs__header {
            background-color: #d4d4d4;
          }
        }
      }
    }

    .store-aside {
      margin-right: $padding;
      margin-bottom: $padding;

      .goods-item {
        @include center-flex(y);
        cursor: pointer;
        margin-bottom: $padding;
        &:hover {
          background: rgba(0, 0, 0, 0.1);
        }
        &:last-child {
          margin-bottom: 0;
        }

        .el-image {
          width: 80px;
          min-width: 80px;
          height: 80px;
          margin-right: $padding;
        }

        span {
          font-weight: bold;
          color: $error;
        }
      }
    }
  }
</style>
