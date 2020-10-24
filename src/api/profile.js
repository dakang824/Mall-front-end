/*
 * @Author: yukang 1172248038@qq.com
 * @Description:个人中心
 * @Date: 2020-10-19 22:46:31
 * @LastEditTime: 2020-10-24 21:36:57
 */
import request from "@/utils/request";

export async function getMyInfo(data) {
  return request({
    url: "/service/front/web/getMyInfo",
    method: "post",
    data,
  });
}

export async function modifyMyInfo(data) {
  return request({
    url: "/service/front/web/modifyMyInfo",
    method: "post",
    data,
  });
}
