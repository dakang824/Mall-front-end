<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 空组件
 * @Date: 2020-10-29 14:48:12
 * @LastEditTime: 2020-10-29 15:31:27
-->
<template>
  <div
    v-if="show"
    class="empty"
    :style="{
      marginTop: marginTop + 'px',
    }"
  >
    <el-image
      :src="require('@/assets/imgs/' + icons[icon])"
      :style="{ width: imgWidth + 'px', height: imgWidth + 'px' }"
    ></el-image>
    <p :style="{ fontSize: fontSize + 'px' }">{{ text }}</p>
    <div class="u-slot-wrap">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Empty",
    props: {
      // 图标路径
      icon: {
        type: String,
        default: "data",
      },
      // 提示文字
      text: {
        type: String,
        default: "",
      },
      // 文字大小，单位rpx
      fontSize: {
        type: [String, Number],
        default: 15,
      },
      //  图标宽度，单位rpx
      imgWidth: {
        type: [String, Number],
        default: 110,
      },
      // 图标高度，单位rpx
      imgHeight: {
        type: [String, Number],
        default: "auto",
      },
      // 是否显示组件
      show: {
        type: Boolean,
        default: true,
      },
      // 组件距离上一个元素之间的距离
      marginTop: {
        type: [String, Number],
        default: 0,
      },
    },
    data() {
      return {
        icons: {
          car: "cart.png",
          search: "search.png",
          address: "address.png",
          order: "order.png",
          coupon: "没有优惠券",
          favor: "favor.png",
          history: "无历史记录",
          news: "无新闻列表",
          message: "消息列表为空",
          list: "列表为空",
          data: "数据为空",
        },
      };
    },
  };
</script>

<style scoped lang="scss">
  @import "@/assets/scss/settings";

  .empty {
    @include center-flex(y);

    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #c0c4cc;
    text-align: center;
  }

  .u-image {
    margin-bottom: 20rpx;
  }

  .u-slot-wrap {
    @include center-flex(y);

    align-items: center;
    justify-content: center;
    margin-top: 20rpx;
  }
</style>
