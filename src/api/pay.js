/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2020-10-25 09:12:05
 * @LastEditTime: 2020-10-25 13:37:13
 */

import request from "@/utils/request";

export async function unifityOrder(data) {
  return request({
    url: "/service/front/web/unifityOrder",
    method: "post",
    data,
  });
}
