/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 用户基础信息
 * @Date: 2020-09-16 23:29:48
 * @LastEditTime: 2020-10-17 16:30:52
 */
import { login } from "@/api/user";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/utils/accessToken";
const state = {
  userInfo: getAccessToken(),
};
const getters = {
  userInfo: (state) => state.userInfo,
};
const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data;
    setAccessToken(data);
  },
  resetUserInfo(state) {
    state.userInfo = null;
    removeAccessToken();
  },
};
const actions = {
  async getLoginInfo({ commit }, params) {
    const res = await login(params);
    commit("setUserInfo", JSON.stringify(res.data.user));
    return res;
  },
};
export default { state, getters, mutations, actions };
