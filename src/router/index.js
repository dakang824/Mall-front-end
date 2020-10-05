/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2020-09-16 23:23:12
 * @LastEditTime: 2020-10-05 18:25:55
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
        component: () => import("@/views/home/index.vue"),
      },
      {
        path: "/goods-list",
        name: "GoodsList",
        component: () => import("@/views/goods/goods-list.vue"),
      },
      {
        path: "/store",
        name: "Store",
        component: () => import("@/views/store/index.vue"),
      },
      {
        path: "/goods-detail",
        name: "GoodsDetail",
        component: () => import("@/views/goods/goods-detail.vue"),
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
    component: () => import("@/views/login/index.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
