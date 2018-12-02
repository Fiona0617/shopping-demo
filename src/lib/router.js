import Vue from 'vue'

// 引入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 引入组件
// import index from '../components/index.vue'
// import productDetail from '../components/productDetail.vue'
// import shopCart from '../components/shopCart.vue'
// import submitOrder from '../components/submitOrder.vue'
// import payDetail from '../components/payDetail.vue'
// import paySuccess from '../components/paySuccess.vue'
// import login from '../components/login.vue'
// import user from '../components/user.vue'
// import userInfo from '../components/userInfo.vue'
// import orderList from '../components/orderList.vue'
// import orderDetail from '../components/orderDetail.vue'

// 路由懒加载
const index = () => import('../components/index.vue');
const productDetail = () => import('../components/productDetail.vue');
const shopCart = () => import('../components/shopCart.vue');
const submitOrder = () => import('../components/submitOrder.vue');
const payDetail = () => import('../components/payDetail.vue');
const paySuccess = () => import('../components/paySuccess.vue');
const login = () => import('../components/login.vue');
const user = () => import('../components/user.vue');
const userInfo = () => import('../components/userInfo.vue');
const orderList = () => import('../components/orderList.vue');
const orderDetail = () => import('../components/orderDetail.vue');

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
    component: submitOrder,
    // 添加路由元信息
    meta: {
      checkLogin: true
    }
  },
  {
    path: '/payDetail/:orderId',
    component: payDetail,
    // 添加路由元信息
    meta: {
      checkLogin: true
    }
  },
  {
    path: '/paySuccess',
    component: paySuccess,
    // 添加路由元信息
    meta: {
      checkLogin: true
    }
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/user',
    component: user,
    redirect: '/user/userInfo',
    // 添加路由元信息
    meta: {
      checkLogin: true
    },
    children: [
      {
        path: 'userInfo',
        component: userInfo,
        // 添加路由元信息
        meta: {
          checkLogin: true
        }
      },
      {
        path: 'orderList',
        component: orderList,
        // 添加路由元信息
        meta: {
          checkLogin: true
        }
      },
      {
        path: 'orderDetail/:orderid',
        component: orderDetail,
        // 添加路由元信息
        meta: {
          checkLogin: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 注册一个全局前置守卫
router.beforeEach((to, from, next) => {
  // 通过路由元信息判断是否需要检查登录
  if (to.meta.checkLogin == true) {
    // 发送请求看是否登录
    Vue.prototype.$axios.get('site/account/islogin').then(res => {
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
});

// 跳转后返回顶部，全局后置守卫
router.afterEach((to,from) => {
  window.scrollTo(0,0);
})

// 暴露出去
export default router;