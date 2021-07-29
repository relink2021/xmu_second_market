<template>
  <el-card>
    <el-menu mode="horizontal" :default-active="filter_index">
      <el-menu-item index="0" @click="filter0" style="line-height: 60px; height: 60px">综合</el-menu-item>
      <el-menu-item index="3" @click="filter3" style="line-height: 60px; height: 60px">数量</el-menu-item>
      <el-submenu index="sub">
        <template slot="title" style="line-height: 60px; height: 60px">价格</template>
        <el-menu-item index="1" @click="filter1">价格从高到低</el-menu-item>
        <el-menu-item index="2" @click="filter2">价格从低到高</el-menu-item>
      </el-submenu>
    </el-menu>
    <!-- 商品排列 -->
    <div class="shoplist">
      <el-row :gutter="15">
        <el-col
          :span="6"
          v-for="item in itemList"
          :key="item.item_name"
          style="margin-bottom: 13px"
        >
          <el-card
            class="shop"
            shadow="hover"
            @click.native="goodpage(item.item_name)"
          >
            <img
              :src="item.item_img"
              class="image"
              @click="goodpage(item.item_name)"
              style="cursor: pointer; width: 200px; height: 220px"
            />
            <div style="padding: 18px">
              <span class="name">{{ item.item_name }}<br /></span>
              <span class="price">¥{{ item.price }}</span>
              <el-button
                type="text"
                class="button"
                @click="addCart(item.item_name)"
                >&ensp;加入购物车</el-button
              >
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 分页区域 -->
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[4, 8, 12, 16]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import Utils from "../assets/util.js";
export default {
  created() {
    // 刷新阻止页签切换
    var status = window.sessionStorage.getItem("filter_index");
    this.queryInfo.owner = localStorage.getItem('username');
    if (status != null) {
      this.filter_index = window.sessionStorage.getItem("filter_index");
      switch (status) {
        case "0":
          this.filter0();
          break;
        case "1":
          this.filter1();
          break;
        case "2":
          this.filter2();
          break;
        case "3":
          this.filter3();
          break;
      }
    } else {
      this.getItemList();
    }
  },
  data() {
    return {
      // 查询信息实体
      queryInfo: {
        query: "",
        type: "全部商品",
        pageNum: 1,
        pageSize: 8,
        filter: 0,
        owner: "",
        edit: 1,
      },
      total: 0,
      // 商品列表
      itemList: [],
      menuList: [],
      sub_kind: "",
      filter_index: "0",
      addForm: {
        sellername: "",
        buyername: "",
        item_name: "",
        fineness: "",
        main_kind: "",
        sub_kind: "",
        price: "",
        amount: "",
        total: "",
        item_img: "",
        item_detail: "",
        isbought: "",
      },
      
    };
  },
  methods: {
    // 获取商品列表
    async getItemList() {
      if (this.queryInfo.type != window.sessionStorage.getItem("sub_kind")) {
        this.queryInfo.pageNum = 1;
      }
      if (window.sessionStorage.getItem("query") != null) {
        this.queryInfo.query = window.sessionStorage.getItem("query");
      } 
      if (window.sessionStorage.getItem("sub_kind") != null) {
        this.queryInfo.type = window.sessionStorage.getItem("sub_kind");
      } else {
        this.queryInfo.type = null;
      }
      const { data: res } = await this.$http.get("allItem", {
        params: this.queryInfo,
      });
      this.itemList = res.data;
      this.total = res.number;
    },
    // 将商品添加至购物车
    async addCart(item_name) {
      //循环商品列表，找到要加入购物车的商品
      this.itemList.forEach((item) => {
        if (item.item_name == item_name) {
          //将item的表项对应赋给shopcar的表项
          this.addForm.sellername = item.username;
          this.addForm.buyername = localStorage.getItem("username");
          this.addForm.item_name = item_name;
          this.addForm.main_kind = item.main_kind;
          this.addForm.sub_kind = item.sub_kind;
          this.addForm.fineness = item.fineness;
          this.addForm.price = item.price;
          this.addForm.item_img = item.item_img;
          this.addForm.item_detail = item.item_detail;
          this.addForm.amount = 1;
          this.addForm.total = 0;
          this.addForm.isbought = false;
        }
      });
      const { data: res } = await this.$http.post("addCart", this.addForm);
      if (res == "success") {
        this.$message.success(this.addForm.item_name + " 已被成功加入购物车");
      } else {
        this.$message.error("加入购物车失败");
      }
    },
    // 跳转到登录/注册界面
    login() {
      window.sessionStorage.clear(); //清除session
      this.$router.push("/Login");
    },
    goodpage(item_name) {
      localStorage.setItem("item_name", item_name);
      this.$router.push("/GoodPagePlus");
    },
    // 单页最大用户数量
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getItemList();
    },
    // pageNum的触发动作
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getItemList();
    },
    // 选择筛选条件
    filter0() {
      window.sessionStorage.setItem("filter_index", "0");
      this.queryInfo.filter = 0;
      this.getItemList();
    },
    filter1() {
      window.sessionStorage.setItem("filter_index", "1");
      this.queryInfo.filter = 1;
      this.getItemList();
    },
    filter2() {
      window.sessionStorage.setItem("filter_index", "2");
      this.queryInfo.filter = 2;
      this.getItemList();
    },
    filter3() {
      window.sessionStorage.setItem("filter_index", "3");
      this.queryInfo.filter = 3;
      this.getItemList();
    },
  },
  mounted() {
    var that = this;
    Utils.$on("getItemList", function (msg) {
      that.getItemList();
    });
  },
};
</script>

<style lang="less" scoped>
.image {
  width: 100%;
  border-radius: 4px;
}
.price {
  color: rgb(240, 18, 18);
  font-size: 25px;
  margin-top: 20cm;
}
.el-menu--horizontal > .el-menu-item {
  height: 40px;
  line-height: 40px;
}
.el-menu--horizontal {
  margin-bottom: 20px;
}
.shop {
  height: 360px;
}
</style>