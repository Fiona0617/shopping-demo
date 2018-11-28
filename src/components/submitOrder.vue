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
              <i class="iconfont icon-cart"></i>我的购物车
            </h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li class="active">
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
          <div class="cart-box">
            <h2 class="slide-tit">
              <span>1、收货地址</span>
            </h2>
            <!-- element-ui表单验证组件 开始 -->
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="form-box"
            >
              <el-form-item label="收货人姓名" prop="accept_name">
                <el-input v-model="ruleForm.accept_name"></el-input>
              </el-form-item>
              <!-- 省市联动插件distpicker -->
              <el-form-item label="所属地区" prop="area">
                <v-distpicker
                  :province="ruleForm.area.province.value"
                  :city="ruleForm.area.city.value"
                  :area="ruleForm.area.area.value"
                  @selected="onSelected"
                ></v-distpicker>
              </el-form-item>
              <!-- 省市联动插件distpicker -->
              <el-form-item label="详细地址" prop="address">
                <el-input v-model="ruleForm.address"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="mobile">
                <el-input v-model="ruleForm.mobile"></el-input>
              </el-form-item>
              <el-form-item label="电子邮箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
              </el-form-item>
              <el-form-item label="邮政编码" prop="post_code">
                <el-input v-model="ruleForm.post_code"></el-input>
              </el-form-item>

              <h2 class="slide-tit">
                <span>2、支付方式</span>
              </h2>
              <ul class="item-box clearfix">
                <!--取得一个DataTable-->
                <li>
                  <label>
                    <input
                      name="payment_id"
                      type="radio"
                      onclick="paymentAmountTotal(this);"
                      value="1"
                    >
                    <input name="payment_price" type="hidden" value="0.00">在线支付
                    <em>手续费：0.00元</em>
                  </label>
                </li>
              </ul>
              <h2 class="slide-tit">
                <span>3、配送方式</span>
              </h2>
              <ul class="item-box clearfix">
                <!--取得一个DataTable-->
                <li>
                  <label>
                    <input
                      name="express_id"
                      type="radio"
                      onclick="freightAmountTotal(this);"
                      value="1"
                      data-type="*"
                      sucmsg=" "
                    >
                    <input name="express_price" type="hidden" value="20.00">顺丰快递
                    <em>费用：20.00元</em>
                    <span class="Validform_checktip"></span>
                  </label>
                </li>
              </ul>
              <h2 class="slide-tit">
                <span>4、商品清单</span>
              </h2>
              <div class="line15"></div>
              <table
                width="100%"
                border="0"
                align="center"
                cellpadding="8"
                cellspacing="0"
                class="cart-table"
              >
                <tbody>
                  <tr>
                    <th colspan="2" align="left">商品信息</th>
                    <th width="84" align="left">单价</th>
                    <th width="84" align="center">购买数量</th>
                    <th width="104" align="left">金额(元)</th>
                  </tr>
                  <tr v-for="(item) in goodsList" :key="item.id">
                    <td width="68">
                      <a target="_blank" href="/goods/show-89.html">
                        <img :src="item.img_url" class="img">
                      </a>
                    </td>
                    <td>
                      <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                    </td>
                    <td>
                      <span class="red">￥{{item.sell_price}}</span>
                    </td>
                    <td align="center">{{item.buycount}}</td>
                    <td>
                      <span class="red">￥{{item.sell_price*item.buycount}}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="line15"></div>
              <h2 class="slide-tit">
                <span>5、结算信息</span>
              </h2>
              <div class="buy-foot clearfix">
                <div class="left-box">
                  <dl>
                    <dt>订单备注(100字符以内)</dt>
                    <dd>
                      <textarea name="message" class="input" style="height:35px;"></textarea>
                    </dd>
                  </dl>
                </div>
                <div class="right-box">
                  <p>
                    商品
                    <label class="price">{{goodsTotalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                    <label
                      id="goodsAmount"
                      class="price"
                    >{{goodsTotalAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                  <p>
                    运费：￥
                    <label id="expressFee" class="price">0.00</label> 元
                  </p>
                  <p class="txt-box">
                    应付总金额：￥
                    <label id="totalAmount" class="price">{{goodsTotalAmount}}</label>
                  </p>
                  <p class="btn-box">
                    <router-link to="/shopCart" class="btn button">返回购物车</router-link>
                    <a id="btnSubmit" class="btn submit">确认提交</a>
                  </p>
                </div>
              </div>
            </el-form>
            <!-- element-ui表单验证组件 结束 -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* 引入省市联动插件 */
import VDistpicker from 'v-distpicker'

export default {
  name: 'submitOrder',
  // 注册省市联动插件
  components: { VDistpicker },
  // 数据
  data:function(){
    // 表单验证：自定义验证规则
    let checkMobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'));
      } else {
        if (this.ruleForm.mobile !== '') {
          // 验证数据格式
          let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
          if(reg.test(value)){
            // 匹配成功
            callback();
          }else{
            callback(new Error('请输入正确的手机号码！'));
          }
        }
      }
    };
    let checkEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入电子邮箱'));
      } else {
        if (this.ruleForm.email !== '') {
          // 验证数据格式
          let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
          if(reg.test(value)){
            // 匹配成功
            callback();
          }else{
            callback(new Error('请输入正确的电子邮箱！'));
          }
        }
      }
    };
    let checkPostCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮政编码'));
      } else {
        if (this.ruleForm.post_code !== '') {
          // 验证数据格式
          let reg = /^[1-9]\d{5}(?!\d)$/;
          if(reg.test(value)){
            // 匹配成功
            callback();
          }else{
            callback(new Error('请输入正确的邮政编码！'));
          }
        }
      }
    };
    // 数据
    return {
      // 选中的商品信息
      goodsList:[],
      // 商品总件数
      goodsTotalCount:0,
      // 商品总金额（不含运费）
      goodsTotalAmount:0,
      // 表单验证数据
      ruleForm: {
        accept_name: '',
        address: '',
        mobile: '',
        email: '',
        post_code: '',
        area:{
          "province": {
            "code": "440000",
            "value": "广东省"
          },
          "city": {
            "code": "440300",
            "value": "深圳市"
          },
          "area": {
            "code": "440306",
            "value": "宝安区"
          }
        }
      },
      rules: {
        accept_name: [
          { required: true, message: '请输入收货人姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
          { min: 2, message: '长度大于2个字符', trigger: 'blur' }
        ],
        mobile: [
          { validator: checkMobile, trigger: 'change' }
        ],
        email: [
          { validator: checkEmail, trigger: 'change' }
        ],
        post_code: [
          { validator: checkPostCode, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // 获取要提交订单的商品ids
    let selectedIds = this.$route.params.selectedIds;
    // 调用接口获取购物车中选中的商品信息
    this.$axios.get(`site/validate/order/getgoodslist/${selectedIds}`).then(res=>{
      res.data.message.forEach(ele=>{
        for(const key in this.$store.state.cartTotal){
          if(key == ele.id){
            // 修改购买数量
            ele.buycount = this.$store.state.cartTotal[key];
            // 计算总的购买商品数量
            this.goodsTotalCount += ele.buycount;
            // 计算总的购买商品金额
            this.goodsTotalAmount += ele.buycount*ele.sell_price;
          }
        }
      });
      this.goodsList = res.data.message;
    })
  },
  methods:{
    // 选择最后一项时触发
    onSelected(data) {
      this.area = data;
    }
  }
};
</script>

<style>
.el-input {
  width: 50%;
}
</style>
