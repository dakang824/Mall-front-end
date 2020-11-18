<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 商品详情轮播图片
 * @Date: 2020-10-05 22:45:14
 * @LastEditTime: 2020-11-18 23:47:07
-->
<template>
  <div class="goods-detail-imgs">
    <div class="imgs">
      <imgZoom
        :src="model.pics[current].path | imgBaseUrl"
        width="326"
        height="326"
        :bigsrc="model.pics[current].path | imgBaseUrl"
        :configs="configs"
      ></imgZoom>
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
  import imgZoom from "vue2.0-zoom";
  export default {
    components: {
      Swiper,
      imgZoom,
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
        configs: {
          width: 326,
          height: 326,
          maskWidth: 150,
          maskHeight: 150,
          maskColor: "#000",
          maskOpacity: 0.4,
        },
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
            const data = this.model;
            data.collectCount += this.value ? -1 : 1;
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

      .small {
        margin-top: $padding;
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
