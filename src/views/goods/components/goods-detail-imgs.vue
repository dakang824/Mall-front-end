<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 商品详情轮播图片
 * @Date: 2020-10-05 22:45:14
 * @LastEditTime: 2020-10-17 17:15:34
-->
<template>
  <div class="goods-detail-imgs">
    <div class="imgs">
      <pic-zoom
        :url="model.pics[current].path | imgBaseUrl"
        :scale="2"
      ></pic-zoom>
      <div class="small">
        <swiper
          ref="swiper"
          :options="imgSwiperOptions"
          @click-slide="handleClickSlide"
        >
          <swiper-slide v-for="(item, index) in model.pics" :key="index">
            <el-image :src="item.path | imgBaseUrl"></el-image>
          </swiper-slide>

          <div slot="pagination" class="swiper-pagination"></div>
        </swiper>
      </div>
      <div class="collec" @click="handleCollect">
        <i :class="value ? 'el-icon-star-on' : 'el-icon-star-off'"></i>
        收藏商品（{{ model.collectCount }}人气）
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
    props: {
      model: {
        type: Object,
        default: () => {
          return {};
        },
      },
      value: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        current: 0,
        imgSwiperOptions: {
          slidesPerView: 5,
          spaceBetween: 10,
          slideToClickedSlide: true,
        },
      };
    },
    methods: {
      handleClickSlide(e) {
        this.current = e;
      },
      handleCollect() {
        const { id } = this.model;
        this.$utils.verifyLogin({
          success: async (e) => {
            const res = await this.$store.dispatch(
              `goodsDetail/${this.value ? "prodUnCollect" : "prodCollect"}`,
              {
                prodId: id,
              }
            );
            this.$emit("input", !this.value);
            this.$message({
              message: this.value ? "取消成功" : "收藏成功",
              type: this.value ? "warning" : "success",
            });
          },
        });
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
        cursor: pointer;
        i {
          color: $green;
          font-size: 20px;
          margin-right: 5px;
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
