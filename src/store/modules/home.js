/*
 * @Author: yukang 1172248038@qq.com
 * @Description:首页数据
 * @Date: 2020-10-11 22:41:58
 * @LastEditTime: 2020-11-19 10:40:05
 */
import { homePageInit, getAds, getBanner } from "@/api/home";

const state = {
  category: [],
  floorData: [],
  banner: [],
};
const getters = {
  category: (state) => state.category,
  floorData: (state) => state.floorData,
  banner: (state) => state.banner,
};
const mutations = {
  setCategory(state, data) {
    state.category = data;
  },
  setBanner(state, data) {
    state.banner = data;
  },
  setFloorData(state, data) {
    state.floorData = data;
  },
};
const actions = {
  async homePageInit({ commit }) {
    const { data } = await homePageInit();

    const {
      data: { ads },
    } = await getAds();
    ads.sort((a, b) => a.ad_no - b.ad_no);

    const {
      data: { banner },
    } = await getBanner();
    banner.sort((a, b) => a.pos - b.pos);

    commit("setCategory", data.category);
    commit("setBanner", banner);
    commit("setFloorData", [
      {
        name: "菜品",
        data: data.prodCaiPin,
        ad: ads[0],
      },
      {
        name: "菜谱",
        data: data.prodCaiPu,
        ad: ads[1],
      },
      {
        name: "菜盒",
        data: data.prodCaiHe,
        ad: ads[2],
      },
      {
        name: "设备",
        data: data.prodSheBei,
        ad: ads[3],
      },
    ]);
    return data;
  },
};
export default { state, getters, mutations, actions };
