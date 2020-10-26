/*
 * @Author: yukang 1172248038@qq.com
 * @Description:个人中心欢迎页
 * @Date: 2020-10-19 23:05:58
 * @LastEditTime: 2020-10-26 20:57:45
 */
import { getMyInfo } from "@/api/profile";
const state = { store: {} };
const getters = {
  store: (state) => state.store,
};
const mutations = {
  setStore(state, params) {
    state.store = params;
  },
};
const actions = {
  async getMyInfo({ commit }, params) {
    const { data } = await getMyInfo(params);
    this.commit("user/setUserInfo", JSON.stringify(data.myInfo));
    commit("setStore", data);
    return data;
  },
};
export default { state, getters, mutations, actions };
