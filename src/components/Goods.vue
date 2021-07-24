<template>
  <el-card>
    <router-view></router-view>
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
              :src="getImgUrl(item.item_img)"
              class="image"
              @click="goodpage(item.item_name)"
              style="cursor: pointer; width: 200px; height: 220px"
            />
            <div style="padding: 18px">
              <span class="name">{{ item.item_name }}<br /></span>
              <span class="price">¥{{ item.price }}</span>
              <el-button type="text" class="button">&ensp;加入购物车</el-button>
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
    this.getItemList();
  },
  data() {
    return {
      // 查询信息实体
      queryInfo: {
        query: "",
        type: "",
        pageNum: 1,
        pageSize: 8,
      },
      total: 0,
      // 商品列表
      itemList: [],
      menuList: [],
      sub_kind: "",
    };
  },
  methods: {
    // 获取商品列表
    async getItemList() {
      if(this.queryInfo.type != window.sessionStorage.getItem('sub_kind')){
        this.queryInfo.pageNum = 1;
      }
      if(window.sessionStorage.getItem('query') != null){
        this.queryInfo.query = window.sessionStorage.getItem('query');
      }
      this.queryInfo.type = window.sessionStorage.getItem('sub_kind');
      const { data: res } = await this.$http.get("allItem", {
        params: this.queryInfo,
      });
      this.itemList = res.data;
      this.total = res.number;
      console.log(this.total);
    },
    // 获取图片url
    getImgUrl(url) {
      return require("D:/vue_workspace/secondhandmarket/src/assets/" + url);
    },
    // 跳转到登录/注册界面
    login() {
      window.sessionStorage.clear(); //清除session
      this.$router.push("/Login");
    },
    goodpage(item_name) {
      localStorage.setItem("item_name", item_name);
      this.$router.push("/GoodPage");
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
</style>