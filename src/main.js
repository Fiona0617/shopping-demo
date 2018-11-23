import Vue from 'vue'
import App from './App.vue'
// 引入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

Vue.config.productionTip = false

// 引入全局的公共样式
import './assets/css/style.css'

// 引入组件
import index from './components/index.vue'

let routes = [
  {path:'/',redirect:'/index'},
  {path:'/index',component:index}
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
