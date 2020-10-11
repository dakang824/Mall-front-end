/*
 * @Author: yukang 1172248038@qq.com
 * @Description:商品列表
 * @Date: 2020-10-11 22:54:55
 * @LastEditTime: 2020-10-11 23:38:02
 */
import { queryProduct, findAllProdAddress } from "@/api/goods";

const state = {
  goodsList: [], //商品数据
  prodAddress: [], //产地
  postData: {
    type: "",
    cate_id: "",
    sub_cate_id: "",
    address_id: "",
    condition: "",
    condition: "",
    orderBySellCount: "",
    orderByPrice: "",
    orderByViewCount: "",
    pageNum: "",
    pageSize: "",
  },
};
const getters = {
  list: (state) => state.list,
  postData: (state) => state.postData,
};
const mutations = {
  setGoodsList(state, data) {
    state.goodsList = data;
  },
  setProdAddress(state, data) {
    state.prodAddress = data;
  },
};
const actions = {
  async queryProduct({ commit }, params) {
    const { data } = await queryProduct(params);
    commit("setGoodsList", data.product.list);
    return data;
  },
  async findAllProdAddress({ commit }, params) {
    const {
      data: { prodAddress },
    } = await findAllProdAddress(params);
    commit("setProdAddress", prodAddress);
  },
};
export default { state, getters, mutations, actions };
