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

// 控制台不打印内容
Vue.config.productionTip = false

// 引入全局的公共样式
import './assets/css/style.css'

// 引入组件
import index from './components/index.vue'
import productDetail from './components/productDetail.vue'

let routes = [
  {path:'/',redirect:'/index'},
  {path:'/index',component:index},
  {path:'/productDetail/:id',component:productDetail}
]

const router = new VueRouter({
  routes
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

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
