<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 商品详情轮播图片
 * @Date: 2020-10-05 22:45:14
 * @LastEditTime: 2020-10-15 22:12:13
-->
<template>
  <div class="goods-detail-imgs">
    <div class="imgs">
      <pic-zoom :url="imgs[current]" :scale="2"></pic-zoom>
      <div class="small">
        <swiper
          ref="swiper"
          :options="imgSwiperOptions"
          @click-slide="handleClickSlide"
        >
          <swiper-slide v-for="(item, index) in imgs" :key="index">
            <el-image :src="item"></el-image>
          </swiper-slide>

          <div slot="pagination" class="swiper-pagination"></div>
        </swiper>
      </div>
      <div class="collec">
        <i class="el-icon-star-on"></i>
        收藏商品（1223人气）
      </div>
    </div>
  </div>
</template>

<script>
  import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
  import "swiper/swiper-bundle.css";
  import PicZoom from "vue-piczoom";
  export default {
    components: {
      PicZoom,
      Swiper,
      SwiperSlide,
    },
    directives: {
      swiper: directive,
    },
    data() {
      return {
        current: 0,
        imgSwiperOptions: {
          slidesPerView: 5,
          spaceBetween: 10,
          slideToClickedSlide: true,
        },
        imgs: [
          require("@/assets/imgs/goods2.png"),
          require("@/assets/imgs/imgs2.png"),
          require("@/assets/imgs/imgs3.png"),
          require("@/assets/imgs/imgs4.png"),
          require("@/assets/imgs/imgs5.png"),
          require("@/assets/imgs/goods2.png"),
          require("@/assets/imgs/imgs2.png"),
          require("@/assets/imgs/imgs3.png"),
          require("@/assets/imgs/imgs4.png"),
          require("@/assets/imgs/imgs5.png"),
        ],
      };
    },

    methods: {
      handleClickSlide(e) {
        this.current = e;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .goods-detail-imgs {
    .imgs {
      width: 326px;

      ::v-deep {
        .magnifier-box {
          img {
            width: 326px;
          }

          width: 326px;
          height: 326px;
          margin-bottom: $padding;
        }
      }

      .small {
        .el-image {
          width: 60px;
          height: 60px;
          cursor: pointer;
        }
      }

      .collec {
        padding: 3px 0 0;
        text-align: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .el-icon-star-on {
          font-size: 25px;
          color: $green;
        }
        .el-image {
          width: 22px;
          height: 22px;
          margin-right: 5px;
        }
      }
    }
  }
</style>
