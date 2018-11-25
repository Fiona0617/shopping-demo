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
                <li
                  v-for="(item) in catelist"
                  :key="item.id"
                >
                  <h3>
                    <i class="iconfont icon-arrow-right"></i>
                    <span>{{item.title}}</span>
                    <p>
                      <span
                        v-for="(it) in item.subcates"
                        :key="it.id"
                      >
                        {{it.title}}&nbsp;
                      </span>

                    </p>
                  </h3>
                  <div class="item-box">
                    <dl>
                      <dt>
                        <a href="/goods/40.html">{{item.title}}</a>
                      </dt>
                      <dd>
                        <a
                          v-for="(it) in item.subcates"
                          :key="it.id"
                          href="/goods/43.html"
                        >{{it.title}}</a>
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
              <el-carousel height="341px">
                <el-carousel-item
                  v-for="item in sliderlist"
                  :key="item.id"
                >
                  <img
                    :src="item.img_url"
                    alt=""
                  >
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <!--/幻灯片-->
          <div class="left-220">
            <ul class="side-img-list">
              <li
                v-for="(item, index) in toplist"
                :key="item.id"
              >
                <div class="img-box">
                  <label>{{index+1}}</label>
                  <img :src="item.img_url">
                </div>
                <div class="txt-box">
                  <router-link :to="'/productDetail/'+item.id">
                    {{item.title}}
                  </router-link>
                  <span>{{item.add_time | timeFormat}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
      class="section"
      v-for="(item) in level1cate"
      :key="item.level1cateid"
    >
      <div class="main-tit">
        <h2>{{item.catetitle}}</h2>
        <p>
          <a
            v-for="(it) in item.level2catelist"
            :key="it.subcateid"
            href="/goods/43.html"
          >{{it.subcatetitle}}</a>
          <a href="/goods/40.html">更多
            <i>+</i>
          </a>
        </p>
      </div>
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <ul class="img-list">
            <li
              v-for="(it) in item.datas"
              :key="it.artID"
            >
              <router-link :to="'/productDetail/'+it.artID">
                <div class="img-box">
                  <img :src="it.img_url">
                </div>
                <div class="info">
                  <h3>{{it.artTitle}}</h3>
                  <p class="price">
                    <b>{{it.sell_price}}</b>元</p>
                  <p>
                    <strong>库存 {{it.stock_quantity}}</strong>
                    <span>市场价：
                      <s>{{it.market_price}}</s>
                    </span>
                  </p>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>



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
      level1cate: []
    };
  },
  // 声明周期钩子
  created() {
    // 调用axios方法请求首页顶部的 轮播图，置顶，分类导航数据，接口1.1
    this.$axios
      .get('site/goods/gettopdata/goods')
      .then(res => {
        console.log(res);
        this.catelist = res.data.message.catelist;
        this.sliderlist = res.data.message.sliderlist;
        this.toplist = res.data.message.toplist;
      });
    // 调用axios方法请求按照分类分组数据，接口1.2
    this.$axios
      .get('site/goods/getgoodsgroup')
      .then(res => {
        console.log(res);
        this.level1cate = res.data.message;
      });
  }
};
</script>

<style>
/* 覆盖轮播图插件原有图片样式 */
.banner-img img {
  width: 100%;
}
</style>
