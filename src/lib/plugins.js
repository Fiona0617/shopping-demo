import Vue from 'vue'

// 导入框架，按需引入
import {
  Carousel,
  CarouselItem,
  InputNumber,
  Message,
  Switch,
  Button,
  Input,
  Radio,
  Form,
  FormItem,
  Pagination,
  MessageBox
} from 'element-ui';
// 已经在index.html中引入
// import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Carousel); //注册
Vue.use(CarouselItem);
Vue.use(InputNumber);
Vue.use(Switch);
Vue.use(Button);
Vue.use(Input);
Vue.use(Radio);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Pagination);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

// 导入并注册iview框架，按需引入
import {
  Page,
  Affix,
  BackTop
} from 'iview';
// 已经在index.html中引入
// import 'iview/dist/styles/iview.css';
Vue.component('Page', Page);
Vue.component('Affix', Affix);
Vue.component('BackTop', BackTop);

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