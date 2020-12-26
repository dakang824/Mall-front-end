<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 商品详情
 * @Date: 2020-10-02 18:39:59
 * @LastEditTime: 2020-12-26 15:37:50
-->
<!-- 商品详情 -->
<template>
  <div class="goods-detail">
    <StoreHeader />
    <div class="w">
      <el-container class="goods-detail__main">
        <el-main v-loading="loading" class="el-card">
          <div style="width: 326px">
            <GoodsDetailImgs v-model="store.prodCollected" :model="product" />
          </div>

          <div class="info">
            <div class="info__title">
              {{ product.name }}
            </div>
            <div class="info__desc">
              <span v-if="type == 4">
                <i>{{ product.summary }}</i>
              </span>
              <span v-else>四川正宗家用烧菜烧豆腐</span>
            </div>
            <div class="info__money">
              <!-- <p>
                价格：
                <i>¥{{ getPrice.oriPrice }}</i>
              </p> -->
              <p>
                售价：
                <span>¥{{ getPrice.sellPrice }}</span>
              </p>
              <p>
                批发价：
                <b style="color: #f00">¥{{ getPrice.w_price }}</b>
              </p>
              <p>批发数量：{{ getPrice.w_num }}</p>
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
                规格：
                <ul>
                  <li
                    v-for="(item, index) in product.specList"
                    :key="index"
                    :class="{ active: index === specCurrent }"
                    @click="handleChangeSpecCurrent(index)"
                  >
                    {{ item.name }}
                  </li>
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
              <el-button @click="handleBuy">立即购买</el-button>
              <el-image
                :src="require('@/assets/imgs/add-cart.png')"
                @click="handleAddCart"
              ></el-image>
            </div>
          </div>
        </el-main>
        <el-aside v-loading="loading" width="250px">
          <GoodsDetailStore :model="product" />
        </el-aside>
      </el-container>
      <el-container v-loading="loading" class="goods-detail__info">
        <el-aside v-if="type != 4" width="228px">
          <GoodsDetailAside
            :model="storeSubCate"
            :collect-goods="collectGoods"
            :sell-goods="sellGoods"
            :store-id="product.storeId"
          />
        </el-aside>
        <el-main>
          <GoodsDetailInfo :model="introPics" />
        </el-main>
      </el-container>
    </div>
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
    provide() {
      return {
        getData: this.getData,
      };
    },
    data() {
      return {
        loading: true,
        num: 1,
        specCurrent: 0,
        type: "",
        formula: [["序号"], ["食材"], ["重量(份)"]],
        introPics: [],
        storeSubCate: [],
        collectGoods: [],
        sellGoods: [],
        product: {
          specList: [],
        },
        oriPrice: "",
      };
    },
    computed: {
      ...mapState({
        store: (state) => state.goodsDetail.store,
        items: (state) => state.cart.items,
      }),
      swiper() {
        return this.$refs.mySwiper.$swiper;
      },
      getPrice() {
        let data = {},
          { specList } = this.product;
        if (specList.length) {
          data = specList.sort((a, b) => a.sellPrice - b.sellPrice)[0];
        }
        return data;
      },
    },
    mounted() {},
    created() {},
    activated() {
      this.getData();
    },
    methods: {
      async handleBuy() {
        this.$utils.verifyLogin({
          success: async (e) => {
            const store = JSON.parse(JSON.stringify(this.store));
            store.product.specList = [this.product.specList[this.specCurrent]];
            store.unitPrice =
              store.product.specList[0].w_num &&
              store.product.specList[0].w_num <= this.num
                ? store.product.specList[0].w_price
                : store.product.specList[0].sellPrice;
            store.quantity = this.num;
            store.itemId = store.product.id;
            store.checked = true;
            const postData = await this.$store.dispatch("pay/getData", [
              { data: [store] },
            ]);
            this.$router.push({
              name: "Pay",
              params: {
                obj: JSON.stringify(postData),
              },
            });
          },
        });
      },
      handleChange(e) {
        this.num = e;
      },
      handleChangeSpecCurrent(e) {
        this.specCurrent = e;
      },
      async getData() {
        this.loading = true;
        await this.$store.dispatch("goodsDetail/getProductDetail", {
          prod_id: this.$route.query.id,
        });
        const {
          product,
          storeSubCate,
          storeProdsOrderBySellCount: sellGoods,
          storeProdsOrderByCollectCount: collectGoods,
        } = this.store;
        this.product = product;
        this.storeSubCate = storeSubCate;
        this.sellGoods = sellGoods;
        this.collectGoods = collectGoods;
        this.type = product.type;
        if (this.type == 4) {
          this.introPics = [
            {
              name: "烹饪步骤",
              imgs: product.introPics,
            },
          ];
          product.prodRecipes.map((item, index) => {
            this.formula[0].push(index + 1);
            this.formula[1].push(item.name);
            this.formula[2].push(item.weight);
          });
        } else {
          this.introPics = [
            {
              name: "规格参数",
              imgs: product.introPics,
            },
            {
              name: "商品详情",
              imgs: product.introPics,
            },
          ];
        }
        this.reload();
      },
      reload() {
        this.$nextTick(() => {
          setTimeout(() => {
            this.loading = false;
          }, 300);
        });
      },
      handleAddCart() {
        this.$utils.verifyLogin({
          success: async (e) => {
            const data = this.items.find(
              (item) => item.itemId == this.$route.query.id
            );
            let quantity = this.num;
            if (data) {
              quantity += data.quantity;
            }
            await this.$store.dispatch("goodsDetail/addCartItem", {
              prodId: this.$route.query.id,
              quantity,
              totalAmount: this.getPrice.sellPrice,
              specId: this.product.specList[this.specCurrent].id,
            });
            // 更新购物车数据
            this.$store.dispatch("cart/getMyCartItem");
            this.$message({
              message: "已加入购物车",
              type: "success",
            });
          },
        });
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
                cursor: pointer;
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
