/*
 * @Author: yukang 1172248038@qq.com
 * @Description:购物车
 * @Date: 2020-10-18 13:26:30
 * @LastEditTime: 2020-10-19 21:39:30
 */
import request from "@/utils/request";

export async function getMyCartItem(data = {}) {
  return request({
    url: "/service/front/web/getMyCartItem",
    method: "post",
    data,
  });
}

export async function deleteCartItem(data) {
  return request({
    url: "/service/front/web/deleteCartItem",
    method: "post",
    data,
  });
}

export async function modifyCartItem(data) {
  return request({
    url: "/service/front/web/modifyCartItem",
    method: "post",
    data,
  });
}
