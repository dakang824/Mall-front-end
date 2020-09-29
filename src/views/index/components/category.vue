<!-- 首页类别 -->
<template>
  <div class="category w" @mouseleave="show = false">
    <el-container>
      <el-aside width="300px" class="category__left">
        <div
          v-for="(item, index) in categoryList"
          :key="index"
          class="title"
          @mousemove="onmouseover(index)"
        >
          <i></i>
          {{ item.name }}
          <i class="el-icon-arrow-right"></i>
        </div>
      </el-aside>
      <el-main class="category__right">
        <el-carousel trigger="click" height="400px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
        <ul v-show="show" class="category__right__child clearfix">
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
        current: 0,
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
        ],
      };
    },
    methods: {
      onmouseover(e) {
        this.show = true;
        this.current = e;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .category {
    display: flex;
    justify-content: space-between;
    &__left {
      color: #fff;
      background: rgba(153, 153, 153, 1);
      .title {
        text-align: center;
        padding: 14px;
        background: rgba(153, 153, 153, 1);
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        justify-items: center;
        border-bottom: 1px solid #ccc;
        &:hover {
          background: rgba(153, 153, 153, 0.5);
          color: #333;
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
        background: #fff;
        width: 50%;
        height: 100%;
        padding: 20px 0;
        li {
          min-width: 33.333%;
          padding: 10px;
          float: left;
          text-align: center;
          &:hover {
            background: rgba(153, 153, 153, 0.5);
            cursor: pointer;
          }
        }
      }
      .el-carousel__item {
        h3 {
          color: #475669;
          font-size: 14px;
          opacity: 0.75;
          line-height: 400px;
          margin: 0;
          text-align: center;
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
