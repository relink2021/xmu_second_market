<template>
  <el-card>
    <!-- 商品信息 -->
    <div class="publish_product_div">
      <div class="product_img_div">
        <img
          :src="getImgUrl(itemInfo.item_img)"
          class="product_img"
          style="width: 250px; height: 320px"
        />
      </div>
      <div class="product_info_div">
        <span class="what_info">卖家：</span>
        <span class="info_content">{{ this.itemInfo.username }}</span
        ><br />
        <span class="what_info">商品名：</span>
        <input type="hidden" class="id" />
        <span class="info_content">{{ this.itemInfo.item_name }}</span
        ><br />
        <span class="what_info">成色：</span>
        <span class="info_content">{{ this.itemInfo.fineness }}</span
        ><br />
        <span class="what_info">数量：</span>
        <span class="info_content">{{ this.itemInfo.amount }}</span
        ><br />
        <span class="what_info">单价：</span>
        <span class="info_content">{{ this.itemInfo.price }}</span
        ><br />
        <span class="what_info">详情：</span>
        <span class="info_content">{{ this.itemInfo.contact }}</span
        ><br />
        <span class="what_info">分类：</span>
        <span class="info_content"
          >{{ this.itemInfo.main_kind }}-{{ this.itemInfo.sub_kind }}</span
        ><br />
        <el-button class="buy_button" round type="success"
          >加入购物车</el-button
        >
        <!-- <button class="buy_button" th:value="${shopInformation.id}">加入购物车</button> -->
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      // 菜单列表
      menuList: [],
      // 物品信息
      itemInfo: {
        username: "",
        item_name: "",
        fineness: "",
        main_kind: "",
        sub_kind: "",
        price: "",
        amount: "",
        contact: "",
      },
      //搜索输入
      input: "",
    };
  },
  // onload 事件
  created() {
    // 显示商品信息
    this.showItemMessage();
  },
  methods: {
    // 获取图片url
    getImgUrl(url) {
      return require("D:/vue_workspace/secondhandmarket/src/assets/" + url);
    },
    // 跳转到登录/注册界面
    login() {
      window.sessionStorage.clear(); //清除session
      this.$router.push("/Login");
    },
    // 显示商品详细信息
    async showItemMessage() {
      // 访问数据库
      this.itemInfo.item_name = localStorage.getItem("item_name");
      const { data: res } = await this.$http.post(
        "showItemMessage",
        this.itemInfo
      );
      // 填充数据
      this.itemInfo = res;
    },
    // 获取导航菜单方法
    getMenuList() {
      console.log("getMenuList");
    },
    home() {
      this.$router.push("/ShopMall");
    },
    // 跳转到个人中心
    person() {
      this.$router.push("/PersonalCenter");
    },
    // 跳转到我要发布
    establish() {
      this.$router.push("/Establish");
    },
    shopmall() {
      this.$router.push("/ShopMall");
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
//布局器样式
.home-container {
  height: 100%;
  width: 100%;
  background-color: #eaedf1;
}
//头部样式
.el-header {
  z-index: 1;
  background-color: #2f3235;
  justify-content: space-between; //左右贴边
  padding-left: 0%; //左边界
  color: #fff;
  font-size: 30px;
  display: flex;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
      font-weight: bold;
    }
  }

  .search {
    width: 20%;
    height: 60%;
    position: relative;
    top: 20%;
    right: 0%;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    background-color: rgb(255, 255, 255);
    background-image: url("https://static.runoob.com/images/mix/searchicon.png");
    background-position: 9px 6px;
    background-repeat: no-repeat;
    padding: 12px 20px 12px 40px;
    -webkit-transition: width 0.4s ease-in-out;
    transition: width 0.4s ease-in-out;
  }
  //厦门大学logo
  img {
    width: 45%;
    height: 70%;
  }
}

.el-row {
  position: absolute;
}

//发布商品的格式
.publish_product_div {
  padding-top: 3%;
  width: 90%;
  height: auto;
  margin-left: 5%;
  /*background-color: red;*/
  background-color: white;
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
  width: 50%;
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

.el-footer {
  background-color: #eaedf1;
  width: 82%;
  position: absolute;
  left: 16%;
  top: 90%;
  //background-color: slateblue;
  box-shadow: 2px 2px 10px #888888;
  border-radius: 10px;
  p {
    text-align: center;
  }
}
</style>
