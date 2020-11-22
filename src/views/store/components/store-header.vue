<!-- 首页搜索 -->
<template>
  <div class="el-card">
    <div class="store-header w">
      <div class="store-header__left">
        <logo></logo>
        <div class="store-name">
          <div class="store-name__box">
            <div class="title">{{ getStoreName }}</div>
            <ul>
              <li v-for="(item, index) in getInfo" :key="index">
                <span>{{ item.name }}</span>
                <i>{{ item.value }}</i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <search
        v-model="keyWord"
        :type="2"
        @search="handleSearchAll"
        @search-store="handleSearchStore"
      ></search>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import Logo from "@/components/logo.vue";
  import Search from "@/components/search.vue";
  export default {
    name: "StoreHeader",
    components: {
      Logo,
      Search,
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
      return {
        keyWord: "",
      };
    },
    computed: {
      ...mapState({
        store: (state) => state.goodsDetail.store,
      }),
      getStoreName() {
        return "product" in this.store ? this.store.product.store.name : "";
      },
      getInfo() {
        const { name, desScore, serScore, postStore } =
          "product" in this.store ? this.store.product.store : this.model;
        return [
          {
            name: "描述",
            value: desScore,
          },
          {
            name: "服务",
            value: serScore,
          },
          {
            name: "物流",
            value: postStore,
          },
        ];
      },
    },
    methods: {
      handleSearchAll() {
        const { keyWord } = this;
        this.$router.push({
          path: "/goods-list",
          query: { type: "", condition: keyWord },
        });
      },
      handleSearchStore() {
        const { keyWord } = this;
        this.$router.push({
          path: "/goods-list",
          query: { type: "", condition: keyWord, store_id: this.model.id },
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .store-header {
    &.w {
      @include center-flex(y);
      @include justify();

      position: relative;
      padding: 26px 0;
    }

    background: $white;

    &__left {
      @include center-flex(y);
    }

    .store-name {
      display: flex;

      &__box {
        display: flex;
        margin-top: 20px;

        .title {
          margin-right: 40px;
          font-size: $text-small;
          font-weight: bold;
          color: $green;
        }

        ul {
          display: flex;

          li {
            margin-right: 32px;
            font-size: 15px;
            color: #202020;
            text-align: center;

            span {
              display: block;
            }

            i {
              color: #ff6000;
            }
          }
        }
      }

      &::before {
        display: block;
        width: 1px;
        height: 112px;
        margin: 0 25px 0 46px;
        content: "";
        background: $colorBorder;
      }
    }

    .search--style2 {
      width: 609px;
    }
  }
</style>
