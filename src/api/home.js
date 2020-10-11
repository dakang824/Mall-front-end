/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 首页接口
 * @Date: 2020-10-11 10:58:12
 * @LastEditTime: 2020-10-11 10:59:13
 */
import request from "@/utils/request";

export async function homePageInit() {
  return request({
    url: "/service/front/web/homePageInit",
    method: "get",
  });
}
