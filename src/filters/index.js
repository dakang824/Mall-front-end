/*
 * @Author: yukang 1172248038@qq.com
 * @Date: 2020-09-20 22:25:48
 * @LastEditTime: 2020-10-11 21:21:37
 */
import parseTime from "@/utils/parse-time";
import currency from "@/utils/currency";
function imgBaseUrl(val) {
  return "/service/" + val;
}
export default { parseTime, currency, imgBaseUrl };
