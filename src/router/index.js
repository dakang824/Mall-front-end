/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2020-09-16 23:23:12
 * @LastEditTime: 2021-01-20 17:40:51
 */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("@/views/index.vue"),
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home"),
        meta: {
          keepAlive: true,
          title: "首页",
        },
      },
      {
        path: "/goods-list",
        name: "GoodsList",
        component: (resolve) => require(["@/views/goods/goods-list"], resolve),
        meta: {
          title: "商品列表",
        },
      },
      {
        path: "/store",
        name: "Store",
        component: (resolve) => require(["@/views/store"], resolve),
        meta: {
          title: "商铺详情",
        },
      },
      {
        path: "/profile",
        name: "Profile",
        component: (resolve) => require(["@/views/profile"], resolve),
        meta: {
          keepAlive: true,
          title: "个人中心",
        },
      },
      {
        path: "/goods-detail",
        name: "GoodsDetail",
        meta: {
          keepAlive: true,
          title: "商品详情",
        },
        component: (resolve) =>
          require(["@/views/goods/goods-detail.vue"], resolve),
      },
      {
        path: "/cart",
        name: "Cart",
        component: () => import("@/views/cart/index.vue"),
        redirect: "/cart/",
        children: [
          {
            path: "/",
            name: "Cart",
            component: () => import("@/views/cart/cart.vue"),
            meta: {
              title: "购物车",
            },
          },
          {
            path: "pay",
            name: "Pay",
            component: () => import("@/views/cart/pay.vue"),
            meta: {
              title: "支付",
            },
          },
          {
            path: "pay-result",
            name: "PayResult",
            component: () => import("@/views/cart/pay-result.vue"),
            meta: {
              title: "支付结果",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/login",
    name: "Login",
    component: (resolve) => require(["@/views/login/index.vue"], resolve),
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const router = new VueRouter({
  scrollBehavior(to, from, savedPosition) {
    return (
      savedPosition || {
        x: 0,
        y: 0,
      }
    );
  },
  routes,
});

export default router;
