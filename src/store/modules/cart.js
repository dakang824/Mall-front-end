/*
 * @Author: yukang 1172248038@qq.com
 * @Description:购物车
 * @Date: 2020-10-18 20:37:26
 * @LastEditTime: 2020-10-19 00:11:54
 */
import { getMyCartItem } from "@/api/cart";
const state = { cartItems: [], cartNum: 0, cartState: 0 };
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
      item.unitPrice = item.product.specList.sort((a, b) => {
        return a.sellPrice - b.sellPrice;
      })[0].sellPrice;
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
    commit("setCartState", 1);
    return cartItems;
  },
};
export default { state, getters, mutations, actions };
