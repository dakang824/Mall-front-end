<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 商品详情
 * @Date: 2020-10-02 18:39:59
 * @LastEditTime: 2020-10-16 23:53:53
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
            <div class="info__desc">
              <span v-if="type == 4">
                <i>难度：有挑战</i>
                <i>时长：10-30分钟</i>
              </span>
              <span v-else>四川正宗家用烧菜烧豆腐</span>
            </div>
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
            <div v-if="type == 4" class="info__formula">
              <span>菜谱配方：</span>
              <div>
                <ul v-for="(item, index) in formula" :key="index">
                  <li v-for="(it, ind) in item" :key="ind">{{ it }}</li>
                </ul>
              </div>
            </div>
            <div v-else>
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
            </div>

            <div class="btns">
              <el-button>立即购买</el-button>
              <el-image :src="require('@/assets/imgs/add-cart.png')"></el-image>
            </div>
          </div>
        </el-main>
        <el-aside width="250px">
          <GoodsDetailStore />
        </el-aside>
      </el-container>
      <el-container class="goods-detail__info">
        <el-aside v-if="type != 4" width="228px">
          <GoodsDetailAside />
        </el-aside>
        <el-main>
          <GoodsDetailInfo :model="detailInfo" />
          {{ detailInfo }}
        </el-main>
      </el-container>
    </div>
    {{ store }}
  </div>
</template>

<script>
  import { mapState } from "vuex";
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
        type: this.$route.query.type,
        formula: [
          ["序号", 1, 2, 3, 4],
          ["食材", "尖椒", "猪肉", "其他", "其他"],
          ["重量(份)", "500g", "1kg", "500g", "500g"],
        ],
        detailInfo: [],
      };
    },
    computed: {
      ...mapState({
        store: (state) => state.goodsDetail.store,
      }),
      swiper() {
        return this.$refs.mySwiper.$swiper;
      },
    },
    async mounted() {
      await this.$store.dispatch("goodsDetail/getProductDetail", {
        prod_id: this.$route.query.id,
      });
      const { product } = this.store;
      if (this.type == 4) {
        this.detailInfo = [
          {
            name: "烹饪步骤",
            imgs: product.introPics,
          },
        ];
      }
    },
    created() {},
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
    &__main {
      margin: $padding 0 $padding;

      .el-main {
        padding: $padding;
        margin-right: $padding;

        &.el-card {
          display: flex;

          .info {
            flex: 1;
            margin-left: 15px;

            &__title {
              font-size: 16px;
              font-weight: bold;
            }
            &__desc {
              i {
                margin-right: 30px;
              }
            }
            &__formula {
              display: flex;
              margin: 50px 0 44px 0;
              ul {
                @include center-flex(y);
                li {
                  width: 80px;
                  height: 38px;
                  line-height: 38px;
                  text-align: center;
                  border-top: 1px solid $colorC;
                  border-left: 1px solid $colorC;
                  &:last-child {
                    border-right: 1px solid $colorC;
                  }
                  &:first-child {
                    background: #e2e2e2;
                  }
                }
                &:last-child {
                  border-bottom: 1px solid $colorC;
                }
              }
            }
            &__money {
              padding: 8px 10px;
              margin: 9px 0 0 0;
              background: #e6e6e6;

              i {
                text-decoration: line-through;
              }

              span {
                font-size: 23px;
                font-weight: bold;
                color: $error;
              }
            }

            &__sku {
              @include center-flex(y);

              flex-wrap: wrap;
              margin-top: 30px;

              ul {
                display: flex;
                flex-wrap: wrap;

                li {
                  width: 77px;
                  height: 40px;
                  margin-right: 9px;
                  line-height: 40px;
                  text-align: center;
                  cursor: pointer;
                  border: 1px solid $color3;

                  &.active {
                    color: $error;
                    border-color: $error;
                  }

                  &.disable {
                    cursor: not-allowed;
                    opacity: 0.6;
                  }
                }
              }
            }

            &__number {
              @include center-flex(y);

              flex-wrap: wrap;
              margin-top: 40px;

              span {
                margin-left: 30px;
              }

              ::v-deep {
                .el-input-number {
                  width: 150px;
                  margin: 0 8px 0 15px;

                  &__increase,
                  &__decrease {
                    border: 1px solid $color3;
                    border-radius: 0;
                  }

                  .el-input__inner {
                    width: 104px;
                    height: 40px;
                    border-color: $color3;
                    border-radius: 0;
                  }
                }
              }
            }

            .btns {
              margin: 40px 15px 0 40px;

              @include center-flex(y);

              .el-button {
                width: 248px;
                height: 52px;
                margin-right: 10px;
                font-size: 22px;
                color: #fff;
                background: $green;
                border-radius: 0;
              }
              .el-image {
                width: 248px;
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
