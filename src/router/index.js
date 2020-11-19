/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2020-09-16 23:23:12
 * @LastEditTime: 2020-11-19 19:51:34
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
        },
      },
      {
        path: "/goods-list",
        name: "GoodsList",
        component: (resolve) => require(["@/views/goods/goods-list"], resolve),
      },
      {
        path: "/store",
        name: "Store",
        component: (resolve) => require(["@/views/store"], resolve),
      },
      {
        path: "/profile",
        name: "Profile",
        component: (resolve) => require(["@/views/profile"], resolve),
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "/goods-detail",
        name: "GoodsDetail",
        meta: {
          keepAlive: true,
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
          },
          {
            path: "pay",
            name: "Pay",
            component: () => import("@/views/cart/pay.vue"),
          },
          {
            path: "pay-result",
            name: "PayResult",
            component: () => import("@/views/cart/pay-result.vue"),
          },
        ],
      },

      {
        path: "/demo",
        name: "Demo",
        component: () => import("@/views/demo/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: (resolve) => require(["@/views/login/index.vue"], resolve),
  },
];

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

export default router;
