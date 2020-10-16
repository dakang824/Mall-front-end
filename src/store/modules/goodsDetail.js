/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 商品详情
 * @Date: 2020-10-16 23:01:20
 * @LastEditTime: 2020-10-16 23:13:44
 */
import { getProductDetail } from "@/api/goods";
const state = { store: [] };
const getters = {
  store: (state) => state.store,
};
const mutations = {
  setStore(state, params) {
    state.store = params;
  },
};
const actions = {
  async getProductDetail({ commit }, params) {
    const { data } = await getProductDetail(params);
    commit("setStore", data);
    return data;
  },
};
export default { state, getters, mutations, actions };
