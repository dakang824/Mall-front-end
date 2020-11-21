<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 店内分类
 * @Date: 2020-10-05 20:56:27
 * @LastEditTime: 2020-11-21 14:29:49
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
          @click="handleChange(index, item.id)"
        >
          {{ item.name }}
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
      currentIndex: {
        type: [String, Number],
        default: "",
      },
    },
    data() {
      return {
        current: "",
      };
    },
    created() {
      this.current = this.currentIndex;
    },
    methods: {
      handleChange(e, id) {
        this.current = e;
        this.$emit("click", id);
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
          &.active {
            border-bottom: 2px solid #05b85e;
          }
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
