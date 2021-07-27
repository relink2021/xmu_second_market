<template>
  <div class="publish_product_div">
    <div class="product_img_div">
      <img :src="itemInfo.item_img" class="product_img" />
    </div>
    <div class="product_info_div">
      <div class="itemname">{{ this.itemInfo.item_name }}</div>
      <div class="perprice">
        <div class="perpricetag">单价：</div>
        <div class="perpriceinfo">
          {{ this.itemInfo.price }}
        </div>
      </div>
      <div class="seller">
        <div class="sellertag">卖家：</div>
        <div class="sellerinfo">
          {{ this.itemInfo.username }}
        </div>
      </div>
      <div class="fineness">
        <div class="finenesstag">成色：</div>
        <div class="finenessinfo">
          {{ this.itemInfo.fineness }}
        </div>
      </div>
      <div class="amount">
        <div class="amounttag">数量：</div>
        <div class="amountinfo">
          {{ this.itemInfo.amount }}
        </div>
      </div>
      <div class="kind">
        <div class="kindtag">分类：</div>
        <div class="kindinfo">
          {{ this.itemInfo.main_kind }}-{{ this.itemInfo.sub_kind }}
        </div>
      </div>
      <div class="contact">
        <div class="contacttag">详情：</div>
        <div class="contactinfo">
          {{ this.itemInfo.contact }}
        </div>
      </div>
      <el-button
        class="specialbutton"
        icon="el-icon-shopping-cart-2"
        @click="addCart"
        >加入购物车</el-button
      >
    </div>
  </div>
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
      //搜索输入
      input: "",
      total: "",
    };
  },
  // onload 事件
  created() {
    // 显示商品信息
    this.showItemMessage();
  },
  methods: {
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
    // 将商品添加至购物车
    async addCart() {
      //将item的表项对应赋给shopcar的表项
      this.addForm.sellername = this.itemInfo.username;
      this.addForm.buyername = localStorage.getItem("username");
      this.addForm.item_name = this.itemInfo.item_name;
      this.addForm.main_kind = this.itemInfo.main_kind;
      this.addForm.sub_kind = this.itemInfo.sub_kind;
      this.addForm.fineness = this.itemInfo.fineness;
      this.addForm.price = this.itemInfo.price;
      this.addForm.item_img = this.itemInfo.item_img;
      this.addForm.item_detail = this.itemInfo.comment;
      this.addForm.amount = 1;
      this.addForm.total = 0;
      this.addForm.isbought = false;

      console.log(this.addForm);
      const { data: res } = await this.$http.post("addCart", this.addForm);
      console.log(res);
      if (res == "success") {
        this.$message.success(this.addForm.item_name + " 已被成功加入购物车");
      } else {
        this.$message.error("加入购物车失败");
      }
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

  //导航栏

  ul {
    list-style-type: none;
    margin: 0%;
    padding: 0;
    overflow: hidden;
    background-color: #2f3235;
  }

  li {
    float: right;
  }

  li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 20px;
  }

  li a:hover {
    background-color: #111;
  }
}

.el-row {
  position: absolute;
}

//侧边栏样式
.el-aside {
  background-color: #333744;

  .aside_title {
    margin: 5%;
    background-color: #333744;
  }
  span.title {
    font-size: 120%;
    color: #fff;
    text-align: center;
    position: relative;

    padding: 25px;
    margin: 25px;
  }

  .el-menu {
    width: 99.9%;
  }
}

//主体样式
.el-main {
  background-color: #eaedf1;
}

//发布商品的格式
.publish_product_div {
  padding-top: 1%;
  padding-bottom: 5%;
  width: 90%;
  height: auto;
  margin-left: 5%;
  margin-top: 0%;
  margin-bottom: 10%;
  /*background-color: red;*/
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.7);
  display: inline-block;
}
.product_img_div {
  width: 40%;
  height: auto;
  float: left;
  margin-left: 4%;
  margin-top: 5%;
}
.product_img {
  width: 70%;
  margin-top: 5%;
}
.product_info_div {
  text-align: left;
  width: 35%;
  display: block;
  float: left;
  margin-left: 5%;
  line-height: 2.1em;
  margin-bottom: 10%;
  margin-top: 7%;
  .itemname {
    font-family: Microsoft JhengHei;
    font-weight: bold;
    color: black;
    font-size: 18px;
    padding-left: 10px;
  }
  .perprice {
    background-color: #faf7f0;
    .perpricetag {
      float: left;
      color: gray;
      padding-left: 20px;
      padding-top: 3px;
    }
    .perpriceinfo {
      padding-left: 80px;
      padding-top: 3px;
    }
  }
  .seller {
    background-color: #fdfcf9;

    .sellertag {
      float: left;
      color: gray;
      padding-left: 20px;
    }
    .sellerinfo {
      font-size: 16px;
      padding-left: 80px;
    }
  }
  .fineness {
    background-color: #fffffe;

    .finenesstag {
      float: left;
      color: gray;
      padding-left: 20px;
    }
    .finenessinfo {
      font-size: 16px;
      padding-left: 80px;
    }
  }
  .amount {
    .amounttag {
      float: left;
      color: gray;
      padding-left: 20px;
    }
    .amountinfo {
      font-size: 16px;
      padding-left: 80px;
    }
  }
  .kind {
    .kindtag {
      float: left;
      color: gray;
      padding-left: 20px;
    }
    .kindinfo {
      font-size: 16px;
      padding-left: 80px;
    }
  }
  .contact {
    height: 110px;
    border: 1px rgb(197, 191, 191);
    border-top-style: solid;
    .contacttag {
      float: left;
      color: gray;
      padding-left: 20px;
    }
    .contactinfo {
      font-size: 16px;
      padding-left: 80px;
    }
  }
  .total {
    padding-top: 20px;
    .totaltag {
      float: left;
      color: gray;
      padding-left: 300px;
    }
    .totalinfo {
      font-size: 26px;
      padding-left: 350px;
    }
  }
  .specialbutton {
    width: 150px;
    background-color: #e65340;
    color: #fff;
    margin-left: 250px;
    margin-top: 20px;
  }
}

.el-footer {
  background-color: #eaedf1;
  width: 82%;
  position: absolute;
  left: 16%;
  top: 91.6%;
  //background-color: slateblue;
  box-shadow: 2px 2px 10px #888888;
  border-radius: 10px;
  p {
    text-align: center;
  }
}
</style>
