/*
 * @Author: yukang 1172248038@qq.com
 * @Description:购物车
 * @Date: 2020-10-18 13:26:30
 * @LastEditTime: 2020-10-18 20:47:08
 */
import request from "@/utils/request";

export async function getMyCartItem(data = {}) {
  return request({
    url: "/service/front/web/getMyCartItem",
    method: "post",
    data,
  });
}
