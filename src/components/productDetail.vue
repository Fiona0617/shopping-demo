<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a> &gt;
        <a href="/goods/42/1.html">商品详情</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <div class="left-925">
            <div class="goods-box clearfix">
              <div class="pic-box">
                <!-- 放大镜插件 -->
                <ProductZoomer
                  v-if="images.normal_size.length!=0"
                  :base-images="images"
                  :base-zoomer-options="zoomerOptions"
                />
              </div>
              <div class="goods-spec">
                <h1>{{goodsinfo.title}}</h1>
                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em
                        id="commoditySellPrice"
                        class="price"
                      >¥{{goodsinfo.sell_price}}</em>
                    </dd>
                  </dl>
                </div>
                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <el-input-number
                          v-model="buyCount"
                          :min="1"
                          :max="goodsinfo.stock_quantity"
                          label="描述文字"
                        ></el-input-number>
                      </div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div
                        id="buyButton"
                        class="btn-buy"
                      >
                        <button
                          @click="buyToCart"
                          class="buy"
                        >立即购买</button>
                        <button
                          @click="addtoCart"
                          class="add"
                        >加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div
              id="goodsTabs"
              class="goods-tab bg-wrap"
            >
              <Affix>
                <div
                  id="tabHead"
                  class="tab-head"
                  style="position: static; top: 517px; width: 925px;"
                >
                  <ul>
                    <li>
                      <a
                        href="javascript:;"
                        @click="tabIndex=0"
                        :class="{selected:tabIndex==0}"
                      >商品介绍</a>
                    </li>
                    <li>
                      <a
                        href="javascript:;"
                        @click="tabIndex=1"
                        :class="{selected:tabIndex==1}"
                      >商品评论</a>
                    </li>
                  </ul>
                </div>
              </Affix>
              <div
                class="tab-content entry"
                v-show="tabIndex==0"
                v-html="goodsinfo.content"
              >
              </div>
              <div
                class="tab-content"
                v-show="tabIndex==1"
              >
                <div class="comment-box">
                  <div
                    id="commentForm"
                    name="commentForm"
                    class="form-box"
                  >
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea
                          id="txtContent"
                          name="txtContent"
                          sucmsg=" "
                          datatype="*10-1000"
                          nullmsg="请填写评论内容！"
                          v-model.trim="inputComment"
                        ></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input
                          id="btnSubmit"
                          name="submit"
                          type="button"
                          value="提交评论"
                          class="submit"
                          @click="submitComment"
                        >
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </div>
                  <ul
                    id="commentList"
                    class="list-box"
                  >
                    <p
                      v-show="comTotal==0"
                      style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"
                    >暂无评论，快来抢沙发吧！</p>
                    <li
                      v-for="(item) in commentsList"
                      :key="item.id"
                    >
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>{{item.user_name}}</span>
                          <span>{{item.add_time | timeFormatPlus}}</span>
                        </div>
                        <p>{{item.content}}</p>
                      </div>
                    </li>
                  </ul>
                  <div
                    class="page-box"
                    style="margin: 5px 0px 0px 62px;"
                  >
                    <!-- 使用iview分页组件 -->
                    <Page
                      :total="comTotal"
                      :current="pageIndex"
                      show-sizer
                      show-elevator
                      :page-size="pageSize"
                      @on-change="changePage"
                      @on-page-size-change="changePageSize"
                      placement="top"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                  <li
                    v-for="(item) in hotgoodslist"
                    :key="item.id"
                  >
                    <div class="img-box">
                      <router-link :to="'/productDetail/'+item.id">
                        <img :src="item.img_url">
                      </router-link>
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
      </div>
    </div>
    <!-- 使用iview框架组件 返回顶部 -->
    <BackTop></BackTop>
  </div>
</template>

<script>
export default {
  name: 'productDetail',
  data: function() {
    return {
      goodsinfo: {},
      hotgoodslist: [],
      imglist: [],
      // 购买数量
      buyCount: 1,
      // 评论和详情索引
      tabIndex: 0,
      // 当前页码
      pageIndex: 1,
      // 每页显示的评论数
      pageSize: 10,
      // 评论列表
      commentsList: [],
      // 评论总条数
      comTotal: 0,
      // 输入的评论内容
      inputComment: '',
      // 放大镜数据
      images: {
        normal_size: []
      },
      zoomerOptions: {
        zoomFactor: 3,
        pane: 'pane',
        hoverDelay: 300,
        namespace: 'zoomer',
        move_by_click: false,
        scroll_items: 7,
        choosed_thumb_border_color: '#dd2c00'
      }
    };
  },
  watch: {
    // 观察url地址的参数值变化
    $route: function() {
      // 清空原来的放大镜数据
      this.images.normal_size = [];
      this.initData();
    }
  },
  methods: {
    // 初始化数据
    initData() {
      // 重置购买数量
      this.buyCount = 1;
      // 根据id请求商品详情信息
      this.$axios
        .get(`site/goods/getgoodsinfo/${this.$route.params.id}`)
        .then(res => {
          this.goodsinfo = res.data.message.goodsinfo;
          this.hotgoodslist = res.data.message.hotgoodslist;
          this.imglist = res.data.message.imglist;
          // 清空原来的放大镜数据
          this.images.normal_size = [];
          // 放大镜数据
          this.imglist.forEach((ele) => {
            this.images.normal_size.push({
              id: ele.id,
              url: ele.original_path
            });
          });
        });
      // 获取评论信息
      this.getComments();
    },
    // 获取评论内容
    getComments() {
      this.$axios
        .get(
          `site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(res => {
          this.commentsList = res.data.message;
          this.comTotal = res.data.totalcount;
        });
    },
    // 改变当前页码索引
    changePage(currentPage) {
      this.pageIndex = currentPage;
      this.getComments();
    },
    // 修改每页显示评论条数
    changePageSize(pagesize) {
      this.pageSize = pagesize;
      this.getComments();
    },
    // 提交评论
    submitComment() {
      // 判断评论是否为空
      if (this.inputComment == '') {
        this.$Message.warning('评论内容不能为空！');
      } else {
        this.$axios
          .post(`site/validate/comment/post/goods/${this.$route.params.id}`, {
            commenttxt: this.inputComment
          })
          .then(res => {
            // 清空评论输入内容
            this.inputComment = '';
            // 重新初始化页码为1
            this.pageIndex = 1;
            // 重新获取评论数据
            this.getComments();
          });
      }
    },
    // 添加到购物车
    addtoCart() {
      // 获取商品id
      // 获取购买数量
      // 修改购物车信息
      this.$store.commit('addToCart', {
        goodId: this.$route.params.id,
        goodNum: this.buyCount
      });
      // 提示添加成功
      // close(msg);
      this.$message({
        message: '成功添加到购物车',
        type: 'success',
        duration: 800,
        center: true
      });
    },
    // 立即购买
    buyToCart(){
      // 获取商品id
      // 获取购买数量
      // 修改购物车信息
      this.$store.commit('addToCart', {
        goodId: this.$route.params.id,
        goodNum: this.buyCount
      });
      // 跳转到购物车
      this.$router.push('/shopCart');
    }
  },
  created() {
    // 调用初始化数据
    this.initData();
  }
};
</script>

<style>
.preview-box img {
  height: 250px;
}
.control,
.thumb-list {
  height: 70px;
}
.thumb-list img {
  height: 70px;
}
.zoomer-zoomer-box {
  width: 390px;
  height: 321px;
}
</style>
