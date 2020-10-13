<!--
 * @Author: yukang 1172248038@qq.com
 * @Date: 2020-10-02 22:32:19
 * @LastEditTime: 2020-10-14 00:04:50
-->
<!-- 头部筛选 -->
<template>
  <div class="el-card store-tabs">
    <ul>
      <li
        v-for="(item, index) in type"
        :key="index"
        :class="[{ active: index === current }]"
        @click="handleChange(index)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        current: 0,
        type: ["综合", "销量", "价格", "人气"],
        val: {
          orderBySellCount: "",
          orderByPrice: "",
          orderByViewCount: "",
        },
      };
    },
    methods: {
      handleChange(e) {
        this.current = e;
        if (e === 0) {
          this.val = {
            orderBySellCount: "",
            orderByPrice: "",
            orderByViewCount: "",
          };
        } else if (e === 1) {
          this.val = {
            orderBySellCount: 1,
            orderByPrice: "",
            orderByViewCount: "",
          };
        } else if (e === 2) {
          this.val = {
            orderBySellCount: "",
            orderByPrice: 1,
            orderByViewCount: "",
          };
        } else {
          this.val = {
            orderBySellCount: "",
            orderByPrice: "",
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
