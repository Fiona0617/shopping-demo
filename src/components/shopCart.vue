<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2>
              <i class="iconfont icon-cart"></i>我的购物车</h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li>
                  <div class="progress">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <!--商品列表-->
          <div class="cart-box">
            <input
              id="jsondata"
              name="jsondata"
              type="hidden"
            >
            <table
              width="100%"
              align="center"
              class="cart-table"
              border="0"
              cellspacing="0"
              cellpadding="8"
            >
              <tbody>
                <tr>
                  <th
                    width="48"
                    align="center"
                  >
                    <a>选择</a>
                  </th>
                  <th align="center">商品信息</th>
                  <th
                    width="84"
                    align="left"
                  >单价</th>
                  <th
                    width="104"
                    align="left"
                  >金额(元)</th>
                  <th
                    width="54"
                    align="center"
                  >操作</th>
                </tr>
                <tr
                  v-for="(item) in cartInfos"
                  :key="item.id"
                >
                  <td>
                    <el-switch
                      v-model="item.isChecked"
                      active-color="#13ce66"
                      inactive-color="#555555"
                    >
                    </el-switch>
                  </td>
                  <td>
                    <img
                      :src="item.img_url"
                      alt=""
                    >
                    <span>{{item.title}}</span>
                  </td>
                  <td>
                    <span>{{item.sell_price}}</span>
                  </td>
                  <td>
                    <span>{{item.buycount*item.sell_price}}</span>
                  </td>
                  <td>
                    <el-input-number
                      size="small"
                      v-model="item.buycount"
                      :min="1"
                    ></el-input-number>
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      @click="deleteCartById(item.id)"
                      circle
                    ></el-button>
                  </td>
                </tr>
                <tr v-if="cartInfos.length==0">
                  <td colspan="10">
                    <div class="msg-tips">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"></i>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>您的购物车为空，
                          <a href="/index.html">马上去购物</a>吧！</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th
                    align="right"
                    colspan="8"
                  >
                    已选择商品
                    <b
                      class="red"
                      id="totalQuantity"
                    >{{cartTotalNum}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b
                      class="red"
                      id="totalAmount"
                    >{{cartTotalMoney}}</b>元
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <!--/商品列表-->
          <!--购物车底部-->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <router-link to="/index">
                <button class="button">继续购物</button>
              </router-link>
              <router-link :to="'/submitOrder/'+selectedIds">
                <button class="submit">立即结算</button>
              </router-link>
            </div>
          </div>
          <!--购物车底部-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shopCart',
  data: function() {
    return {
      // 购物车产品信息
      cartInfos: []
    };
  },
  watch: {
    // 侦听购买数量的变化
    cartInfos: {
      handler: function(val, oldVal) {
        // 修改仓库中的购物车信息
        let obj = {};
        val.forEach(ele => {
          obj[ele.id] = ele.buycount;
        });
        this.$store.commit('updateCart', obj);
      },
      deep: true
    }
  },
  computed: {
    // 商品总件数
    cartTotalNum: function() {
      let sum = 0;
      this.cartInfos.forEach(ele => {
        if (ele.isChecked) {
          sum += ele.buycount;
        }
      });
      return sum;
    },
    // 商品总金额
    cartTotalMoney: function() {
      let sum = 0;
      this.cartInfos.forEach(ele => {
        if (ele.isChecked) {
          sum += ele.buycount * ele.sell_price;
        }
      });
      return sum;
    },
    // 选中的要结算的商品ids
    selectedIds:function(){
      let ids = '';
      this.cartInfos.forEach(ele=>{
        if(ele.isChecked==true){
          ids += ele.id;
          ids += ',';
        }
      })
      ids = ids.slice(0,ids.length-1);
      return ids;
    }
  },
  methods: {
    // 删除某条产品
    deleteCartById(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '温馨提示', {
        confirmButtonText: '狠心删除',
        cancelButtonText: '再看看吧',
        type: 'warning'
      })
        .then(() => {
          this.cartInfos.forEach((ele, index) => {
            if (ele.id == id) {
              this.cartInfos.splice(index, 1);
              // 提示删除成功
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          });
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    }
  },
  created() {
    // 获取商品ids
    let ids = '';
    for (const key in this.$store.state.cartTotal) {
      ids += key;
      ids += ',';
    }
    ids = ids.substring(0, ids.length - 1);
    // 通过接口获取购物车信息
    this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(res => {
      res.data.message.forEach(ele => {
        ele.buycount = this.$store.state.cartTotal[ele.id];
        ele.isChecked = true;
      });
      this.cartInfos = res.data.message;
    });
  }
};
</script>

<style>
tbody td:nth-child(2) {
  display: flex;
  align-items: center;
}
tbody td:nth-child(5) {
  display: flex;
  justify-content: space-between;
}
tbody img {
  width: 60px;
}
</style>
