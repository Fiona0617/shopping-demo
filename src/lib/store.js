import Vue from 'vue'

// 引入并注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 创建一个vuex仓库
const store = new Vuex.Store({
  state: {
    //count: 0
    cartTotal: JSON.parse(localStorage.getItem('cartInfo')) || {},
    // 是否登录
    isLogin: false
  },
  getters: {
    // states是形参，可以随便命名，自动访问指向state
    cartTotalNum: states => {
      let sum = 0;
      for (const index in states.cartTotal) {
        sum += states.cartTotal[index];
      }
      return sum;
    }
  },
  mutations: {
    addToCart(state, obj) {
      if (state.cartTotal[obj.goodId] != undefined) {
        state.cartTotal[obj.goodId] += obj.goodNum;
      } else {
        Vue.set(state.cartTotal, obj.goodId, obj.goodNum);
      }
    },
    updateCart(state, obj) {
      state.cartTotal = obj;
    },
    // 修改登录状态
    changeLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
    // 根据id删除购物车中的商品记录
    delCartById(state, id) {
      // 必须用api方法删除，否则无法监听到数据变化
      Vue.delete(state.cartTotal, id);
    }
  }
})

// 暴露出去
export default store;