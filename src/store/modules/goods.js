/*
 * @Author: yukang 1172248038@qq.com
 * @Description:商品列表
 * @Date: 2020-10-11 22:54:55
 * @LastEditTime: 2020-11-10 22:45:21
 */
import {
  queryProduct,
  queryProduct2,
  findAddressByProdType,
  findCategroyByProdType,
} from "@/api/goods";

const state = {
  goodsList: [], //商品数据
  prodAddress: [], //产地
  categoryList: [], //分类
  postData: {
    type: "",
    cate_id: "",
    sub_cate_id: "",
    address_id: "",
    condition: "",
    orderBySellCount: "",
    orderByPrice: "",
    orderByViewCount: "",
    pageNum: 1,
    pageSize: 10,
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
  setCategoryList(state, data) {
    state.categoryList = data;
  },
  setPostData(state, data) {
    state.postData = data;
  },
};
const actions = {
  async queryProduct({ commit }, params) {
    const { data } = await queryProduct(params);
    commit("setGoodsList", data.product.list);
    return data;
  },
  async queryProduct2({ commit }, params) {
    const { data } = await queryProduct2(params);
    commit("setGoodsList", data.product.list);
    return data;
  },
  async findAddressByProdType({ commit }, params) {
    const {
      data: { categoryList },
    } = await findAddressByProdType(params);
    commit("setProdAddress", categoryList);
  },
  async findCategroyByProdType({ commit }, params) {
    const {
      data: { categoryList },
    } = await findCategroyByProdType(params);
    commit("setCategoryList", categoryList);
  },
};
export default { state, getters, mutations, actions };
