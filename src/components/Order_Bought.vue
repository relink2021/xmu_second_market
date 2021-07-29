<template>
  <el-card>
    <el-page-header @back="goBack" content="订单详情"> </el-page-header>
    <el-divider content-position="left">卖家信息</el-divider>
    <el-table :data="sellerinfo" stripe>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="卖家电话" prop="phone"></el-table-column>
      <el-table-column label="卖家邮箱" prop="email"></el-table-column>
      <el-table-column label="卖家地址" prop="address"></el-table-column>
    </el-table>
    <el-divider content-position="left">买家信息</el-divider>
    <el-table :data="buyerinfo" stripe>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="买家电话" prop="phone"></el-table-column>
      <el-table-column label="买家邮箱" prop="email"></el-table-column>
      <el-table-column label="买家地址" prop="address"></el-table-column>
    </el-table>
    <el-divider content-position="left">商品信息</el-divider>
    <el-table :data="itemInfo" stripe>
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <img :src="scope.row.item_img" class="order_img"/> 　　
        </template>
      </el-table-column>
      <el-table-column label="商品名" prop="item_name"></el-table-column>
      <el-table-column label="成色" prop="fineness"></el-table-column>
      <el-table-column label="主类型" prop="main_kind"></el-table-column>
      <el-table-column label="副类型" prop="sub_kind"></el-table-column>
      <el-table-column label="数量" prop="amount"></el-table-column>
      <el-table-column label="单价" prop="price"></el-table-column>
      <el-table-column label="成交金额" prop="total"></el-table-column>
      <el-table-column label="商品详情" prop="item_detail"></el-table-column>
    </el-table>
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
        buyername: "",
        item_name: "",
        fineness: "",
        main_kind: "",
        sub_kind: "",
        item_detail: "",
        price: "",
        amount: "",
        total: "",
      },
      sellerinfo: {
        username: "",
        phone: "",
        email: "",
        address: "",
      },
      buyerinfo: {
        username: "",
        phone: "",
        email: "",
        address: "",
      },
      itemInfo: {
        item_name: "",
        fineness: "",
        main_kind: "",
        sub_kind: "",
        item_detail: "",
        price: "",
        amount: "",
        total: "",
        date: "",
      },
      //搜索输入
      input: "",
      order_item: "",
      order_seller: "",
      order_buyer: "",
    };
  },

  methods: {
    // onload 事件
    //返回上一级
    backward() {
      this.$router.push("/Orders");
    },

    // 显示订单详细信息
    async showOrderMessage() {
      // 访问数据库
      this.itemInfo.item_name = localStorage.getItem("order_item");
      this.itemInfo.sellername = localStorage.getItem("order_sellername");
      this.itemInfo.buyername = localStorage.getItem("order_buyername");
      this.itemInfo.date = localStorage.getItem("order_date");
      const { data: res } = await this.$http.post(
        "showOrderMessage",
        this.itemInfo
      );
      // 填充数据
      this.itemInfo = res;
      for (var i = 0; i <= this.itemInfo.length; i++) {
        this.itemInfo[i].total =
          this.itemInfo[i].amount * this.itemInfo[i].price;
      }
    },

    // 显示卖方详细信息
    async showSellerMessage() {
      // 访问数据库
      this.sellerinfo.username = localStorage.getItem("order_sellername");
      const { data: res } = await this.$http.post("oneUser", this.sellerinfo);
      // 填充数据
      this.sellerinfo = res;
    },

    // 显示买方详细信息
    async showBuyerMessage() {
      // 访问数据库
      this.buyerinfo.username = localStorage.getItem("order_buyername");
      const { data: res } = await this.$http.post("oneUser", this.buyerinfo);
      // 填充数据
      this.buyerinfo = res;
    },
    back_to_list() {
      this.$router.push("/HasBought");
    },
    // 获取导航菜单方法
    getMenuList() {
    },
    goBack() {
      this.$router.push("/HasBought");
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.el-table {
  margin-bottom: 50px;
}
.el-page-header {
  margin-bottom: 50px;
}
.order_img{
  width: 50px;
  height: 50px;
}
</style>