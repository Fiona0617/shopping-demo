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
              <el-form-item label="所属地区" prop="area" required>
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
                    <el-radio v-model="ruleForm.payment_id" :label="6">在线支付</el-radio>&nbsp;&nbsp;
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
                    <el-radio
                      v-model="ruleForm.express_id"
                      :label="1"
                      @change="ruleForm.expressMoment=22"
                    >顺丰</el-radio>&nbsp;
                    <em>费用：22.00元</em>
                  </label>
                  <label>
                    &nbsp;&nbsp;
                    <el-radio
                      v-model="ruleForm.express_id"
                      :label="2"
                      @change="ruleForm.expressMoment=18"
                    >圆通</el-radio>&nbsp;
                    <em>费用：18.00元</em>
                  </label>
                  <label>
                    &nbsp;&nbsp;
                    <el-radio
                      v-model="ruleForm.express_id"
                      :label="3"
                      @change="ruleForm.expressMoment=15"
                    >韵达</el-radio>&nbsp;
                    <em>费用：15.00元</em>
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
                      <router-link target="_blank" :to="'/productDetail/'+item.id">{{item.title}}</router-link>
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
                      <textarea
                        v-model="ruleForm.message"
                        name="message"
                        class="input"
                        style="height:35px;"
                      ></textarea>
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
                    <label id="expressFee" class="price">{{ruleForm.expressMoment}}</label> 元
                  </p>
                  <p class="txt-box">
                    应付总金额：￥
                    <label
                      id="totalAmount"
                      class="price"
                    >{{goodsTotalAmount+ruleForm.expressMoment}}</label>
                  </p>
                  <p class="btn-box">
                    <router-link to="/shopCart" class="btn button">返回购物车</router-link>
                    <a id="btnSubmit" class="btn submit" @click="submitOrder('ruleForm')">确认提交</a>
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
import VDistpicker from "v-distpicker";

export default {
  name: "submitOrder",
  // 注册省市联动插件
  components: { VDistpicker },
  // 数据
  data: function() {
    // 表单验证：自定义验证规则
    let checkMobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else {
        if (this.ruleForm.mobile !== "") {
          // 验证数据格式
          let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
          if (reg.test(value)) {
            // 匹配成功
            callback();
          } else {
            callback(new Error("请输入正确的手机号码！"));
          }
        }
      }
    };
    let checkEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入电子邮箱"));
      } else {
        if (this.ruleForm.email !== "") {
          // 验证数据格式
          let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
          if (reg.test(value)) {
            // 匹配成功
            callback();
          } else {
            callback(new Error("请输入正确的电子邮箱！"));
          }
        }
      }
    };
    let checkPostCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮政编码"));
      } else {
        if (this.ruleForm.post_code !== "") {
          // 验证数据格式
          let reg = /^[1-9]\d{5}(?!\d)$/;
          if (reg.test(value)) {
            // 匹配成功
            callback();
          } else {
            callback(new Error("请输入正确的邮政编码！"));
          }
        }
      }
    };
    // 数据
    return {
      // 选中的商品信息
      goodsList: [],
      // 商品总件数
      goodsTotalCount: 0,
      // 商品总金额（不含运费）
      goodsTotalAmount: 0,
      // 表单验证数据
      ruleForm: {
        accept_name: "cross",
        address: "西乡街道宝安大道海乐花园2栋22楼",
        mobile: "13245678765",
        email: "23456@qq.com",
        post_code: "518000",
        // 收货人地区
        area: {
          province: {
            code: "440000",
            value: "广东省"
          },
          city: {
            code: "440300",
            value: "深圳市"
          },
          area: {
            code: "440306",
            value: "宝安区"
          }
        },
        // 支付方式
        payment_id: 6,
        // 运送方式
        express_id: 1,
        // 快递费
        expressMoment: 22,
        // 订单备注信息
        message: "测试未修改的数据",
        // 商品总额
        goodsAmount: 0,
        // 购买商品的id
        goodsids: "",
        // 购买商品对象，id和数量
        cargoodsobj: {}
      },
      rules: {
        accept_name: [
          { required: true, message: "请输入收货人姓名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
          { min: 2, message: "长度大于2个字符", trigger: "blur" }
        ],
        mobile: [{ validator: checkMobile, trigger: "change" }],
        email: [{ validator: checkEmail, trigger: "change" }],
        post_code: [{ validator: checkPostCode, trigger: "blur" }]
      }
    };
  },
  created() {
    // 获取要提交订单的商品ids
    let selectedIds = this.$route.params.selectedIds;
    // 调用接口获取购物车中选中的商品信息
    this.$axios
      .get(`site/validate/order/getgoodslist/${selectedIds}`)
      .then(res => {
        res.data.message.forEach(ele => {
          for (const key in this.$store.state.cartTotal) {
            if (key == ele.id) {
              // 修改购买数量
              ele.buycount = this.$store.state.cartTotal[key];
              // 计算总的购买商品数量
              this.goodsTotalCount += ele.buycount;
              // 计算总的购买商品金额
              this.goodsTotalAmount += ele.buycount * ele.sell_price;
            }
          }
        });
        this.goodsList = res.data.message;
      });
  },
  methods: {
    // 选择最后一项时触发
    onSelected(data) {
      this.area = data;
    },
    // 点击提交订单
    submitOrder(formName) {
      // 校验表单
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 给ruleForm中的一些数据赋值
          this.goodsList.forEach(ele => {
            this.ruleForm.cargoodsobj[ele.id] = ele.buycount;
          });
          this.ruleForm.goodsAmount = this.goodsTotalAmount;
          this.ruleForm.goodsids = this.$route.params.selectedIds;
          // 调用接口提交订单
          this.$axios
            .post(`site/validate/order/setorder`, this.ruleForm)
            .then(res => {
              // 判断提交状态是否成功
              if (res.data.status == 0) {
                // 删除购物车中已提交订单的商品
                this.goodsList.forEach(ele => {
                  this.$store.commit("delCartById", ele.id);
                });
                // 跳转到支付页面
                this.$router.push(`/payDetail/${res.data.message.orderid}`);
              }
            });
        } else {
          this.$message.error("请填写完整信息后再提交订单！");
          return false;
        }
      });
    }
  }
};
</script>

<style >
</style>
