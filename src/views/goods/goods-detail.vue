<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 商品详情
 * @Date: 2020-10-02 18:39:59
 * @LastEditTime: 2020-10-05 22:38:09
-->
<!-- 商品详情 -->
<template>
  <div class="goods-detail">
    <StoreHeader></StoreHeader>
    <div class="w">
      <el-container class="goods-detail__main">
        <el-main class="el-card">
          <div class="imgs">
            <pic-zoom :url="imgs[current]" :scale="3"></pic-zoom>
            <div class="small">
              <swiper
                ref="mySwiper"
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
              <el-image :src="require('@/assets/imgs/stars.png')"></el-image>
              收藏商品（1223人气）
            </div>
          </div>
          <div class="info">
            <div class="info__title">
              四川正宗家用烧菜烧豆腐四川正宗家用烧菜烧豆腐
            </div>
            <div class="info__desc">四川正宗家用烧菜烧豆腐</div>
            <div class="info__money">
              <p>
                价格：
                <i>¥25.00</i>
              </p>
              <p>
                活动价：
                <span>¥18.90</span>
              </p>
            </div>
            <div class="info__sku">
              净含量：
              <ul>
                <li class="active">2.5kg</li>
                <li>5kg</li>
                <li>7.5kg</li>
                <li>10kg</li>
                <li class="disable">15kg</li>
                <li class="disable">20kg</li>
              </ul>
            </div>
            <div class="info__number">
              数量：
              <el-input-number
                v-model="num"
                controls-position="right"
                :min="1"
                :max="10"
                @change="handleChange"
              ></el-input-number>
              件
              <span>库存1200件</span>
            </div>
            <div class="btns">
              <el-button>立即购买</el-button>
              <el-image :src="require('@/assets/imgs/add-cart.png')"></el-image>
            </div>
          </div>
        </el-main>
        <el-aside width="336px">
          <div class="store el-card">
            <div class="store__title">壹只菜直营店</div>
            <ul>
              <li>
                <i>描述</i>
                <span>4.9</span>
              </li>
              <li>
                <i>服务</i>
                <span>4.9</span>
              </li>
              <li>
                <i>物流</i>
                <span>4.9</span>
              </li>
            </ul>
          </div>
          <div class="store__info el-card">
            <div class="compare">
              <ul>
                <li>店铺动态评分</li>
                <li>描述相符：4.9</li>
                <li>服务态度：4.9</li>
                <li>物流服务：4.9</li>
              </ul>
              <ul>
                <li>与同行业相比</li>
                <li>高于 11.44%</li>
                <li>高于 11.44%</li>
                <li>高于 11.44%</li>
              </ul>
            </div>
            <p>掌柜：壹只菜直营店</p>
            <p>所在地：上海</p>
            <div class="btns">
              <el-button>进店逛逛</el-button>
              <el-image
                :src="require('@/assets/imgs/collec-store.png')"
              ></el-image>
            </div>
          </div>
        </el-aside>
      </el-container>
      <el-container class="goods-detail__info">
        <el-aside width="278px">
          <StoreAside></StoreAside>
          <StoreAside title="店内排行">
            <el-tabs type="border-card" stretch>
              <el-tab-pane
                v-for="(item, index) in rankingList"
                :key="index"
                :label="item.title"
              >
                <div
                  v-for="(it, ind) in item.child"
                  :key="ind"
                  class="goods-item"
                >
                  <el-image :src="it.img"></el-image>
                  <div class="right">
                    <p>{{ it.title }}</p>
                    <span>￥{{ it.money }}</span>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </StoreAside>
        </el-aside>
        <el-main>
          <el-tabs type="border-card">
            <el-tab-pane>
              <span slot="label">规格参数</span>
              规格参数
            </el-tab-pane>
            <el-tab-pane label="商品详情">商品详情</el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
  import StoreHeader from "../store/components/store-header.vue";
  import StoreAside from "../store/components/store-aside.vue";
  import PicZoom from "vue-piczoom";
  import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
  import "swiper/swiper-bundle.css";
  export default {
    components: {
      StoreHeader,
      Swiper,
      SwiperSlide,
      StoreAside,
      PicZoom,
    },
    directives: {
      swiper: directive,
    },
    data() {
      return {
        num: 1,
        rankingList: [
          {
            title: "销售量",
            child: [
              {
                img: require("@/assets/imgs/goods2.png"),
                title: "四川正宗家用烧菜烧豆腐",
                money: "24.50",
              },
              {
                img: require("@/assets/imgs/goods3.png"),
                title: "四川正宗家用烧菜烧豆腐",
                money: "24.50",
              },
              {
                img: require("@/assets/imgs/goods3.png"),
                title: "四川正宗家用烧菜烧豆腐",
                money: "24.50",
              },
              {
                img: require("@/assets/imgs/goods3.png"),
                title: "四川正宗家用烧菜烧豆腐",
                money: "24.50",
              },
              {
                img: require("@/assets/imgs/goods3.png"),
                title: "四川正宗家用烧菜烧豆腐",
                money: "24.50",
              },
            ],
          },
          {
            title: "收藏数",
            child: [
              {
                img: require("@/assets/imgs/goods3.png"),
                title: "四川正宗家用烧菜烧豆腐",
                money: "24.50",
              },
              {
                img: require("@/assets/imgs/goods3.png"),
                title: "四川正宗家用烧菜烧豆腐",
                money: "24.50",
              },
              {
                img: require("@/assets/imgs/goods3.png"),
                title: "四川正宗家用烧菜烧豆腐",
                money: "24.50",
              },
              {
                img: require("@/assets/imgs/goods3.png"),
                title: "四川正宗家用烧菜烧豆腐",
                money: "24.50",
              },
              {
                img: require("@/assets/imgs/goods3.png"),
                title: "四川正宗家用烧菜烧豆腐",
                money: "24.50",
              },
              {
                img: require("@/assets/imgs/goods3.png"),
                title: "四川正宗家用烧菜烧豆腐",
                money: "24.50",
              },
            ],
          },
        ],
        current: 0,
        swiperOptions: {
          pagination: {
            el: ".swiper-pagination",
          },
        },
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
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper;
      },
    },
    mounted() {
      this.swiper.slideTo(3, 1000, false);
    },
    methods: {
      handleChange(e) {
        console.log(e);
      },
      handleClickSlide(e) {
        this.current = e;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";
  .goods-detail {
    font-size: $text-medium;
    &__main {
      margin: $padding 0 $padding;
      .el-main {
        margin-right: $padding;
        padding: $padding;
        &.el-card {
          display: flex;
          .imgs {
            width: 440px;
            ::v-deep {
              .magnifier-box {
                img {
                  width: 440px;
                }
                width: 440px;
                height: 440px;
                margin-bottom: $padding;
              }
            }
            .small {
              .el-image {
                width: 80px;
                height: 80px;
              }
            }
            .collec {
              text-align: right;
              padding: 3px 0 0;
              .el-image {
                width: 22px;
                height: 22px;
                margin-right: 5px;
              }
            }
          }
          .info {
            flex: 1;
            margin-left: 24px;
            &__title {
              font-size: 22px;
              font-weight: bold;
            }
            &__money {
              background: #e6e6e6;
              margin: 9px 0 0 0;
              padding: 8px 5px;
              i {
                text-decoration: line-through;
              }
              span {
                font-size: 28px;
                color: $error;
                font-weight: bold;
              }
            }
            &__sku {
              @include center-flex(y);
              flex-wrap: wrap;
              margin-top: 40px;
              ul {
                display: flex;
                flex-wrap: wrap;

                li {
                  width: 103px;
                  height: 54px;
                  border: 1px solid $color3;
                  text-align: center;
                  line-height: 54px;
                  margin-left: 12px;
                  cursor: pointer;
                  &.active {
                    border-color: $error;
                    color: $error;
                  }
                  &.disable {
                    opacity: 0.6;
                    cursor: not-allowed;
                  }
                }
              }
            }
            &__number {
              @include center-flex(y);
              flex-wrap: wrap;
              margin-top: 40px;
              span {
                margin-left: 60px;
              }
              ::v-deep {
                .el-input-number {
                  width: 189px;
                  margin: 0 8px 0 30px;
                  &__increase,
                  &__decrease {
                    border: 1px solid $color3;
                    border-radius: 0;
                  }
                  .el-input__inner {
                    width: 139px;
                    height: 54px;
                    border-color: $color3;
                    border-radius: 0;
                    font-size: $text-medium;
                  }
                }
              }
            }
            .btns {
              margin: 40px 15px 0 40px;
              @include center-flex(y);
              .el-button {
                width: 333px;
                background: $green;
                height: 69px;
                font-size: 22px;
                color: #fff;
                margin-right: 10px;
                border-radius: 0;
              }
            }
          }
        }
      }
      .el-aside {
        .store {
          text-align: center;
          padding: 20px 0 15px;
          margin-bottom: $padding;
          &__title {
            color: $green;
            margin-bottom: 17px;
          }
          ul {
            @include center-flex(y);
            li {
              flex: 1;
              span {
                color: #ff6000;
                font-size: $text-small;
                display: block;
              }
            }
          }

          &__info {
            padding: 30px 10px;
            .compare {
              @include center-flex(y);
              ul {
                flex: 1;
                text-align: center;
                li {
                  margin-bottom: 17px;
                  font-size: $text-small;
                  &:first-child {
                    font-size: $text-medium;
                  }
                }
              }
            }
            p {
              margin: 10px 0 0 11px;
            }
            .btns {
              @include center-flex(y);
              margin: 40px 0 16px 0;
              .el-button {
                width: 153px;
                background: $green;
                height: 55px;
                font-size: 22px;
                color: #fff;
                margin-right: 10px;
                border-radius: 0;
              }
            }
          }
        }
      }
    }
    &__info {
      ::v-deep {
        .el-tabs {
          .el-tabs__item {
            height: 54px;
            line-height: 54px;
            font-size: $text-medium;
            padding: 0;
            color: $black;
            &:hover {
              color: $green;
            }
          }
          &--border-card {
            & > .el-tabs__header {
              background-color: #d4d4d4;
            }
          }
        }
      }
      .store-aside {
        margin-right: $padding;
        margin-bottom: $padding;

        .goods-item {
          @include center-flex(y);
          margin-bottom: $padding;
          font-size: $text-small;
          &:last-child {
            margin-bottom: 0;
          }
          .el-image {
            min-width: 80px;
            width: 80px;
            height: 80px;
            margin-right: $padding;
          }
          span {
            color: $error;
            font-weight: bold;
          }
        }
      }
      .el-main {
        padding: 0;
        ::v-deep {
          .el-tabs {
            &__content {
              padding: $padding;
            }
            .el-tabs__item {
              width: 297px;
              text-align: center;
              position: relative;
              &.is-active {
                color: $green;
                &::after {
                  width: 100%;
                  height: 4px;
                  background: $green;
                  content: "";
                  display: block;
                  position: absolute;
                  top: 0;
                  left: 0;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
