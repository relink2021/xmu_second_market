<template>
  <el-card class="home-container">  

            <div class="product_info_div">
              <i class="el-icon-back"  @click="back_to_list" style="margin-left: 0%"></i><br /><br />
              <span class="what_info" style="font-size: 20px" >卖家信息</span><br /><br />
              <el-row>
                用户名：{{this.orderInfo.sellername}}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                卖家电话：{{this.sellerinfo.phone}}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                卖家邮箱：{{this.sellerinfo.email}}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                卖家地址：{{this.sellerinfo.address}}
                </el-row>
                <br />
              <span class="what_info" style="font-size: 20px" >买家信息</span><br /><br />
              <span style="display:inline">
                用户名：{{this.orderInfo.buyername}}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                卖家电话：{{this.buyerinfo.phone}}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                卖家邮箱：{{this.buyerinfo.email}}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                卖家地址：{{this.buyerinfo.address}}
                </span>
                <br /><br />
                <span class="what_info" style="font-size: 20px" >商品信息</span><br /><br />

                <table border="1" cellpadding="40">
                <tr>
                <td>商品图片</td>
                <td>商品名</td>
                <td>成色</td>
                <td>主类型</td>
                <td>副类型</td>
                <td>数量</td>
                <td>单价</td>
                <td>成交金额</td>
                <td>商品详情</td>
                </tr>
                <tr>
                <td>{{orderInfo.item_img}}</td>
                <td>{{this.orderInfo.item_name}}</td>
                <td>{{this.orderInfo.fineness}}</td>
                <td>{{this.orderInfo.main_kind}}</td>
                <td>{{this.orderInfo.sub_kind}}</td>
                <td>{{this.orderInfo.amount}}</td>
                <td>{{this.orderInfo.price}}</td>
                <td>{{this.orderInfo.price*this.orderInfo.amount}}</td>
                <td>{{this.orderInfo.item_detail}}</td>
                </tr>
                </table>
            </div>
</el-card>
</template>

<script>
export default {
  created() {
    // 显示商品信息
    this.showOrderMessage();
    this.showSellerMessage();
    this.showBuyerMessage();
  },
  data() {
    return {
      // 菜单列表
      menuList: [],
      // 物品信息
      orderInfo: {
        sellername: "",
        buyername:"",
        item_name: "",
        fineness: "",
        main_kind: "",
        sub_kind: "",
        item_detail:"",
        price: "",
        amount: "",
        total:"",
      },
       sellerinfo:{
        username:"",
        real_name:"",
        phone:"",
        address:"",
      },
      buyerinfo:{
        username:"",
        real_name:"",
        phone:"",
        address:"",
      },
      itemInfo: {
        sellername: "",
        buyername:"",
        item_name: "",
        fineness: "",
        main_kind: "",
        sub_kind: "",
        item_detail:"",
        price: "",
        amount: "",
        total:"",
      },
      //搜索输入
      input: "",
      order_item:"",
      order_seller:"",
      order_buyer:"",
    };
  },

  methods: {
        // onload 事件 
    //返回上一级
    backward()
    {
        this.$router.push("/Orders");
    },

    // 显示订单详细信息
    async showOrderMessage(){
      // 访问数据库
      this.itemInfo.item_name = localStorage.getItem('order_item');
      this.itemInfo.sellername = localStorage.getItem('order_sellername');
      this.itemInfo.buyername = localStorage.getItem('order_buyername');
      console.log( this.itemInfo.buyername);
      const {data:res} = await this.$http.post("showOrderMessage",this.itemInfo);
      // 填充数据
      this.orderInfo = res;
      console.log(this.orderInfo.price);
    },

    // 显示卖方详细信息
    async showSellerMessage(){
      // 访问数据库
      this.sellerinfo.username = localStorage.getItem('order_sellername');
      console.log( this.sellerinfo.username);
      const {data:res} = await this.$http.post("oneUser",this.sellerinfo);
      // 填充数据
      this.sellerinfo = res;
    },

    // 显示买方详细信息
    async showBuyerMessage(){
      // 访问数据库
      this.buyerinfo.username = localStorage.getItem('order_buyername');
      console.log( this.buyerinfo.username);
      const {data:res} = await this.$http.post("oneUser",this.buyerinfo);
      // 填充数据
      this.buyerinfo = res;
    },
    back_to_list()
    {
      this.$router.push('/HasBought')
    },
    // 获取导航菜单方法
    getMenuList() {
      console.log("getMenuList");
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>

.home-container {
  height: 100%;
  width: 100%;
  background-color: white;
}


/*
.el-row {
  position: absolute;
}
*/

.el-icon-back
{
  margin-left: 5%;
  margin-top: 0%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.7);
  float: left;
}

//主体样式
.el-main {
  background-color: #eaedf1;
}

.publish_product_div {
  padding-top: 1%;
  padding-bottom: 5%;
  width: 100%;
  height: auto;
  margin-left: 5%;
  margin-top: 0%;
  margin-bottom: 10%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.7);
  display: inline-block;
}
.product_img_div {
  width: 30%;
  height: auto;
  float: left;
  margin-left: 9%;
  margin-top: 2%;
}
.product_img {
  width: 100%;
  margin-top: 5%;
}

.product_info_div {
  text-align: start;
  width: 100%;
  display: block;
  float: left;
  margin-left: 5%;
  line-height: 2.1em;
  margin-bottom: 10%;
  margin-top: 4%;
}
.product_info_div .what_info {
  font-size: 1.2em;
  font-weight: 600;
}

.product_info_div .buy_button {
  margin-left: 0%;
  margin-top: 6%;
  font-size: 20px;
}


.seller_title{
  position: absolute;
  left:3%;
}
.buyer_title{
  position: absolute;
  left: 4%;
}
.item_title{
  position: absolute;
  left: 4%;
}
</style>
