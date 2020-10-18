/*
 * @Author: yukang 1172248038@qq.com
 * @Description:门店详情
 * @Date: 2020-10-18 13:26:30
 * @LastEditTime: 2020-10-18 13:38:26
 */
import request from "@/utils/request";

export async function getStoreDetail(data) {
  return request({
    url: "/service/front/web/getStoreDetail",
    method: "post",
    data,
  });
}
