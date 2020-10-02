<template>
  <div class="goods-list">
    <Search></Search>
    <div class="box w">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>蔬菜</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="screen el-card">
        <div v-for="(item, index) in list" :key="index" class="screen__row">
          <span>{{ item.title }}：</span>
          <ul>
            <li v-for="(it, ind) in item.value" :key="ind">{{ it }}</li>
          </ul>
        </div>
      </div>
      <div class="el-card header">
        <ul>
          <li
            v-for="(item, index) in type"
            :key="index"
            :class="[{ active: index === current }]"
            @click="handleChange(index)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="el-card box clearfix">
        <div
          v-for="(item, index) in goodList"
          :key="index"
          class="fl goods-item"
        >
          <GoodsItem :model="item"></GoodsItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Search from "../home/components/search.vue";
  import GoodsItem from "@/components/goods-item.vue";
  export default {
    name: "GoodsList",
    components: {
      Search,
      GoodsItem,
    },
    data() {
      return {
        current: 0,
        type: ["综合", "销量", "价格", "人气"],
        goodList: [
          {
            img: require("@/assets/imgs/goods3.png"),
            title: "麻婆豆腐川味麻婆豆腐",
            assess: "1678",
            collect: 2,
            money: 15.6,
            sell: 213,
          },
          {
            img: require("@/assets/imgs/goods4.png"),
            title: "麻婆豆腐川味麻婆豆腐",
            assess: "1678",
            collect: 2,
            money: 15.6,
            sell: 213,
          },
          {
            img: require("@/assets/imgs/goods5.png"),
            title: "麻婆豆腐川味麻婆豆腐",
            aassess: "1678",
            collect: 2,
            money: 15.6,
            sell: 213,
          },
          {
            img: require("@/assets/imgs/goods3.png"),
            title: "麻婆豆腐川味麻婆豆腐",
            assess: "1678",
            collect: 2,
            money: 15.6,
            sell: 213,
          },
          {
            img: require("@/assets/imgs/goods4.png"),
            title: "麻婆豆腐川味麻婆豆腐",
            assess: "1678",
            collect: 2,
            money: 15.6,
            sell: 213,
          },
          {
            img: require("@/assets/imgs/goods5.png"),
            title: "麻婆豆腐川味麻婆豆腐",
            assess: "1678",
            collect: 2,
            money: 15.6,
            sell: 213,
          },
          {
            img: require("@/assets/imgs/goods4.png"),
            title: "麻婆豆腐川味麻婆豆腐",
            assess: "1678",
            collect: 2,
            money: 15.6,
            sell: 213,
          },
          {
            img: require("@/assets/imgs/goods5.png"),
            title: "麻婆豆腐川味麻婆豆腐",
            assess: "1678",
            collect: 2,
            money: 15.6,
            sell: 213,
          },
          {
            img: require("@/assets/imgs/goods4.png"),
            title: "麻婆豆腐川味麻婆豆腐",
            assess: "1678",
            collect: 2,
            money: 15.6,
            sell: 213,
          },
          {
            img: require("@/assets/imgs/goods5.png"),
            title: "麻婆豆腐川味麻婆豆腐",
            assess: "1678",
            collect: 2,
            money: 15.6,
            sell: 213,
          },
        ],

        list: [
          {
            title: "分类",
            value: [
              "叶菜类",
              "西红柿/茄果类",
              "花菜/球茎类",
              "土豆/根茎类",
              "菌菇类",
              "豆类/芽苗类",
              "葱姜蒜椒",
              "豆制品",
            ],
          },

          {
            title: "产地",
            value: ["中国大陆", "越南", "希腊", "泰国", "马来西亚", "不丹"],
          },
        ],
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
  .goods-list {
    font-size: $text-medium;
    .el-breadcrumb {
      padding: 20px 0;
      font-size: $text-medium;
    }
    .screen {
      &__row {
        color: $colorC;
        @include center-flex(y);
        border-bottom: 1px dashed #ccc;
        &:last-child {
          border-color: transparent;
        }
        span {
          min-width: 150px;
          color: #808080;
          text-align: center;
          padding: 10px 0;
        }
        ul {
          @include center-flex(y);

          li {
            margin-right: 20px;
          }
        }
      }
      // @include justify();
    }
    .header {
      margin: 10px 0;
      color: $colorC;
      .active {
        background: $green;
        color: #fff;
      }
      ul {
        @include center-flex(y);
        li {
          cursor: pointer;
          width: 139px;
          height: 51px;
          line-height: 51px;
          text-align: center;
          position: relative;
          &::after {
            content: "";
            height: 25px;
            width: 1px;
            background: #ccc;
            display: block;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
          }
        }
      }
    }
    .box {
      padding: 30px 30px 0 30px;
      margin-bottom: 10px;
      > .goods-item {
        margin-right: 50px;
        &:nth-child(5n) {
          margin-right: 0;
        }
        margin-bottom: 50px;
      }
    }
  }
</style>
