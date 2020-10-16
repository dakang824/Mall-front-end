/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 商品接口
 * @Date: 2020-10-11 10:58:12
 * @LastEditTime: 2020-10-16 22:59:38
 */
import request from "@/utils/request";

export async function queryProduct(data) {
  return request({
    url: "/service/front/web/queryProduct",
    method: "post",
    data,
  });
}

export function findAllProdAddress() {
  return request({
    url: "/service/plat/admin/findAllProdAddress",
    method: "get",
  });
}

export function getProductDetail(data) {
  return request({
    url: "/service/front/web/getProductDetail",
    method: "post",
    data,
  });
}
