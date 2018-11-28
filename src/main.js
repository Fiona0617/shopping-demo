import Vue from 'vue'
import App from './App.vue'
// 引入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI); //注册

// 导入并注册iview框架
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

// 导入axios
import axios from 'axios';
// 添加到vue原型属性中
Vue.prototype.$axios = axios;
// 设置基础url，axios自带属性
axios.defaults.baseURL = 'http://111.230.232.110:8899/';
// 设置axios跨域，默认是不携带cookie发送请求的
axios.defaults.withCredentials = true;

// 引入商品展示图放大镜插件
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

// 控制台不打印内容
Vue.config.productionTip = false

// 引入全局的公共样式
import './assets/css/style.css'

// 引入组件
import index from './components/index.vue'
import productDetail from './components/productDetail.vue'
import shopCart from './components/shopCart.vue'
import submitOrder from './components/submitOrder.vue'
import login from './components/login.vue'
import userInfo from './components/userInfo.vue'
import orderList from './components/orderList.vue'
import orderDetail from './components/orderDetail.vue'

let routes = [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: index
  },
  {
    path: '/productDetail/:id',
    component: productDetail
  },
  {
    path: '/shopCart',
    component: shopCart
  },
  {
    path: '/submitOrder/:selectedIds',
    component: submitOrder
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/userInfo',
    component: userInfo
  },
  {
    path: '/orderList',
    component: orderList
  },
  {
    path: '/orderDetail',
    component: orderDetail
  }
]

const router = new VueRouter({
  routes
})

// 注册一个全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.path.indexOf('/submitOrder')!=-1) {
    // 发送请求看是否登录
    axios.get('site/account/islogin').then(res => {
      if (res.data.code == 'logined') {
        // router.push('/submitOrder');
        // router.push和next不需要一起使用
        next();
      } else {
        Vue.prototype.$message('请登录后再提交订单！');
        router.push('/login');
        //next();
      }
    })
  } else {
    next();
  }

})

// 引入时间格式化插件
// const moment = require('moment'); //两种写法都可以
import moment from 'moment';
// 全局过滤器
Vue.filter('timeFormat', function (value) {
  // 时间格式化
  return moment(value).format('YYYY-MM-DD');
})
Vue.filter('timeFormatPlus', function (value) {
  // 时间格式化
  return moment(value).format('YYYY/MM/DD HH:mm:ss');
})

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
    // increment (state) {
    //   state.count++
    // }
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
    }
  }
})

window.onbeforeunload = function () {
  localStorage.setItem('cartInfo', JSON.stringify(store.state.cartTotal));
}

new Vue({
  render: h => h(App),
  router,
  store,
  // 声明周期
  created() {
    // 每次实例创建完成后，都判断一次是否用户已登录
    // 因为一次会话刷新后就会消失，要重新判断
    axios.get('site/account/islogin').then(res => {
      if (res.data.code == 'logined') {
        store.state.isLogin = true;
      }
    })
  }
}).$mount('#app')