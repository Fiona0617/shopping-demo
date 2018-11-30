<template>
  <div id="app">
    <!-- 引入头部 -->
    <div class="header">
      <!-- 1.0 导航栏头部 -->
      <div class="head-top">
        <div class="section">
          <div class="left-box">
            <span>快乐购购购</span>
            <a target="_blank" href="#"></a>
            <a target="_blank" href="#"></a>
          </div>
          <div id="menu" class="right-box">
            <span v-if="!$store.state.isLogin">
              <router-link to="/login">登录</router-link>
              <strong>|</strong>
              <a href class>注册</a>
              <strong>|</strong>
            </span>
            <span v-if="$store.state.isLogin">
              <router-link to="/user">会员中心</router-link>
              <strong>|</strong>
              <a @click="loginOut">退出</a>
              <strong>|</strong>
            </span>
            <router-link to="/shopCart">
              <i class="iconfont icon-cart"></i>购物车(
              <span id="shoppingCartCount">
                <span>{{$store.getters.cartTotalNum}}</span>
              </span>)
            </router-link>
          </div>
        </div>
      </div>

      <!-- 2.0 导航条 -->
      <div class="head-nav">
        <div class="section">
          <div id="menu2" class="nav-box menuhd">
            <ul>
              <li class="index">
                <!-- <a href="#" class=""> -->
                <router-link to="/index">
                  <span class="out" style="top: 0px;">首页</span>
                </router-link>
                <!-- </a> -->
              </li>
              <li class="news">
                <a href="#" class>
                  <span class="out" style="top: 0px;">每日精选</span>
                </a>
              </li>
              <li class="photo">
                <a href="#" class>
                  <span class="out" style="top: 0px;">秒杀专区</span>
                </a>
              </li>
              <li class="video">
                <a href="#" class>
                  <span class="out" style="top: 0px;">快乐超市</span>
                </a>
              </li>
              <li class="down">
                <a href="#" class>
                  <span class="out" style="top: 0px;">会员权益</span>
                </a>
              </li>
              <li class="goods">
                <a href class>
                  <span class="out" style="top: 0px;">购物商城</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="search-box">
            <div class="input-box">
              <input
                id="keywords"
                name="keywords"
                type="text"
                onkeydown="if(event.keyCode==13){};"
                placeholder="输入关健字"
                x-webkit-speech
              >
            </div>
            <a href="javascript:;">
              <i class="iconfont icon-search"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- 路由出口 -->
    <router-view></router-view>
    <!-- 引入底部 -->
    <div class="footer">
      <div class="section">
        <div class="foot-nav">
          <a href>关于我们</a>
          <strong>|</strong>
          <a href>联系我们</a>
          <strong>|</strong>
          <a href>联系客服</a>
          <strong>|</strong>
          <a href>合作招商</a>
          <strong>|</strong>
          <a href>商家帮助</a>
          <strong>|</strong>
          <a href>营销中心</a>
          <strong>|</strong>
          <a href>隐私政策</a>
        </div>
        <div class="foot-box">
          <div class="copyright">
            <p>版权所有 快乐购购购</p>
            <p>公司地址： 联系电话：</p>
            <p class="gray">Copyright © 2009-2018 itcast Corporation,All Rights Reserved.</p>
          </div>
          <div class="service">
            <p>周一至周日 9:00-24:00</p>
            <a href="#">
              <i class="iconfont icon-phone"></i>在线客服
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods:{
    // 退出登录功能
    loginOut(){
        this.$axios.get('site/account/logout').then(res=>{
            if(res.data.status==0){
                this.$message({
                    message: res.data.message,
                    duration: 2000,
                    center: true
                });
                this.$router.push('/index');
                // 修改登录状态
                this.$store.state.isLogin = false;
            }
        });
    }
  }
};
</script>

<style>
</style>
