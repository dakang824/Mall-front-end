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
    component: () => import("@/views/Demo/demo.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/Cart/cart.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
