<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 搜索插件
 * @Date: 2020-10-03 20:19:16
 * @LastEditTime: 2020-10-15 00:09:56
-->
<template>
  <div class="search" :class="'search--style' + type">
    <div class="search__input">
      <el-input
        v-model="keyWord"
        placeholder="请输入需要搜索的商品名称"
        class="input-with-select"
        @change="hanldeChange"
      >
        <div slot="append">
          <el-image
            v-if="type === 1"
            :src="require('@/assets/imgs/search-icon.png')"
            class="search"
            fit="cover"
          ></el-image>

          <div v-if="type === 2" class="append">
            <div class="search">搜全站</div>
            <div class="search black">搜本店</div>
          </div>
        </div>
      </el-input>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      value: {
        type: String,
        default: "",
      },
      type: {
        type: Number,
        default: 1,
      },
    },
    data() {
      return {
        keyWord: "",
      };
    },
    computed: {
      getValue() {
        return this.value;
      },
    },
    methods: {
      hanldeChange(e) {
        this.$emit("input", e);
        this.$emit("search");
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .search {
    background: $white;

    ::v-deep {
      .el-input {
        color: #a0a0a0;

        &__inner {
          position: relative;
          top: 1px;
          height: 73px;
          border: 2px solid $green;
        }
      }

      .el-input-group {
        &__append {
          padding: 0;
          background-color: transparent;
          border-color: transparent;

          .search {
            width: 190px;
            height: 73px;
            padding: 0;
            cursor: pointer;
          }
        }
      }
    }

    &.search--style1 {
      .search__input {
        width: 813px;
      }
    }

    &.search--style2 {
      .search__input {
        width: 353px;
      }

      ::v-deep {
        .el-input-group {
          @include center-flex(y);

          &__append {
            .append {
              @include center-flex(y);
            }

            .search {
              display: flex;
              justify-content: center;
              width: 128px;
              min-width: 128px;
              margin-top: 2px;
              line-height: 73px;
              color: #fff;
              cursor: pointer;
              background: $green;

              &.black {
                background: #3f3f3f;
              }
            }
          }
        }
      }
    }
  }
</style>
