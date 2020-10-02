<template>
  <div class="footer">
    <div v-if="!hidden" class="footer__container w">
      <div class="footer__container__siteinfo">
        <ul class="c0">
          <h3 class="c1">新手上路</h3>
          <ul>
            <li class="c2">
              <router-link to="/thanks"><a class="c3">订单查询</a></router-link>
            </li>
            <li class="c2"><a class="c3">常见问题</a></li>
            <li class="c2"><a class="c3">购物流程</a></li>
            <li class="c2"><a class="c3">服务协议</a></li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">支付方式</h3>
          <ul>
            <li class="c2">
              <a class="c3" target="_blank" href="#">在线支付</a>
            </li>
            <li class="c2">
              <a class="c3" target="_blank" href="#">银行转账</a>
            </li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">配送服务</h3>
          <ul>
            <li class="c2">
              <a class="c3" target="_blank" href="#">订单进度查询</a>
            </li>
            <li class="c2">
              <a class="c3" target="_blank" href="#">验货与收获</a>
            </li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">售后服务</h3>
          <ul>
            <li class="c2">
              <a class="c3" target="_blank" href="#">退款说明</a>
            </li>
            <li class="c2">
              <a class="c3" target="_blank" href="#">退换货政策</a>
            </li>
            <li class="c2">
              <a class="c3" target="_blank" href="#">退换货流程</a>
            </li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">商家合作</h3>
          <ul>
            <li class="c2">
              <a class="c3" target="_blank" href="#">关于我们</a>
            </li>
            <li class="c2">
              <a class="c3" target="_blank" href="#">联系我们</a>
            </li>
            <li class="c2">
              <a class="c3" target="_blank" href="">招商入驻</a>
            </li>
          </ul>
        </ul>
        <ul class="c4">
          <li class="tel">
            <a
              class="c5"
              href="http://wpa.qq.com/msgrd?v=3&uin=1012139570&site=qq&menu=yes"
              target="_blank"
            >
              1012139570
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer__copyright">
      嗨厨玩味信息科技(上海)有限公司 版权所有 备案号
    </div>
  </div>
</template>
<script>
  export default {
    name: "Footer",
    components: {},
    props: {
      hidden: {
        type: Boolean,
        default: false,
      },
    },
    created() {},
    methods: {},
  };
</script>
<style lang="scss" scoped>
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__container {
      margin-bottom: 30px;
      &__siteinfo {
        height: 100px;
        padding: 50px 0 130px;
        position: relative;
      }
    }
    &__copyright {
      color: #fff;
      font-size: 18px;
      color: #1b1b1b;
      padding: 40px 0;
      text-align: center;
      background: #fff;
      width: 100%;
    }
  }

  .c0 {
    width: 210px;
    line-height: 1;
    float: left;
  }

  .c1 {
    color: #646464;
    font-size: 15px;
    padding: 0 0 14px;
  }

  .c2 {
    color: #c3c3c3;
    font-size: 13px;
    padding: 6px 0;
  }

  .c3 {
    color: #969696;
  }

  .c4 {
    position: absolute;
    right: 0;
    overflow: hidden;
    line-height: 34px;
  }

  .tel {
    font-size: 30px;
    line-height: 1;
    color: #646464;
    top: -2px;
    position: relative;
  }

  .c5 {
    color: #646464;
    right: -70px;
    position: relative;
  }
</style>
