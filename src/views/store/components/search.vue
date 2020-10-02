<!-- 首页搜索 -->
<template>
  <div class="el-card">
    <div class="search w">
      <logo></logo>
      <div class="store-name">
        <div class="store-name__box">
          <div class="title">{{ info.name }}</div>
          <ul>
            <li v-for="(item, index) in info.data" :key="index">
              <span>{{ item.name }}</span>
              <i>{{ item.value }}</i>
            </li>
          </ul>
        </div>
      </div>
      <div class="search__input">
        <el-input
          v-model="keyWord"
          placeholder="请输入需要搜索的商品名称"
          class="input-with-select"
        >
          <div slot="append">
            <div class="append">
              <div class="search">搜全站</div>
              <div class="search black">搜本店</div>
            </div>
          </div>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
  import Logo from "@/components/logo.vue";
  export default {
    components: {
      Logo,
    },
    data() {
      return {
        keyWord: "",
        info: {
          name: "壹只菜直营店",
          data: [
            {
              name: "描述",
              value: "4.9",
            },
            {
              name: "服务",
              value: "4.9",
            },
            {
              name: "物流",
              value: "4.9",
            },
          ],
        },
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .search {
    @include center-flex(y);

    padding: 0 0 26px 0;
    background: $white;

    .store-name {
      @include center-flex(y);

      &__box {
        display: flex;
        margin-top: 16px;

        .title {
          margin-right: 40px;
          font-size: $text-large;
          font-weight: bold;
          color: $green;
        }

        ul {
          @include center-flex(y);

          margin-top: 7px;

          li {
            margin-right: 32px;
            font-size: $text-small;
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
        margin: 26px 25px 0 46px;
        content: "";
        background: $colorBorder;
      }
    }

    &__input {
      width: 393px;
      margin-top: 26px;
      margin-left: 93px;
    }

    ::v-deep {
      .el-input {
        color: #a0a0a0;

        &__inner {
          position: relative;
          top: 1px;
          height: 80px;
          font-size: $text-small;
          border: 2px solid $green;
        }
      }

      .el-input-group {
        @include center-flex(y);

        &__append {
          padding: 0;
          border-color: transparent;

          .append {
            @include center-flex(y);
          }

          .search {
            display: flex;
            justify-content: center;
            width: 184px;
            min-width: 184px;
            height: 80px;
            padding: 0;
            margin-top: 2px;
            font-size: $text-medium;
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
</style>
