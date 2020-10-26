/*
 * @Author: yukang 1172248038@qq.com
 * @Description:购物车
 * @Date: 2020-10-18 20:37:26
 * @LastEditTime: 2020-10-26 22:08:01
 */
import { getMyCartItem, deleteCartItem, modifyCartItem } from "@/api/cart";
const state = {
  cartItems: [],
  cartNum: 0,
  cartState: 1,
};
const getters = {
  cartItems: (state) => state.cartItems,
};
const mutations = {
  setCartItems(state, params) {
    state.cartItems = params;
  },
  setCartGoodsNum(state, params) {
    state.cartNum = params;
  },
  setCartState(state, params) {
    state.cartState = params;
  },
};
const actions = {
  async getMyCartItem({ commit }, params) {
    const {
      data: { cartItems },
    } = await getMyCartItem(params);

    cartItems.map((item) => {
      item.checked = false;
      item.product.specList = item.product.specList.filter(
        (it) => it.id === item.specId
      );
      item.unitPrice = item.product.specList[0].sellPrice;
    });

    const map = cartItems.reduce((result, item) => {
      result[item.product.storeId] = result[item.product.storeId] || [];
      result[item.product.storeId].push(item);
      return result;
    }, {});

    const result = Object.values(map).map((item) => {
      return {
        checked: false,
        name: item[0].product.store.name,
        data: item,
      };
    });

    commit("setCartItems", result);
    commit("setCartGoodsNum", cartItems.length);
    return cartItems;
  },

  async deleteCartItem({ commit }, params) {
    const res = await deleteCartItem(params);
    return res;
  },

  async modifyCartItem({ commit }, params) {
    const res = await modifyCartItem(params);
    return res;
  },
};
export default { state, getters, mutations, actions };
