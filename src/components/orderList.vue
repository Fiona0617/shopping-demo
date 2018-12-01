<template>
  <div class="right-auto">
    <div class="bg-wrap" style="min-height: 765px;">
      <div class="sub-tit">
        <ul>
          <li class="selected">
            <a href="/user/order-list.html">交易订单</a>
          </li>
        </ul>
      </div>
      <div class="table-wrap">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
          <tbody>
            <tr>
              <th width="16%" align="left">订单号</th>
              <th width="10%">姓名</th>
              <th width="12%">订单金额</th>
              <th width="11%">下单时间</th>
              <th width="10%">状态</th>
              <th width="12%">操作</th>
            </tr>
            <tr v-for="(item) in orderList" :key="item.id">
              <td>{{item.order_no}}</td>
              <td align="left">{{item.accept_name}}</td>
              <td align="left">
                <strong style="color: red;">￥{{item.order_amount}}</strong>
                <br>
                {{item.paymentTitle}}
              </td>
              <td align="left">{{item.add_time | timeFormatPlus}}</td>
              <td align="left">{{item.statusName}}</td>
              <td align="left" class="controls">
                <router-link :to="'/user/orderDetail/'+item.id">查看订单</router-link>
                <!-- <br> -->
                <!-- <a v-if="item.status==1" href="#/site/goods/payment/12" class>|去付款</a> -->
                <router-link v-if="item.status==1" :to="'/payDetail/'+item.id">|去付款</router-link>
                <!-- <br> -->
                <!-- <a href="javascript:void(0)">|取消</a> -->
                <!-- <br> -->
              </td>
            </tr>
          </tbody>
        </table>
        <div class="page-foot">
          <!-- element-ui分页组件 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalcount"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderList",
  data: function() {
    return {
      // 页码
      pageIndex: 1,
      // 页容量
      pageSize: 10,
      // 订单总条数
      totalcount: 0,
      // 订单信息
      orderList: []
    };
  },
  methods: {
    // 获取订单信息
    getOrderList(){
      // 调用接口：请求订单信息
      this.$axios
        .get(
          `site/validate/order/userorderlist?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(res => {
          this.totalcount = res.data.totalcount;
          this.orderList = res.data.message;
        }); 
    },
    // 分页组件：改变页容量触发
    handleSizeChange(val) {
      this.pageSize = val;
      // 获取订单列表信息
      this.getOrderList();
    },
    // 分页组件：改变页码触发
    handleCurrentChange(val) {
      this.pageIndex = val;
      // 获取订单列表信息
      this.getOrderList();
    }
  },
  created() {
    // 获取订单列表信息
    this.getOrderList();
  }
};
</script>

<style scoped>
.sub-tit {
  padding-top: 0;
}
.controls a {
  display: block;
}
</style>
