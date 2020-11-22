<!-- 首页类别 -->
<template>
  <div class="category w" @mouseleave="handleMouseleave">
    <el-container>
      <el-aside width="264px" class="category__left">
        <div
          v-for="(item, index) in model"
          :key="index"
          :class="['title', { active: index === current }]"
          @mouseenter="handleMouseenter(index)"
          @click="handleItemClick(item.id)"
        >
          {{ item.name }}
          <i class="el-icon-arrow-right"></i>
        </div>
      </el-aside>
      <el-main class="category__right">
        <el-carousel trigger="click" height="430px">
          <el-carousel-item v-for="item in banner" :key="item.id">
            <a :href="item.url">
              <el-image
                :src="item.pic_path | imgBaseUrl"
                fit="contain"
                style="width: 100%; height: 430px;"
              ></el-image>
            </a>
          </el-carousel-item>
        </el-carousel>
        <ul
          v-if="show"
          class="category__right__child clearfix"
          style=" height: 430px; overflow: auto;"
        >
          <li
            v-for="(item, index) in model[current].subCategoryList"
            :key="index"
            @click="handleClick(item)"
          >
            {{ item.name }}
          </li>
        </ul>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import { mapState } from "vuex";
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
    computed: mapState({
      banner: (state) => state.home.banner,
    }),
    methods: {
      handleClick(item) {
        this.$emit("click", {
          cate_id: this.model[this.current].id,
          sub_cate_id: item.id,
        });
      },
      handleItemClick(cate_id) {
        this.$emit("click", {
          cate_id,
          sub_cate_id: "",
        });
      },
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
      overflow: hidden;

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
