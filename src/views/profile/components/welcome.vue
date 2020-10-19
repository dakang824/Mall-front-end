<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 欢迎页面
 * @Date: 2020-10-19 23:03:17
 * @LastEditTime: 2020-10-20 00:06:58
-->
<template>
  <div class="welcome">
    <el-container>
      <el-main>
        <div class="row">
          <div class="el-card">12</div>
          <div class="el-card">12</div>
          <div class="block">
            <div class="row">
              <div class="el-card">12</div>
              <div class="el-card">12</div>
            </div>
            <div class="row">
              <div class="el-card">12</div>
              <div class="el-card">12</div>
            </div>
          </div>
        </div>
      </el-main>
      <el-aside width="230px" class="el-card">
        <div class="title">我的购物车</div>
        <div
          v-for="(it, ind) in store.cartItems"
          :key="ind"
          class="goods-item"
          @click="handleClick(it)"
        >
          <el-image
            :src="it.product.pics[0].path | imgBaseUrl"
            fit="cover"
          ></el-image>
          <div class="right">
            <p>{{ it.product.name }}</p>
            <span>￥{{ it.product.specList | minPrice }}</span>
          </div>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    name: "Welcome",
    components: {},
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
    data() {
      return {
        model: "",
      };
    },
    computed: {
      ...mapState({
        store: (state) => state.profileWelcome.store,
      }),
    },
    async created() {
      await this.$store.dispatch("profileWelcome/getMyInfo", {});
      this.model = this.store;
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
  .welcome {
    .el-main {
      > .row {
        > .el-card:first-child {
          width: 260px;
        }
        > .el-card:nth-child(2) {
          width: 190px;
        }
      }
      .row {
        @include justify();
        .block {
          .el-card {
            width: 120px;
            &:first-child,
            &:nth-child(2) {
              margin-bottom: $padding;
            }
            &:nth-child(2n) {
              margin-left: $padding;
            }
          }
        }
      }
    }
    .el-aside {
      padding: $padding 0;
      margin-left: $padding;
      .title {
        @include center-flex(y);
        margin: 0 0 $padding $padding;
        &::before {
          display: block;
          width: 2px;
          height: 14px;
          margin-right: 14px;
          content: "";
          background: $green;
        }
      }
      .goods-item {
        display: flex;
        cursor: pointer;
        padding: 5px $padding;
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
