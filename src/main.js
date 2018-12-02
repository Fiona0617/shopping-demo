// 引入全局的公共样式
import './assets/css/style.css'

import Vue from 'vue'
import App from './App.vue'
// 控制台不打印内容
Vue.config.productionTip = false

import router from './lib/router'
import store from './lib/store'
import './lib/filters'
import './lib/plugins'

new Vue({
  render: h => h(App),
  router,
  store,
  // 声明周期
  created() {
    // 每次实例创建完成后，都判断一次是否用户已登录
    // 因为一次会话刷新后就会消失，要重新判断
    this.$axios.get('site/account/islogin').then(res => {
      if (res.data.code == 'logined') {
        store.state.isLogin = true;
      }
    })
  }
}).$mount('#app')

window.onbeforeunload = function () {
  localStorage.setItem('cartInfo', JSON.stringify(store.state.cartTotal));
}
