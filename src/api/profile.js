/*
 * @Author: yukang 1172248038@qq.com
 * @Description:个人中心
 * @Date: 2020-10-19 22:46:31
 * @LastEditTime: 2020-10-29 00:34:08
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

export async function getMyPostAddress(data) {
  return request({
    url: "/service/front/web/getMyPostAddress",
    method: "post",
    data,
  });
}

export async function addUserAddress(data) {
  return request({
    url: "/service/front/web/addUserAddress",
    method: "post",
    data,
  });
}

export async function modifyUserAddress(data) {
  return request({
    url: "/service/front/web/modifyUserAddress",
    method: "post",
    data,
  });
}

export async function findAllProvinceCode() {
  return request({
    url: "/service/plat/admin/findAllProvinceCode",
    method: "get",
  });
}

export async function deleteUserAddress(data) {
  return request({
    url: "/service/front/web/deleteUserAddress",
    method: "post",
    data,
  });
}

export async function unifityRechargeOrder(data) {
  return request({
    url: "/service/front/web/unifityRechargeOrder",
    method: "post",
    data,
  });
}
