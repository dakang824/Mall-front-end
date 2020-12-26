/*
 * @Author: yukang 1172248038@qq.com
 * @Description:路由守卫
 * @Date: 2020-12-26 14:50:46
 * @LastEditTime: 2020-12-26 15:09:44
 */

import router from "@/router";
import store from "@/store";
import { routesWhiteList } from "@/config";

router.beforeResolve(async (to, from, next) => {
  if (routesWhiteList.indexOf(to.path) !== -1) {
    next();
  } else {
    let userInfo = store.getters["user/userInfo"];
    if (userInfo) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});
