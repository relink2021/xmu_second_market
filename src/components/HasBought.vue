<template>
  <el-card class="box-card">
    <el-row :gutter="20">
      <el-col :span="9">
        <el-input
          v-model="queryInfo.query"
          placeholder="请输入内容"
          clearable
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getBoughtOrderList"
          ></el-button>
        </el-input>
      </el-col>
    </el-row>

    <!-- 订单列表区域 -->
    <el-table :data="orderList" border stripe>
      <el-table-column label="卖家" prop="sellername"></el-table-column>
      <el-table-column label="物品名称" prop="item_name"></el-table-column>
      <el-table-column label="新度" prop="fineness"></el-table-column>
      <el-table-column label="主类型" prop="main_kind"></el-table-column>
      <el-table-column label="副类型" prop="sub_kind"></el-table-column>
      <el-table-column label="单价" prop="price"></el-table-column>
      <el-table-column label="数量" prop="amount"></el-table-column>
      <el-table-column label="成交金额" prop="total"></el-table-column>
      <el-table-column label="成交日期" prop="date"></el-table-column>
      <el-table-column>
        <template slot-scope="orderList">
          <el-button
            type="primary"
            size="mini"
            @click="
              check_detail(
                orderList.row.item_name,
                orderList.row.sellername,
                orderList.row.buyername,
                orderList.row.date
              )
            "
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  created() {
    // 显示商品信息
    this.getBoughtOrderList();
  },
  data() {
    return {
      activeIndex: "",
      personInfo: {
        buyername: "",
        sellername: "",
        username: "",
        phone: "",
        email: "",
        balance: "",
      },
      vertical: "",
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
        buyername:""
      },
      orderList: [
        {
          sellername: "",
          buyername: "",
          item_name: "",
          fineness: "",
          main_kind: "",
          sub_kind: "",
          price: "",
          amount: "",
          total: "",
          date: "",
        },
      ],
      userList: [],
      total: 0,
    };
  },
  methods: {
    // 获取该用户所有订单
    async getBoughtOrderList() {
      this.queryInfo.buyername = localStorage.getItem("username");
      const { data: res } = await this.$http.post( "allBoughtOrder",this.queryInfo);
      this.orderList = res.data;
      this.total = res.number;
      this.total = this.orderList.length;
    },
    // 单页最大用户数量
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getBoughtOrderList();
    },
    // pageNum的触发动作
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getBoughtOrderList();
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/Login");
    },

    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },

    shoppingCar() {
      this.$router.push({ path: "/ShoppingCart" }); //主页
    },
    editEstablish() {
      this.$router.push({ path: "/EditEstablish" }); // 修改发布信息
    },

    check_detail(item_name, sellername, buyername, date) {
      localStorage.setItem("order_item", item_name);
      localStorage.setItem("order_sellername", sellername);
      localStorage.setItem("order_buyername", buyername);
      localStorage.setItem("order_date", date);
      this.$router.push("/Order_Bought");
    },
  },
};
</script>

<style class='less' scoped>
/* 根节点样式 */
.PC-container {
  background-color: rgb(0, 60, 136);
  height: 100%;
}
/* 头样式 */
.el-header {
  background-color: #003c88;
  display: flex;
  font-size: 40px;
}
/* 侧边栏样式 */
.el-aside {
  background-color: rgb(0, 60, 136);
  width: auto;
}
/* 主体样式 */
.el-main {
  background-color: #eaedf1;
}
/* 图标样式 */
img {
  width: 55px;
  height: 55px;
}
/* 去掉链接下划线 */
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
</style>