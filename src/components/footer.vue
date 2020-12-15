<!--
 * @Author: yukang 1172248038@qq.com
 * @Date: 2020-10-02 22:32:19
 * @LastEditTime: 2020-12-15 22:15:47
-->
<template>
  <dvi class="footer">
    <el-container v-if="show" class="el-card no-border-radius">
      <div class="footer__box w">
        <ul v-for="(item, index) in list" :key="index">
          <li v-for="(it, ind) in item" :key="ind">
            <el-link>{{ it.name }}</el-link>
          </li>
        </ul>
        <el-image
          fit="contain"
          class="logo__img"
          :src="require('@/assets/imgs/code.png')"
        ></el-image>
      </div>
    </el-container>
    <el-container class="footer__bg">
      <el-footer height="107px">
        嗨厨玩味信息科技(上海)有限公司 版权所有 备案号
      </el-footer>
    </el-container>
  </dvi>
</template>
<script>
  export default {
    name: "Footer",
    components: {},
    props: {
      show: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        list: [
          [
            { name: "新手上路" },
            { name: "订单查询" },
            { name: "常见问题" },
            { name: "购物流程" },
            { name: "服务协议" },
          ],
          [{ name: "支付方式" }, { name: "在线支付" }, { name: "银行转账" }],
          [
            { name: "配送服务" },
            { name: "订单进度查询" },
            { name: "验货与收获" },
          ],
          [
            { name: "售后服务" },
            { name: "退款说明" },
            { name: "退换货政策" },
            { name: "退换货流程" },
          ],
          [
            { name: "商家合作" },
            { name: "关于我们" },
            { name: "联系我们" },
            { name: "招商入驻" },
          ],
        ],
      };
    },
    created() {},
    methods: {},
  };
</script>
<style lang="scss" scoped>
  @import "@/assets/scss/settings";

  .footer {
    &__box {
      display: flex;
      justify-content: space-between;
      padding: 40px 30px;

      ul {
        li {
          margin-bottom: 20px;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    &__bg {
      background: #333;

      .el-footer {
        font-size: $text-x-small;
        line-height: 107px;
        color: #fff;
        text-align: center;
      }
    }
  }
</style>
