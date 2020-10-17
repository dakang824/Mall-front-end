/*
 * @Author: yukang 1172248038@qq.com
 * @Date: 2020-10-17 15:40:19
 * @LastEditTime: 2020-10-17 15:58:18
 */
import store from "@/store";
import router from "@/router";
export default function verifyLogin({ success, error }) {
  let user = store.getters["user/userInfo"];
  user ? success(JSON.parse(user)) : error ? error() : router.push("/login");
}
