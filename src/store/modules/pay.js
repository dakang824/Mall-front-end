/*
 * @Author: yukang 1172248038@qq.com
 * @Description:下单页面
 * @Date: 2020-10-25 09:09:40
 * @LastEditTime: 2020-10-25 09:34:19
 */
import { getMyPostAddress } from "@/api/pay";
const state = { postData: {} };
const getters = {
  postData: (state) => state.postData,
};
const mutations = {
  addPostData(state, data) {
    state.postData = data;
  },
};
const actions = {};
export default { state, getters, mutations, actions };
