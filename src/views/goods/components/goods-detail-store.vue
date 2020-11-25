<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 店铺详情
 * @Date: 2020-10-05 23:03:41
 * @LastEditTime: 2020-11-25 22:03:34
-->

<template>
  <div class="goods-detail-store">
    <div class="store el-card">
      <div class="store__title">{{ getStore.name }}</div>
      <ul>
        <li>
          <i>描述</i>
          <span>{{ getStore.desScore | toFixed(1) }}</span>
        </li>
        <li>
          <i>服务</i>
          <span>{{ getStore.serScore | toFixed(1) }}</span>
        </li>
        <li>
          <i>物流</i>
          <span>{{ getStore.postStore | toFixed(1) }}</span>
        </li>
      </ul>
    </div>
    <div class="store__info el-card">
      <div class="compare">
        <ul>
          <li>店铺动态评分</li>
          <li>描述相符：{{ getStore.desScore | toFixed(1) }}</li>
          <li>服务态度：{{ getStore.serScore | toFixed(1) }}</li>
          <li>物流服务：{{ getStore.postStore | toFixed(1) }}</li>
        </ul>
        <ul>
          <li>与同行业相比</li>
          <li>高于 {{ getStore.desCompare }}%</li>
          <li>高于 {{ getStore.serCompare }}%</li>
          <li>高于 {{ getStore.postCompare }}%</li>
        </ul>
      </div>
      <p>掌柜：{{ getStore.contact }}</p>
      <p>所在地：{{ getStore.address }}</p>
      <div class="btns">
        <el-button>
          <router-link :to="'/store?id=' + getStore.id">进店逛逛</router-link>
        </el-button>
        <el-button icon="el-icon-star-on" @click="handleCollect">
          <span>收藏本店</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      model: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {};
    },
    computed: {
      getStore() {
        return "store" in this.model ? this.model.store : {};
      },
    },
    methods: {
      handleCollect() {
        const { id } = this.getStore;
        this.$utils.verifyLogin({
          success: async (e) => {
            const res = await this.$store.dispatch(`goodsDetail/storeCollect`, {
              storeId: id,
            });
            this.$message({
              message: "收藏成功",
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

  .goods-detail-store {
    .store {
      padding: 13px 0 13px;
      margin-bottom: $padding;
      text-align: center;

      &__title {
        margin-bottom: 13px;
        color: $green;
      }

      ul {
        @include center-flex(y);

        li {
          flex: 1;

          span {
            display: block;
            font-size: 14px;
            color: #ff6000;
          }
        }
      }

      &__info {
        padding: 24px 10px 17px;

        .compare {
          @include center-flex(y);

          ul {
            flex: 1;
            text-align: center;

            li {
              margin-bottom: 15px;
            }
          }
        }

        p {
          margin: 8px 0 0 11px;
        }

        .btns {
          @include center-flex(y);

          margin: 30px 0 16px 0;

          ::v-deep {
            .el-button {
              display: flex;
              align-items: center;

              a {
                color: #fff;
              }

              i {
                font-size: 19px;
              }

              width: 114px;
              height: 41px;
              border-radius: 0;

              &:first-child {
                background: $green;
              }

              &:last-child {
                color: $green;
                border-color: $green;

                &:hover {
                  background-color: rgba(5, 184, 94, 0.1);
                }
              }
            }
          }
        }
      }
    }
  }
</style>
