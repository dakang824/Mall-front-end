<!-- 首页类别 -->
<template>
  <div class="category w" @mouseleave="handleMouseleave">
    <el-container>
      <el-aside width="335px" class="category__left">
        <div
          v-for="(item, index) in categoryList"
          :key="index"
          :class="['title', { active: index === current }]"
          @mouseenter="handleMouseenter(index)"
        >
          {{ item.name }}
          <i class="el-icon-arrow-right"></i>
        </div>
      </el-aside>
      <el-main class="category__right">
        <el-carousel trigger="click" height="452px">
          <el-carousel-item v-for="item in 4" :key="item">
            <el-image
              :src="require('@/assets/imgs/login-bg.png')"
              fit="cover"
            ></el-image>
          </el-carousel-item>
        </el-carousel>
        <ul v-if="show" class="category__right__child clearfix">
          <li v-for="(item, index) in categoryList[current].child" :key="index">
            {{ item }}
          </li>
        </ul>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        show: false,
        current: null,
        categoryList: [
          {
            name: "蔬菜",
            child: [
              "叶菜类",
              "豆制品",
              "西红柿/茄果类",
              "花菜/球茎类",
              "土豆/根茎类",
              "菌菇类",
              "豆类/芽苗类",
            ],
          },
          {
            name: "肉禽蛋",
            child: [
              "猪肉",
              "鸡鸭禽",
              "鸡蛋",
              "牛肉",
              "羊肉",
              "腌制/腊肉",
              "牛排",
            ],
          },
          {
            name: "海鲜水产",
            child: [
              "叶菜类",
              "豆制品",
              "西红柿/茄果类",
              "花菜/球茎类",
              "土豆/根茎类",
              "菌菇类",
              "豆类/芽苗类",
            ],
          },
          {
            name: "速冻食品",
            child: [
              "猪肉",
              "鸡鸭禽",
              "鸡蛋",
              "牛肉",
              "羊肉",
              "腌制/腊肉",
              "牛排",
            ],
          },
          {
            name: "粮油调味",
            child: [
              "叶菜类",
              "豆制品",
              "西红柿/茄果类",
              "花菜/球茎类",
              "土豆/根茎类",
              "菌菇类",
              "豆类/芽苗类",
            ],
          },
          {
            name: "菜系",
            child: [
              "猪肉",
              "鸡鸭禽",
              "鸡蛋",
              "牛肉",
              "羊肉",
              "腌制/腊肉",
              "牛排",
            ],
          },
          {
            name: "设备",
            child: [
              "叶菜类",
              "豆制品",
              "西红柿/茄果类",
              "花菜/球茎类",
              "土豆/根茎类",
              "菌菇类",
              "豆类/芽苗类",
            ],
          },
        ],
      };
    },
    methods: {
      handleMouseleave() {
        this.show = false;
        this.current = null;
      },
      handleMouseenter(e) {
        this.show = true;
        this.current = e;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .category {
    margin-top: 10px;
    font-size: $text-large;
    color: $colorA;

    ::v-deep .el-carousel__arrow {
      background-color: rgba(0, 0, 0, 0.5);
    }

    ::v-deep .el-carousel__arrow:hover {
      background-color: #333;
    }

    &__left {
      margin-right: 10px;
      border: 2px solid $green;

      .title {
        padding: 14px;
        text-align: center;
        cursor: pointer;
        background: #fff;

        @include justify();
        @include center-flex(y);

        &::before {
          content: "";
        }

        &:hover,
        &.active {
          color: #fff;
          background: $colorBg;
        }

        .el-icon-arrow-right {
          font-size: 22px;
        }
      }
    }

    &__right {
      position: relative;
      padding: 0;

      &__child {
        position: absolute;
        top: 0;
        z-index: 99;
        width: 50%;
        height: 100%;
        padding: 20px 0;
        background: $white;

        li {
          float: left;
          min-width: 33.333%;
          padding: 10px;
          text-align: center;

          &:hover {
            color: #fff;
            cursor: pointer;
            background: $colorBg;
          }
        }
      }

      .el-carousel__item {
        .el-image {
          height: 452px;
        }
      }

      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }

      .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
      }
    }
  }
</style>
