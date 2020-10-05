<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 店内分类
 * @Date: 2020-10-05 20:56:27
 * @LastEditTime: 2020-10-05 21:42:03
-->
<template>
  <div class="store-aside">
    <ul>
      <li class="title">{{ title }}</li>
      <slot>
        <li
          v-for="(item, index) in 7"
          :key="index"
          :class="{ active: index === current }"
          @click="handleChange(index)"
        >
          分类{{ item }}
        </li>
      </slot>
    </ul>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      title: {
        type: String,
        default: "店内分类",
      },
    },
    data() {
      return {
        current: 0,
      };
    },
    methods: {
      handleChange(e) {
        this.current = e;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .store-aside {
    ul {
      li {
        box-sizing: border-box;
        padding: 16px 0;
        font-size: $text-medium;
        text-align: center;
        cursor: pointer;
        background: #fff;
        border-bottom: 1px dashed $colorBorder;

        &.active {
          color: #282828;
          border: 2px solid $green;
        }

        &:last-child {
          border-bottom: 0;
        }

        &.title {
          color: #fff;
          background: #5a5a5a;
          border-bottom: 0;
        }
      }
    }
  }
</style>
