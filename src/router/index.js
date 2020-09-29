import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("@/views/index.vue"),
  },
  {
    path: "/demo",
    name: "Demo",
    component: () => import("@/views/demo/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/cart/index.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
