import Vue from 'vue'

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