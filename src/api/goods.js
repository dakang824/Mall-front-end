/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 商品接口
 * @Date: 2020-10-11 10:58:12
 * @LastEditTime: 2020-11-10 22:41:30
 */
import request from "@/utils/request";

export async function queryProduct(data) {
  return request({
    url: "/service/front/web/queryProduct",
    method: "post",
    data,
  });
}

export function findAddressByProdType(data) {
  return request({
    url: "/service/front/web/findAddressByProdType",
    method: "post",
    data,
  });
}

export function findCategroyByProdType(data) {
  return request({
    url: "/service/front/web/findCategroyByProdType",
    method: "post",
    data,
  });
}

export function getProductDetail(data) {
  return request({
    url: "/service/front/web/getProductDetail",
    method: "post",
    data,
  });
}

export function prodCollect(data) {
  return request({
    url: "/service/front/web/prodCollect",
    method: "post",
    data,
  });
}

export function prodUnCollect(data) {
  return request({
    url: "/service/front/web/prodUnCollect",
    method: "post",
    data,
  });
}

export function storeCollect(data) {
  return request({
    url: "/service/front/web/storeCollect",
    method: "post",
    data,
  });
}

export function addCartItem(data) {
  return request({
    url: "/service/front/web/addCartItem",
    method: "post",
    data,
  });
}

export function queryProduct2(data) {
  return request({
    url: "/service/front/web/queryProduct2",
    method: "post",
    data,
  });
}
