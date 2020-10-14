/*
 * @Author: yukang 1172248038@qq.com
 * @Description:首页数据
 * @Date: 2020-10-11 22:41:58
 * @LastEditTime: 2020-10-14 21:44:58
 */
import { homePageInit } from "@/api/home";

const state = {
  category: [],
  floorData: [],
};
const getters = {
  category: (state) => state.category,
  floorData: (state) => state.floorData,
};
const mutations = {
  setCategory(state, data) {
    state.category = data;
  },
  setFloorData(state, data) {
    state.floorData = data;
  },
};
const actions = {
  async homePageInit({ commit }) {
    const { data } = await homePageInit();
    commit("setCategory", data.category);
    commit("setFloorData", [
      {
        name: "菜品",
        data: data.prodCaipin,
      },
      {
        name: "菜谱",
        data: data.prodCaiPu,
      },
      {
        name: "菜盒",
        data: data.prodCaiHe,
      },
      {
        name: "设备",
        data: data.prodSheBei,
      },
    ]);
    return data;
  },
};
export default { state, getters, mutations, actions };
