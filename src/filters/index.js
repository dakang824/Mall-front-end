/*
 * @Author: yukang 1172248038@qq.com
 * @Date: 2020-09-20 22:25:48
 * @LastEditTime: 2020-11-06 22:44:05
 */
import parseTime from "@/utils/parse-time";
import currency from "@/utils/currency";
import { baseURL } from "@/config";
function imgBaseUrl(val) {
  return process.env.NODE_ENV === "development"
    ? `/service/${val}`
    : baseURL + val;
}
function slice(val, start = 0, end = val.length) {
  return val ? val.slice(start, end) : "";
}
function toFixed(val, num = 2) {
  return val ? Number(val).toFixed(num) : "0.00";
}
export default { parseTime, currency, imgBaseUrl, toFixed, slice };
