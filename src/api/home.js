/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 首页接口
 * @Date: 2020-10-11 10:58:12
 * @LastEditTime: 2020-11-19 10:32:49
 */
import request from "@/utils/request";

export async function homePageInit() {
  return request({
    url: "/service/front/web/homePageInit",
    method: "get",
  });
}

export async function getAds() {
  return request({
    url: "/service/plat/admin/getAds",
    method: "get",
  });
}

export async function getBanner() {
  return request({
    url: "/service/plat/admin/getBanner",
    method: "get",
  });
}
