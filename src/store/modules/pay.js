/*
 * @Author: yukang 1172248038@qq.com
 * @Description:下单页面
 * @Date: 2020-10-25 09:09:40
 * @LastEditTime: 2020-11-19 15:44:31
 */
import { unifityOrder } from "@/api/pay";
const state = {
  postData: {
    is_buy: false,
    discount: 0,
    total_amount: 0,
    pay_amount: 0,
    pay_type: 4,
    name: "",
    address: "",
    mobile: "",
    province_code: "",
    orders: [
      {
        total_itmes: 1,
        total_amount: 2,
        discount: 0,
        pay_amount: 2,
        pay_type: 1,
        store_id: 1,
        store_name: "test",
        post_amount: 0,
        buyer_common: "买家留言",
        items: [
          // {
          //   prod_id: 1,
          //   spe_id: "规格id",
          //   item_pic: "商品图片第一张",
          //   post_temp_id: "",
          //   post_temp_name: "运费模板名称",
          //   post_temp_area_id: "模板区域id",
          //   post_base_weight: "模板区域基础重量",
          //   post_base_price: "模板区域基础价格",
          //   post_more_weight: "模板区域超重基数",
          //   post_more_price: "模板区域增加价格",
          //   post_amount: "运费",
          //   quantity: "购买数量",
          //   total_amount: "项目总金额",
          // },
        ],
      },
    ],
  },
};
const getters = {
  postData: (state) => state.postData,
};
const mutations = {
  addPostData(state, data) {
    state.postData = { ...state.postData, ...data };
  },
  // 计算邮费
  computedPost(state) {
    const { orders, province_code, pay_amount } = state.postData;
    state.postData.total_amount = orders
      .map((it) => {
        it.post_amount =
          it.items
            .map((item) => {
              const prod_weight = item.quantity * item.specList[0].weight;
              const posttemplateArea = item.postTemplate.areas.filter(
                (i) => (province_code & i.area) > 0
              );

              if (posttemplateArea.length) {
                const {
                  temp_id,
                  id,
                  baseWeight: base_weight,
                  basePrice: base_price,
                  moreWeight: more_weight,
                  morePrice: more_price,
                } = posttemplateArea[0];

                item.post_temp_id = temp_id;
                item.post_temp_name = item.postTemplate.name;
                item.post_temp_area_id = id;
                item.post_base_weight = base_weight;
                item.post_base_price = base_price;
                item.post_more_weight = more_weight;
                item.post_more_price = more_price;

                if (base_weight > prod_weight) {
                  item.post_amount = base_price;
                } else {
                  item.post_amount =
                    base_price +
                    ((prod_weight - base_weight) / more_weight) * more_price;
                }
              } else {
                item.post_amount = 0;
              }
              return item.post_amount;
            })
            .reduce((a, b) => a + b, 0)
            .toFixed(2) * 1;
        return it.total_amount + it.post_amount;
      })
      .reduce((a, b) => a + b, 0);

    state.postData.pay_amount =
      state.postData.total_amount - state.postData.discount;
  },
};
const actions = {
  async unifityOrder({ commit }, params) {
    const data = JSON.parse(JSON.stringify(params));
    data.orders = JSON.stringify(data.orders);
    const res = await unifityOrder(data);
    commit("addPostData", { is_buy: true });
    return res;
  },
  // 生成下单数据结构
  getData(state, cartItems) {
    const map = cartItems
      .map((item) => item.data)
      .flat(Infinity)
      .filter((item) => item.checked)
      .reduce((result, item) => {
        result[item.product.storeId] = result[item.product.storeId] || [];
        result[item.product.storeId].push(item);
        return result;
      }, {});

    const orders = Object.values(map).map((item) => {
      const obj = {
        total_itmes: item.length,
        total_amount: item.reduce((a, b) => (a += b.unitPrice * b.quantity), 0),
        discount: 0,
        pay_amount: 0,
        pay_type: 4,
        store_id: item[0].product.storeId,
        store_name: item[0].product.store.name,
        post_amount: 0,
        buyer_common: "",
        items: [],
      };
      item.map((i) => {
        const {
          itemId: prod_id,
          unitPrice,
          quantity,
          product: { pics, specList, name, summary, postTemplate },
        } = i;
        obj.items.push({
          prod_id,
          quantity,
          name,
          summary,
          unitPrice,
          specList,
          postTemplate,
          recipe_rate: specList[0].recipeRate,
          weight: specList[0].weight,
          spe_id: specList[0].id,
          item_pic: pics[0].path,
          post_temp_id: null,
          post_temp_name: null,
          post_temp_area_id: null,
          post_base_weight: null,
          post_base_price: null,
          post_more_weight: null,
          post_more_price: null,
          post_amount: null,
          total_amount: i.totalAmount,
          cartItemId: i.id,
        });
      });
      obj.pay_amount = obj.total_amount - obj.discount;
      return obj;
    });

    const postData = {
      discount: 0,
      total_amount: orders.reduce((a, b) => a + b.pay_amount, 0),
      orders,
    };
    postData.pay_amount = postData.total_amount - postData.discount;

    return postData;
  },
};
export default { state, getters, mutations, actions };
