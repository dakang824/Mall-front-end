<!-- 首页搜索 -->
<template>
  <div class="el-card">
    <div class="store-header w">
      <div class="store-header__left">
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
      </div>

      <search :type="2"></search>
    </div>
  </div>
</template>

<script>
  import Logo from "@/components/logo.vue";
  import Search from "@/components/search.vue";
  export default {
    components: {
      Logo,
      Search,
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
            color: #202020;
            text-align: center;
            font-size: 15px;
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
