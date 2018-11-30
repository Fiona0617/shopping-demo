<template>
  <div>
    <div class="el-row">
      <div class="el-col el-col-24">
        <div class="comp">
          <div class="tmpl routeanimate">
            <div class="section">
              <div class="location">
                <span>当前位置：</span>
                <router-link to="/index">首页</router-link>&gt;
                <router-link to="/user">会员中心</router-link>
              </div>
            </div>
            <div class="section clearfix">
              <div class="left-260">
                <div class="bg-wrap">
                  <div class="avatar-box">
                    <a href="/user/center/avatar.html" class="img-box">
                      <!-- <i class="iconfont icon-user-full"></i> -->
                      <img src="../assets/img/girl.jpg" alt>
                    </a>
                    <h3>ivanyb</h3>
                    <p>
                      <b>注册会员</b>
                    </p>
                  </div>
                  <div class="center-nav">
                    <ul>
                      <li>
                        <h2>
                          <i class="iconfont icon-order"></i>
                          <span>订单管理</span>
                        </h2>
                        <div class="list">
                          <p>
                            <router-link to="/user/orderList">
                              <i class="iconfont icon-arrow-right"></i>交易订单
                            </router-link>
                          </p>
                        </div>
                      </li>
                      <li>
                        <h2>
                          <i class="iconfont icon-user"></i>
                          <span>账户管理</span>
                        </h2>
                        <div class="list">
                          <p>
                            <a href="#" class="router-link-exact-active">
                              <i class="iconfont icon-arrow-right"></i>账户资料
                            </a>
                          </p>
                          <p>
                            <a href="#" class="router-link-exact-active">
                              <i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置
                            </a>
                          </p>
                          <p>
                            <a href="#" class="router-link-exact-active">
                              <i class="iconfont icon-arrow-right"></i>修改密码
                            </a>
                          </p>
                          <p>
                            <a @click="loginOut">
                              <i class="iconfont icon-arrow-right"></i>退出登录
                            </a>
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userInfo",
  methods: {
    // 退出登录功能
    loginOut() {
      this.$axios.get("site/account/logout").then(res => {
        if (res.data.status == 0) {
          this.$message({
            message: res.data.message,
            duration: 2000,
            center: true
          });
          this.$router.push("/index");
          // 修改登录状态
          this.$store.state.isLogin = false;
        }
      });
    }
  }
};
</script>

<style scoped>
.avatar-box {
  height: auto;
}
</style>
