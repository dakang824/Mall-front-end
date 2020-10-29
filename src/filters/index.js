/*
 * @Author: yukang 1172248038@qq.com
 * @Date: 2020-09-20 22:25:48
 * @LastEditTime: 2020-10-29 20:18:46
 */
import parseTime from "@/utils/parse-time";
import currency from "@/utils/currency";
function imgBaseUrl(val) {
  return "/service/" + val;
}
function slice(val, start = 0, end = val.length) {
  return val ? val.slice(start, end) : "";
}
function toFixed(val, num = 2) {
  return val ? Number(val).toFixed(num) : "0.00";
}
export default { parseTime, currency, imgBaseUrl, toFixed, slice };
