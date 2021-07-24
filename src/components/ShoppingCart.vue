<template>
<!-- 购物车界面 -->
  <div>
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/logo-mini.png" alt />
        <span>校园二手交易平台</span>
      </div>
      <!-- 搜索块 -->
      <input class="search" placeholder="搜索你想要的二手商品" />
      <!-- 用户头像 -->
      <div class="user">
        <i class="el-icon-user-solid" />
        <el-button round>登录/注册</el-button>
      </div>
    </el-header>

    <!-- 导航栏 -->
    <ul>
      <li><a class="active" href="#home">首页</a></li>
      <li><a href="#news">二手商城</a></li>
      <li><a href="#contact">联系我们</a></li>
      <li><a href="#about">我要发布</a></li>
    </ul>

    <!--中间内容区域-->
    <div class="container">
      <!--div v-for="(item,index) in list" :key="index">
                <div>{{item}}--{{index}}</div>
            </div-->
      <!--div v-for="(item,index) in num" :key="index">
                <div>{{item.id}}---{{item.name}}</div>
            </div-->
      <!--单条数据-->
      <div class="item" v-for="(item, index) in shopCar" :key="index">
        <!--logo区域-->
        <div class="logo">
          <img :src="item.logo_img" />
          <span>{{ item.logo_name }}</span>
        </div>

        <!--详细内容区域-->
        <div class="details">
          <img :src="item.detail_img" alt />
          <div class="details_list">
            <span>{{ item.detail_top }}</span>
            <div class="list_more">
              <span>{{ item.detail_info1 }}</span>
              <span>{{ item.detail_info2 }}</span>
            </div>
            <div class="list_price">￥{{ item.price }}</div>
          </div>
        </div>

        <!--购买数量区域-->
        <div class="num">
          <span>购买数量</span>
          <div>
            <button @click="btn(false, index)">-</button>
            <input type="text" :value="item.num" />
            <button @click="btn(true, index)">+</button>
          </div>
        </div>
      </div>

      /*
    </div>
    */
    <footer>
      <div class="footer_left">
        实际付款：
        <span>{{ num_price }}</span>
      </div>
      <div class="footer_right">提交订单</div>
    </footer>
  </div>
</template>

<script>
export default {
  created() {
    this.getItemList();
  },
  data() {
    return {
      num_price: 0,
      shopCar: [],
    };
  },
  methods: {
    Totalprice() {
      let price = 0;
      this.shopCar.forEach((item, index) => {
        price += item.num * item.price;
      });
      this.num_price = price.toFixed(2);
    },
    btn(bool, index) {
      let shopIndex = this.shopCar[index];
      if (bool) {
        shopIndex.num++;
      } else {
        if (shopIndex.num <= 0) {
          return;
        }
        shopIndex.num--;
      }
      this.Totalprice();
    },
    // 获取物品信息
    async getItemList() {
      const { data: res } = await this.$http.post("Items");
      this.shopCar = res.items;
    },
  },
  mounted() {
    this.Totalprice();
  },
};
</script>

<style  lang="less" scoped>
.body {
  height: 200%;
  width: 100%;
}
/*
    header{
        height: 50;
        width: 100%;
        font-size: 30px;
        text-align: center;
        line-height: 100px;
        border-bottom: 1px solid #ccc;
        background: black;
        color: white;
    }
    */
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
    right: 10%;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    background-color: rgb(255, 255, 255);
    background-image: url("https://static.runoob.com/images/mix/searchicon.png");
    background-position: 10px 10px;
    background-repeat: no-repeat;
    padding: 12px 20px 12px 40px;
    -webkit-transition: width 0.4s ease-in-out;
    transition: width 0.4s ease-in-out;
  }
}

.el-row {
  position: absolute;
}
.container {
  background: #fff;
  margin-left: 100px;
  margin-right: 100px;
}
.item {
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
}
.logo {
  height: 40px;
  /* 左右浮动布局 */
  display: flex;
  /* 以交叉轴的中点对齐 */
  align-items: center;
}
.logo img {
  width: 20px;
  height: 20px;
  margin-left: 5px;
}
.logo span {
  margin-left: 5px;
  font-size: 12px;
}
.details {
  background: #f5f5f5;
  padding: 15px;
  font-size: 12px;
  display: flex;
}
.details img {
  width: 100px;
  height: 90px;
}
.details_list {
  margin-left: 15px;
  color: black;
}
.list_more span {
  color: #888;
}
.details_list span {
  display: block;
  margin-top: 3px;
}
.list_price {
  color: red;
  font-size: 16px;
}

.num {
  color: #888;
  padding: 10px;
  /* 弹性布局 */
  display: flex;
  /* 左右排列 以两侧对齐 */
  justify-content: space-between;
}

.num button {
  width: 31px;
  height: 25px;
  background: #e0e0e0;
  border: none;
  outline: none;
}
.num input {
  width: 37px;
  height: 25px;
  border: none;
  text-align: center;
  background: #fff;
}
footer {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  background: white;
  border-top: 1px solid #ccc;
  display: flex;
}
.footer_left {
  flex: 1;
  text-align: right;
  line-height: 50px;
  font-size: 16px;
  padding-right: 10px;
}
.footer_left span {
  color: red;
}

.footer_right {
  background: red;
  color: white;
  width: 150px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
//导航栏

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #111;
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
}

li a:hover {
  background-color: #111;
}
</style>>
