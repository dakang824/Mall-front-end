<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 欢迎页面
 * @Date: 2020-10-19 23:03:17
 * @LastEditTime: 2020-10-24 23:42:11
-->
<template>
  <div class="welcome">
    <el-container>
      <el-main>
        <div class="row">
          <div class="el-card">
            <el-image
              v-if="getMyInfo.icon"
              class="user_pic"
              :src="getMyInfo.icon | imgBaseUrl"
            />
            <el-image
              v-else
              :src="require('@/assets/imgs/header-avatar.png')"
            />

            <div>{{ getMyInfo.name }}</div>
            <div class="safe">
              <span>账号安全</span>
              <ul>
                <li
                  v-for="(item, index) in level"
                  :key="index"
                  :class="{ active: index == getMyInfo.accLevel }"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
            <ol class="footer">
              <li v-if="getMyInfo.mobile">
                <el-image
                  :src="require('@/assets/imgs/profile-mobile.png')"
                ></el-image>
                已绑定
              </li>
              <li v-if="getMyInfo.status !== 1">
                <el-image
                  :src="require('@/assets/imgs/profile-no.png')"
                ></el-image>
                未开启
              </li>
            </ol>
          </div>
          <div class="el-card">
            <span>我的余额</span>
            <p>
              <i>￥</i>
              {{ getMyInfo.balance }}
            </p>
            <el-image
              :src="require('@/assets/imgs/profile-recharge.png')"
            ></el-image>
          </div>
          <div>
            <ul class="block">
              <li class="el-card">
                <i>待付款</i>
                <p>5</p>
              </li>
              <li class="el-card">
                <i>待收货</i>
                <p>5</p>
              </li>
              <li class="el-card">
                <i>退款</i>
                <p>5</p>
              </li>
              <li class="el-card">
                <i>待发货</i>
                <p>5</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="box">
          <i class="box__more">
            查看更多
            <span class="el-icon-d-arrow-right"></span>
          </i>
          <el-tabs type="border-card" class="el-card">
            <el-tab-pane
              v-for="(item, index) in getTabsData"
              :key="index"
              :label="item.name"
            >
              <span v-if="index === 0" slot="label">{{ item.name }}</span>
              <ul class="block">
                <li
                  v-for="(it, ind) in item.data"
                  :key="ind"
                  @click="handleItem(it)"
                >
                  <el-image
                    :src="
                      'pics' in it ? it.pics[0].path : it.logoPath | imgBaseUrl
                    "
                    fit="contain"
                    class="goods-detail-info__imgs"
                  />
                  <p>{{ it.name }}</p>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
      <el-aside width="230px" class="el-card">
        <div class="title">我的购物车</div>
        <div
          v-for="(it, ind) in getCartItems.slice(0, maxLen)"
          :key="ind"
          class="goods-item"
          @click="handleClick(it)"
        >
          <el-image
            :src="it.product.pics[0].path | imgBaseUrl"
            fit="cover"
          ></el-image>
          <div class="right">
            <p>{{ it.product.name }}</p>
            <span>￥{{ it.product.specList | minPrice }}</span>
          </div>
        </div>
        <div class="more" @click="handleChange">
          <div v-if="getCartItems.length > 5 && maxLen == 5">
            查看全部(
            <span>{{ getCartItems.length }}</span>
            )
          </div>
          <div v-else>
            <i
              class="el-icon-d-arrow-right"
              style="transform: rotate(-90deg)"
            ></i>
          </div>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    name: "Welcome",
    components: {},
    filters: {
      minPrice: (value) => {
        if (value.length) {
          return JSON.parse(JSON.stringify(value))
            .sort((a, b) => {
              return a.sellPrice - b.sellPrice;
            })[0]
            .sellPrice.toFixed(2);
        }
      },
    },
    data() {
      return {
        level: ["低", "中", "高"],
        maxLen: 5,
      };
    },
    computed: {
      ...mapState({
        store: (state) => state.profileWelcome.store,
      }),
      getMyInfo() {
        return this.store.myInfo;
      },
      getCartItems() {
        return this.store.cartItems;
      },
      getTabsData() {
        return [
          { name: "商品收藏", data: this.store.collectProds },
          { name: "店铺收藏", data: this.store.collectStores },
        ];
      },
    },
    async created() {
      await this.$store.dispatch("profileWelcome/getMyInfo", {});
    },
    methods: {
      handleChange(e) {
        this.maxLen = this.maxLen === 5 ? this.getCartItems.length : 5;
      },
      handleItem(e) {
        if ("pics" in e) {
          this.handleClick(e);
        } else {
          this.$router.push({
            path: "/store",
            query: { id: e.id },
          });
        }
      },
      handleClick(e) {
        window.open(`#/goods-detail?type=${e.type}&id=${e.id}`);
        // this.$router.push({
        //   path: "/goods-detail",
        //   query: { type: e.type, id: e.id },
        // });
        // this.getData();
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";
  .welcome {
    .el-main {
      > .row {
        > .el-card:first-child {
          min-width: 260px;
          text-align: center;
          padding: $padding;
          padding-bottom: 5px;
          .user_pic {
            width: 60px;
            height: 60px;
          }
          .safe {
            @include center-flex(y);
            justify-content: center;
            border-top: 1px solid $colorBorder;
            margin: $padding 0 28px 0;
            padding: $padding 0 0;
            ul {
              @include justify();
              li {
                width: 43px;
                height: 20px;
                line-height: 20px;
                border-radius: 25px;
                border: 1px solid #333;
                margin-left: 10px;
                &.active {
                  background: $green;
                  color: #fff;
                  border-color: $green;
                }
              }
            }
          }
          .footer {
            @include justify();
            li {
              @include center-flex(y);
              .el-image {
                margin: 6px;
              }
            }
          }
        }
        > .el-card:nth-child(2) {
          min-width: 190px;
          text-align: center;
          margin: 0 $padding;
          span {
            padding: 35px 0 30px;
            display: block;
          }
          p {
            color: $green;
            i {
              font-size: $text-x-small;
            }
            font-size: $text-large;
            font-weight: bold;
            margin-bottom: 25px;
          }
          .el-image {
            cursor: pointer;
          }
        }
      }
      .row {
        @include justify();
        .block {
          @include justify();
          flex-wrap: wrap;
          .el-card {
            text-align: center;
            min-width: 118px;
            height: 100px;
            padding-top: 25px;
            p {
              font-size: 20px;
              color: $green;
            }
            &:first-child,
            &:nth-child(3) {
              margin-right: $padding;
            }
            &:first-child,
            &:nth-child(2) {
              margin-bottom: $padding;
            }
          }
        }
      }
      .box {
        position: relative;
        &__more {
          position: absolute;
          right: 0;
          z-index: 99;
          height: 53px;
          line-height: 53px;
          padding-right: 10px;
          cursor: pointer;
          &:hover {
            color: $green;
          }
        }
        ::v-deep {
          .el-tabs {
            margin-top: $padding;
            &__content {
              padding: $padding;
            }
            .block {
              @include center-flex(y);
              li {
                margin-top: 49px;
                width: 89px;
                text-align: center;
                cursor: pointer;
                margin-right: 50px;
                .el-image {
                  width: 89px;
                  height: 89px;
                  border-radius: 50px;
                  border: 1px solid $colorBorder;
                }
                p {
                  margin: 22px 0 46px;
                }
              }
            }

            .el-tabs__item {
              position: relative;
              width: 297px;
              height: 54px;
              padding: 0;
              font-size: $text-x-small;
              line-height: 54px;
              color: $color5;
              font-weight: bold;
              text-align: center;

              &:hover {
                color: $green;
              }

              &.is-active {
                color: $green;

                &::after {
                  position: absolute;
                  top: 0;
                  left: 0;
                  display: block;
                  width: 100%;
                  height: 4px;
                  content: "";
                  background: $green;
                }
              }
            }

            &--border-card {
              & > .el-tabs__header {
                background-color: #d4d4d4;
              }
            }
          }
        }
      }
    }
    .el-aside {
      padding: $padding 0;
      margin-left: $padding;
      .title {
        @include center-flex(y);
        margin: 0 0 $padding $padding;
        &::before {
          display: block;
          width: 2px;
          height: 14px;
          margin-right: 14px;
          content: "";
          background: $green;
        }
      }
      .goods-item {
        display: flex;
        cursor: pointer;
        padding: 5px $padding;
        &:hover {
          background: rgba(0, 0, 0, 0.1);
        }
        &:last-child {
          margin-bottom: 0;
        }

        .el-image {
          width: 80px;
          min-width: 80px;
          height: 80px;
          margin-right: $padding;
        }

        span {
          font-weight: bold;
          color: $error;
        }
      }
      .more {
        text-align: center;
        padding: 3px 0 0;
        cursor: pointer;
        span {
          color: $green;
        }
      }
    }
  }
</style>
