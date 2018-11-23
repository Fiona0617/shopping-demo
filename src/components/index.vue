<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a
          href="#/"
          class="router-link-active"
        >首页</a> &gt;
        <a
          href="#/site/goodslist"
          class="router-link-exact-active router-link-active"
        >购物商城</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="wrap-box">
          <div
            class="left-220"
            style="margin: 0px;"
          >
            <div class="banner-nav">
              <ul>
                <li v-for="(item, index) in catelist" :key="index">
                  <h3>
                    <i class="iconfont icon-arrow-right"></i>
                    <span>{{item.title}}</span>
                    <p>
                      <span v-for="(item, index) in item.subcates" :key="index">
                        {{item.title}}&nbsp;
                      </span>
                      
                    </p>
                  </h3>
                  <div class="item-box">
                    <dl>
                      <dt>
                        <a href="/goods/40.html">{{item.title}}</a>
                      </dt>
                      <dd>
                        <a v-for="(item, index) in item.subcates" :key="index" href="/goods/43.html">{{item.title}}</a>
                      </dd>
                    </dl>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--幻灯片-->
          <div class="left-705">
            <div class="banner-img">
              <div
                id="focus-box"
                class="focus-box"
              >
                <ul class="slides">
                  <li
                    class=""
                    style="width: 100%;height:100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;"
                  >
                    <a href="/goods.html">
                      <img
                        style="width: 100%;height:100%;"
                        src="http://39.108.135.214:8899/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg"
                        draggable="false"
                      >
                    </a>
                  </li>
                  <li
                    style="width: 100%;height:100%; float: left; margin-right: -100%; position: relative; opacity: 1; display: block; z-index: 2;"
                    class="flex-active-slide"
                  >
                    <a href="/goods.html">
                      <img
                        style="width: 100%;height:100%;"
                        src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200314272543.jpg"
                        draggable="false"
                      >
                    </a>
                  </li>
                </ul>
                <ol class="flex-control-nav flex-control-paging">
                  <li>
                    <a class="">1</a>
                  </li>
                  <li>
                    <a class="flex-active">2</a>
                  </li>
                </ol>
              </div>

            </div>
          </div>
          <!--/幻灯片-->
          <div class="left-220">
            <ul class="side-img-list">
              <li
                v-for="(item, index) in toplist"
                :key="index"
              >
                <div class="img-box">
                  <label>{{index+1}}</label>
                  <img :src="item.img_url">
                </div>
                <div class="txt-box">
                  <a href="/goods/show-98.html">{{item.title}}</a>
                  <span>{{item.add_time | timeFormat}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="section" v-for="(item, index) in level1cate" :key="index">
      <div class="main-tit">
        <h2>{{item.catetitle}}</h2>
        <p>
          <a v-for="(item, index) in item.level2catelist" :key="index" href="/goods/43.html">{{item.subcatetitle}}</a>
          <a href="/goods/40.html">更多
            <i>+</i>
          </a>
        </p>
      </div>
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <ul class="img-list">
            <li v-for="(item, index) in item.datas" :key="index">
              <a
                href="#/site/goodsinfo/87"
                class=""
              >
                <div class="img-box">
                  <img :src="item.img_url">
                </div>
                <div class="info">
                  <h3>{{item.artTitle}}</h3>
                  <p class="price">
                    <b>{{item.sell_price}}</b>元</p>
                  <p>
                    <strong>库存 {{item.stock_quantity}}</strong>
                    <span>市场价：
                      <s>{{item.market_price}}</s>
                    </span>
                  </p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
const moment = require('moment');

export default {
  name: 'index',
  data: function() {
    return {
      // 分类列表
      catelist: [],
      // 轮播图列表
      sliderlist: [],
      // 顶部推广
      toplist: [],
      // 一级分类分组数据
      level1cate:[]
    };
  },
  // 过滤器
  filters: {
    // 时间格式化
    timeFormat: function(value) {
      return moment(value).format('YYYY-MM-DD');
    }
  },
  // 声明周期钩子
  created() {
    // 调用axios方法请求首页顶部的 轮播图，置顶，分类导航数据，接口1.1
    axios
      .get('http://111.230.232.110:8899/site/goods/gettopdata/goods')
      .then(res => {
        console.log(res);
        this.catelist = res.data.message.catelist;
        this.sliderlist = res.data.message.sliderlist;
        this.toplist = res.data.message.toplist;
      });
    // 调用axios方法请求按照分类分组数据，接口1.2
    axios
      .get('http://111.230.232.110:8899/site/goods/getgoodsgroup')
      .then(res => {
        console.log(res);
        this.level1cate = res.data.message;
      });
  }
};
</script>

<style>
</style>
