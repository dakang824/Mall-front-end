/*
 * @Author: yukang 1172248038@qq.com
 * @Description:个人中心
 * @Date: 2020-10-19 22:46:31
 * @LastEditTime: 2020-10-19 22:47:38
 */
import request from "@/utils/request";

export async function getMyInfo(data) {
  return request({
    url: "/service/front/web/getMyInfo",
    method: "post",
    data,
  });
}
