<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 商品详情
 * @Date: 2020-10-02 18:39:59
 * @LastEditTime: 2020-10-05 23:25:52
-->
<!-- 商品详情 -->
<template>
  <div class="goods-detail">
    <StoreHeader />
    <div class="w">
      <el-container class="goods-detail__main">
        <el-main class="el-card">
          <GoodsDetailImgs />
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
          <GoodsDetailStore />
        </el-aside>
      </el-container>
      <el-container class="goods-detail__info">
        <el-aside width="278px"><GoodsDetailAside /></el-aside>
        <el-main><GoodsDetailInfo /></el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
  import StoreHeader from "../store/components/store-header.vue";
  import GoodsDetailAside from "./components/goods-detail-aside.vue";
  import GoodsDetailImgs from "./components/goods-detail-imgs.vue";
  import GoodsDetailStore from "./components/goods-detail-store.vue";
  import GoodsDetailInfo from "./components/goods-detail-info.vue";
  export default {
    components: {
      StoreHeader,
      GoodsDetailAside,
      GoodsDetailImgs,
      GoodsDetailStore,
      GoodsDetailInfo,
    },

    data() {
      return {
        num: 1,
      };
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper;
      },
    },

    methods: {
      handleChange(e) {
        console.log(e);
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
    }
    &__info {
      .el-main {
        padding: 0;
      }
    }
  }
</style>
