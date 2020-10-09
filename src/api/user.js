/*
 * @Author: yukang 1172248038@qq.com
 * @Date: 2020-09-20 21:14:41
 * @LastEditTime: 2020-10-09 23:18:47
 */
import request from "@/utils/request";

export async function login(data) {
  return request({
    url: "/service//front/web/login",
    method: "post",
    data,
  });
}

export function getUserInfo(accessToken) {
  return request({
    url: "/userInfo",
    method: "post",
    data: {
      accessToken,
    },
  });
}

export function logout() {
  return request({
    url: "/logout",
    method: "post",
  });
}
export function register() {
  return request({
    url: "/register",
    method: "post",
  });
}
