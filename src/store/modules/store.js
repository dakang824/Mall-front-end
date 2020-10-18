/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 门店详情
 * @Date: 2020-10-16 23:01:20
 * @LastEditTime: 2020-10-18 13:50:31
 */
import { getStoreDetail } from "@/api/store";
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
  async getStoreDetail({ commit }, params) {
    const { data } = await getStoreDetail(params);
    commit("setStore", data);
    return data;
  },
};
export default { state, getters, mutations, actions };
