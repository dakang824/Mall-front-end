/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 用户基础信息
 * @Date: 2020-09-16 23:29:48
 * @LastEditTime: 2020-10-25 19:48:49
 */
import { getMyPostAddress } from "@/api/profile";
const state = {
  myAddress: [],
};
const getters = {
  myAddress: (state) => state.myAddress,
};
const mutations = {
  setPostAddress(state, data) {
    state.myAddress = data;
  },
};
const actions = {
  async getMyPostAddress({ commit }) {
    const {
      data: { myAddress },
    } = await getMyPostAddress({});
    commit("setPostAddress", myAddress);
    return myAddress;
  },
};
export default { state, getters, mutations, actions };
