<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 店铺详情
 * @Date: 2020-10-05 23:03:41
 * @LastEditTime: 2020-10-05 23:07:44
-->

<template>
  <div class="goods-detail-store">
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
        <el-image :src="require('@/assets/imgs/collec-store.png')"></el-image>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {};
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .goods-detail-store {
    .store {
      padding: 20px 0 15px;
      margin-bottom: $padding;
      text-align: center;

      &__title {
        margin-bottom: 17px;
        color: $green;
      }

      ul {
        @include center-flex(y);

        li {
          flex: 1;

          span {
            display: block;
            font-size: $text-small;
            color: #ff6000;
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
            height: 55px;
            margin-right: 10px;
            font-size: 22px;
            color: #fff;
            background: $green;
            border-radius: 0;
          }
        }
      }
    }
  }
</style>
