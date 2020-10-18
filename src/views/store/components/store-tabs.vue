<!--
 * @Author: yukang 1172248038@qq.com
 * @Date: 2020-10-02 22:32:19
 * @LastEditTime: 2020-10-18 14:18:12
-->
<!-- 头部筛选 -->
<template>
  <div class="el-card store-tabs">
    <ul>
      <li
        v-for="(item, index) in model"
        :key="index"
        :class="[{ active: index === current }]"
        @click="handleChange(item, index)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "StoreTabs",
    components: {},
    props: {
      model: {
        type: Array,
        default: () => ["综合", "销量", "新品", "价格", "人气"],
      },
    },
    data() {
      return {
        current: 0,
        val: {
          orderBySellCount: "",
          orderByPrice: "",
          orderByViewCount: "",
        },
      };
    },
    methods: {
      handleChange(item, e) {
        this.current = e;
        if (item === "综合") {
          this.val = {
            orderBySellCount: "",
            orderByPrice: "",
            onlineTime: "",
            orderByViewCount: "",
          };
        } else if (item === "销量") {
          this.val = {
            orderBySellCount: 1,
            onlineTime: "",
            orderByPrice: "",
            orderByViewCount: "",
          };
        } else if (item === "新品") {
          this.val = {
            orderBySellCount: "",
            orderByPrice: "",
            onlineTime: 1,
            orderByViewCount: "",
          };
        } else if (item === "价格") {
          this.val = {
            orderBySellCount: "",
            onlineTime: "",
            orderByPrice: 1,
            orderByViewCount: "",
          };
        } else {
          this.val = {
            orderBySellCount: "",
            orderByPrice: "",
            onlineTime: "",
            orderByViewCount: 1,
          };
        }
        this.$emit("change", this.val);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .store-tabs {
    margin: 10px 0;
    color: $colorC;

    .active {
      color: #fff;
      background: $green;
    }

    ul {
      @include center-flex(y);

      li {
        position: relative;
        width: 139px;
        height: 51px;
        line-height: 51px;
        text-align: center;
        cursor: pointer;

        &::after {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          display: block;
          width: 1px;
          height: 25px;
          margin: auto;
          content: "";
          background: #ccc;
        }
      }
    }
  }
</style>
