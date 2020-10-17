<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 店内分类
 * @Date: 2020-10-05 20:56:27
 * @LastEditTime: 2020-10-17 19:06:35
-->
<template>
  <div class="store-aside">
    <ul>
      <li class="title">{{ title }}</li>
      <slot>
        <li
          v-for="(item, index) in model"
          :key="index"
          :class="{ active: index === current }"
          @click="handleChange(index)"
        >
          分类{{ item.name }}
        </li>
      </slot>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "StoreAside",
    components: {},
    props: {
      title: {
        type: String,
        default: "店内分类",
      },
      model: {
        type: Array,
        default: () => {
          return [];
        },
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
