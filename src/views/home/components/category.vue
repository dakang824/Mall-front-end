<!-- 首页类别 -->
<template>
  <div class="category w" @mouseleave="handleMouseleave">
    <el-container>
      <el-aside width="335px" class="category__left">
        <div
          v-for="(item, index) in model"
          :key="index"
          :class="['title', { active: index === current }]"
          @mouseenter="handleMouseenter(index)"
        >
          {{ item.name }}
          <i class="el-icon-arrow-right"></i>
        </div>
      </el-aside>
      <el-main class="category__right">
        <el-carousel trigger="click" height="430px">
          <el-carousel-item v-for="item in 4" :key="item">
            <el-image
              :src="require('@/assets/imgs/login-bg.png')"
              fit="cover"
            ></el-image>
          </el-carousel-item>
        </el-carousel>
        <ul v-if="show" class="category__right__child clearfix">
          <li
            v-for="(item, index) in model[current].subCategoryList"
            :key="index"
          >
            {{ item.name }}
          </li>
        </ul>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      model: {
        type: Array,
        default: () => {
          return [];
        },
      },
    },
    data() {
      return {
        show: false,
        current: null,
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
    font-size: $text-x-small;
    color: $colorA;
    &__left {
      margin-right: 10px;
      border: 2px solid $green;

      .title {
        padding: 19.4px;
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
    }
    ::v-deep {
      .el-carousel {
        .el-carousel__item:nth-child(2n) {
          background-color: #99a9bf;
        }
        .el-carousel__item:nth-child(2n + 1) {
          background-color: #d3dce6;
        }
        .is-active {
          .el-carousel__button {
            background-color: $green;
          }
        }
        .el-carousel__button {
          width: 13px;
          height: 13px;
          border-radius: 50px;
        }
        &__item {
          .el-image {
            height: 452px;
          }
        }
        &__arrow {
          background-color: rgba(0, 0, 0, 0.5);
        }
        &__arrow:hover {
          background-color: #333;
        }
      }
    }
  }
</style>
