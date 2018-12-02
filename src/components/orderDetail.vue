<template>
  <div class="right-auto">
    <div class="bg-wrap" style="min-height: 765px;">
      <div class="sub-tit">
        <!-- <a href="javascript:void(0)" class="add">
          <i class="iconfont icon-reply"></i>返回
        </a>-->
        <router-link to="/user/orderList" class="add">
          <i class="iconfont icon-reply"></i>返回
        </router-link>
        <ul>
          <li class="selected">
            <a href="javascript:;">查看订单</a>
          </li>
        </ul>
      </div>
      <div class="order-progress">
        <ul>
          <li :class="{active:orderinfo.status>=1}" class="first">
            <div class="progress">下单</div>
            <div class="info">{{orderinfo.add_tiem | timeFormatPlus}}</div>
          </li>
          <li :class="{active:orderinfo.status>=2}" class>
            <div class="progress">已付款</div>
            <div class="info">{{orderinfo.payment_time | timeFormatPlus}}</div>
          </li>
          <li :class="{active:orderinfo.status>=3}" class>
            <div class="progress">已经发货</div>
            <div class="info">{{orderinfo.express_time | timeFormatPlus}}</div>
          </li>
          <li :class="{active:orderinfo.status>=4}" class="last">
            <div class="progress">已完成</div>
            <div class="info">{{orderinfo.complete_time | timeFormatPlus}}</div>
          </li>
        </ul>
      </div>
      <div class="form-box accept-box form-box1">
        <dl class="head form-group">
          <dd>
            订单号：{{orderinfo.order_no}}
            <!-- <a
              href="#/site/goods/payment/12"
              class="btn-pay"
            >去付款</a>-->
            <router-link
              v-if="orderinfo.status==1"
              :to="'/payDetail/'+this.$route.params.orderid"
              class="btn-pay"
            >去付款</router-link>
            <a
              v-if="orderinfo.status==2 || orderinfo.status==3"
              @click="receiveGoods"
              class="btn-pay"
            >确认收货</a>
            <a v-if="orderinfo.status==4" class="btn-pay">去评价</a>
            <!---->
          </dd>
        </dl>
        <dl class="form-group">
          <dt>订单状态：</dt>
          <dd>{{orderinfo.statusName}}</dd>
        </dl>
        <dl class="form-group">
          <dt>快递单号：</dt>
          <dd>待更新！！！</dd>
        </dl>
        <dl class="form-group">
          <dt>支付方式：</dt>
          <dd>{{orderinfo.paymentTitle}}</dd>
        </dl>
      </div>
      <div class="table-wrap">
        <table width="100%" border="0" cellspacing="0" cellpadding="5" class="ftable">
          <tbody>
            <tr>
              <th align="left">商品信息</th>
              <th width="60%">名称</th>
              <th width="10%">单价</th>
              <th width="10%">数量</th>
              <th width="10%">金额</th>
            </tr>
            <tr v-for="(item) in goodslist" :key="item.goods_id">
              <td width="60">
                <img :src="item.imgurl" class="img">
              </td>
              <td align="left">
                <router-link
                  target="_blank"
                  :to="'/productDetail/'+item.goods_id"
                >{{item.goods_title}}</router-link>
              </td>
              <td align="center">
                <s>￥{{item.goods_price}}</s>
                <p>￥{{item.real_price}}</p>
              </td>
              <td align="center">{{item.quantity}}</td>
              <td align="center">￥{{item.quantity*item.real_price}}</td>
            </tr>
            <tr>
              <td colspan="7" align="right">
                <p>
                  商品金额：
                  <b class="red">￥{{orderinfo.payable_amount}}</b>&nbsp;&nbsp;+&nbsp;&nbsp;运费：
                  <b class="red">￥{{orderinfo.express_fee}}</b>
                </p>
                <p style="font-size: 22px;">
                  应付总金额：
                  <b class="red">￥{{orderinfo.order_amount}}</b>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="form-box accept-box">
        <dl class="head form-group">
          <dd>收货信息</dd>
        </dl>
        <dl class="form-group">
          <dt>顾客姓名：</dt>
          <dd>{{orderinfo.accept_name}}</dd>
        </dl>
        <dl class="form-group">
          <dt>送货地址：</dt>
          <dd>{{orderinfo.area}} {{orderinfo.address}}</dd>
        </dl>
        <dl class="form-group">
          <dt>联系电话：</dt>
          <dd>{{orderinfo.mobile}}</dd>
        </dl>
        <dl class="form-group">
          <dt>电子邮箱：</dt>
          <dd>{{orderinfo.email}}</dd>
        </dl>
        <dl class="form-group">
          <dt>备注留言：</dt>
          <dd>{{orderinfo.message}}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderDetail",
  data: function() {
    return {
      // 订单里的商品列表
      goodslist: [],
      // 订单信息
      orderinfo: {}
    };
  },
  methods: {
    // 获取订单信息
    getOrderInfo() {
      // 调用接口：根据订单id获取订单详细信息
      this.$axios
        .get(`site/validate/order/getorderdetial/${this.$route.params.orderid}`)
        .then(res => {
          this.goodslist = res.data.message.goodslist;
          this.orderinfo = res.data.message.orderinfo;
        });
    },
    // 确认收货
    receiveGoods() {
      // elememt-ui弹窗
      this.$confirm("此操作后将把钱打入商家账户，是否确认收货?", "温馨提示", {
        confirmButtonText: "确定收货",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // 调用接口：签收
        this.$axios
          .get(`site/validate/order/complate/${this.$route.params.orderid}`)
          .then(res => {
            if (res.data.status == 0) {
              // 提示收货成功
              this.$message({
                type: "success",
                message: res.data.message
              });
              // 重新获取订单信息
              this.getOrderInfo();
            }
          });
      });
    }
  },
  created() {
    // 获取订单信息
    this.getOrderInfo();
  }
};
</script>

<style scoped>
.sub-tit {
  padding-top: 0;
}
</style>
