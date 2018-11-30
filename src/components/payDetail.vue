<template>
  <div>
    <div>
      <div class="section">
        <div class="location">
          <span>当前位置：</span>
          <a href="/index.html">首页</a> &gt;
          <a href="javascript:;">支付中心</a>
        </div>
      </div>

      <div class="section">
        <div class="wrapper">
          <div class="bg-wrap">
            <div class="nav-tit pay">
              <a href="javascript:;" class="selected">支付中心</a>
            </div>
            <div class="form-box payment">
              <div class="el-row">
                <div class="el-col el-col-18">
                  <div class="el-row">
                    <div class="el-col el-col-12">
                      <dl class="form-group">
                        <dt>订 单 号：</dt>
                        <dd>{{orderInfos.order_no}}</dd>
                      </dl>
                    </div>
                    <div class="el-col el-col-12">
                      <dl class="form-group">
                        <dt>收货人姓名：</dt>
                        <dd>{{orderInfos.accept_name}}</dd>
                      </dl>
                    </div>
                  </div>
                  <div class="el-row">
                    <div class="el-col el-col-12">
                      <dl class="form-group">
                        <dt>送货地址：</dt>
                        <dd>{{orderInfos.area+orderInfos.address}}</dd>
                      </dl>
                    </div>
                    <div class="el-col el-col-12">
                      <dl class="form-group">
                        <dt>手机号码：</dt>
                        <dd>{{orderInfos.mobile}}</dd>
                      </dl>
                    </div>
                  </div>
                  <div class="el-row">
                    <div class="el-col el-col-12">
                      <dl class="form-group">
                        <dt>支付金额：</dt>
                        <dd>{{orderInfos.order_amount}} 元</dd>
                      </dl>
                    </div>
                    <div class="el-col el-col-12">
                      <dl class="form-group">
                        <dt>支付方式：</dt>
                        <dd>在线支付</dd>
                      </dl>
                    </div>
                  </div>
                  <div class="el-row">
                    <div class="el-col el-col-12">
                      <dl class="form-group">
                        <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                        <dd>{{orderInfos.message}}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div class="el-col el-col-6">
                  <div id="container2">
                      <!-- vue-qrcode二维码插件 -->
                      <qrcode :value="qrcodeUrl" :options="{ size: 200 }"></qrcode>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import VueQrcode from "@xkeshi/vue-qrcode";

export default {
  name: "payDetail",
  components: { [VueQrcode.name]: VueQrcode },
  data: function() {
    return {
      // 订单信息
      orderInfos: {},
      // 支付二维码链接
      qrcodeUrl: `http://111.230.232.110:8899/site/validate/pay/alipay/${this.$route.params.orderId}`,
      // 计时器
      timeId:0
    };
  },
  created() {
    // 获取订单id
    let orderid = this.$route.params.orderId;
    // 调用接口，获取订单信息
    this.$axios.get(`site/validate/order/getorder/${orderid}`).then(res => {
      this.orderInfos = res.data.message[0];
    });
    // 调用接口获取支付状态
    this.timeId = setInterval(()=>{
      this.$axios.get(`site/validate/order/getorder/${orderid}`).then(res => {
        let orderStatus = res.data.message[0].status;
        if(orderStatus==2){
          // 跳转到支付成功页面
          this.$router.push('/paySuccess');
          // 清除计时器
          clearInterval(this.timeId);
        }
      });
    },2000)
  }
};
</script>

<style>
</style>
