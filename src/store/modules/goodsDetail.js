/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 商品详情
 * @Date: 2020-10-16 23:01:20
 * @LastEditTime: 2020-10-17 17:26:54
 */
import {
  getProductDetail,
  prodCollect,
  prodUnCollect,
  storeCollect,
  addCartItem,
} from "@/api/goods";
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
  async prodCollect({ commit }, params) {
    const res = await prodCollect(params);
    return res;
  },
  async prodUnCollect({ commit }, params) {
    const res = await prodUnCollect(params);
    return res;
  },
  async storeCollect({ commit }, params) {
    const res = await storeCollect(params);
    return res;
  },
  async addCartItem({ commit }, params) {
    const res = await addCartItem(params);
    return res;
  },
};
export default { state, getters, mutations, actions };
