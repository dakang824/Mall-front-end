/*
 * @Author: yukang 1172248038@qq.com
 * @Description:设置标题
 * @Date: 2021-01-20 17:31:08
 * @LastEditTime: 2021-01-20 17:36:37
 */
import { title } from "@/config";

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle}-${title}`;
  }
  return `${title}`;
}
