/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 商品接口
 * @Date: 2020-10-11 10:58:12
 * @LastEditTime: 2020-10-11 23:05:50
 */
import request from "@/utils/request";

export async function queryProduct(data) {
  console.log(data);
  return request({
    url: "/service/front/web/queryProduct",
    method: "post",
    data,
  });
}
