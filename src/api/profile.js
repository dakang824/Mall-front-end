/*
 * @Author: yukang 1172248038@qq.com
 * @Description:个人中心
 * @Date: 2020-10-19 22:46:31
 * @LastEditTime: 2020-12-18 21:05:17
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

// 收货地址
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

// 在线充值
export async function unifityRechargeOrder(data) {
  return request({
    url: "/service/front/web/unifityRechargeOrder",
    method: "post",
    data,
  });
}

// 发送手机验证码
export async function sendSMS(data) {
  return request({
    url: "/service/common/sendSMS",
    method: "post",
    data,
  });
}

// 验证手机验证码
export async function checkMobileCodeValid(data) {
  return request({
    url: "/service/front/web/checkMobileCodeValid",
    method: "post",
    data,
  });
}

// 绑定新手机号码
export async function bindMobil(data) {
  return request({
    url: "/service/front/web/bindMobil",
    method: "post",
    data,
  });
}

export async function modifyPwd(data) {
  return request({
    url: "/service/front/web/modifyPwd",
    method: "post",
    data,
  });
}

// 我的订单
export async function findMyOrders(data) {
  return request({
    url: "/service/front/web/findMyOrders",
    method: "post",
    data,
  });
}

export async function rePayOrder(data) {
  return request({
    url: "/service/front/web/rePayOrder",
    method: "post",
    data,
  });
}

export async function deleteMyOrders(data) {
  return request({
    url: "/service/front/web/deleteMyOrders",
    method: "post",
    data,
  });
}

export async function cancelMyOrders(data) {
  return request({
    url: "/service/front/web/cancelMyOrders",
    method: "post",
    data,
  });
}

export async function reciveMyOrders(data) {
  return request({
    url: "/service/front/web/reciveMyOrders",
    method: "post",
    data,
  });
}

export async function userExtendOrderReciveTime(data) {
  return request({
    url: "/service/front/web/userExtendOrderReciveTime",
    method: "post",
    data,
  });
}

export async function applyPayback(data) {
  return request({
    url: "/service/front/web/applyPayback",
    method: "post",
    data,
  });
}

export async function queryPayBackOrders(data) {
  return request({
    url: "/service/front/web/queryPayBackOrders",
    method: "post",
    data,
  });
}

// 我收藏的商品
export async function getMyCollectProd(data) {
  return request({
    url: "/service/front/web/getMyCollectProd",
    method: "post",
    data,
  });
}

// 我收藏的商铺
export async function getMyCollectStore(data) {
  return request({
    url: "/service/front/web/getMyCollectStore",
    method: "post",
    data,
  });
}

// 我的账户明细
export async function findMyCashRecords(data) {
  return request({
    url: "/service/front/web/findMyCashRecords",
    method: "post",
    data,
  });
}

// 我的账户明细
export async function addRemittance(data) {
  return request({
    url: "/service/front/web/addRemittance",
    method: "post",
    data,
  });
}

// 模拟支付回调
export async function getOrderPayResult(data) {
  return request({
    url: "/service/front/web/getOrderPayResult",
    method: "post",
    data,
  });
}

// 模拟支付回调
export async function rePayOrder2(data) {
  return request({
    url: "/service/front/web/rePayOrder2",
    method: "post",
    data,
  });
}
