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
        component: () => import("@/views/goods-list/index.vue"),
      },
      {
        path: "/cart",
        name: "Cart",
        component: () => import("@/views/cart/index.vue"),
      },
      {
        path: "pay",
        name: "Pay",
        component: () => import("@/views/cart/pay.vue"),
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
