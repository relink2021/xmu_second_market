<template>
  <!-- 引入布局 -->
  <el-container class="PC-container">
    <!-- 头部 -->
    <el-header style="width: auto; height: auto;">
      <!-- 标题图标文字 -->
      <div>
        <img
          style="width: auto; height: 40px; margin-top:10px"
          src="../assets/logo-mini.png"
          alt
        />
      </div>
      <span
        style="
          width: 150px;
          text-align: center;
          display: block;
          color: #fff;
          font-size: 30px;
          font-weight: bold;
          margin-right: 10px;
          margin-top:10px;
        "
        >个人中心</span>
      <!-- 页面菜单栏 -->
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#333744"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="1"
        @click="back_to_shopmall"
          ><a
            target="_blank"
            style="font-size: 20px"
            ><span style="font-size: 20px">首页</span></a
          ></el-menu-item
        >
        <el-submenu index="2">
          <template slot="title"
            ><span style="font-size: 20px">账户设置</span></template
          >
          <el-menu-item index="EditData">
            <span style="font-size: 15px; color: #fff">修改密码</span>
          </el-menu-item>
          <el-menu-item index="PersonalData">
            <span style="font-size: 15px; color: #fff">个人资料</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="160px">
        <h5 style="font-size: 20px; text-align: center; color: #fff">
          全部功能
        </h5>
        <!-- 侧边栏颜色 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-menu-item index="ShoppingCart">
            <span slot="title" style="font-size: 15px">我的购物车</span>
          </el-menu-item>
        <el-submenu index="1">
        <template slot="title">
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="HasBought">
            <template slot="title" style="font-size: 15px">
            <span>已买到的商品</span> 
            </template>
          </el-menu-item>
          <el-menu-item index="HasSold">
            <template slot="title" style="font-size: 15px">
            <span> 已卖出的商品 </span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
          <el-menu-item index="EditEstablish">
            <span slot="title" style="font-size: 15px">我的发布</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created(){
    //this.showMessage();
  },
  data(){
    return{
      personInfo: {
        username: "",
        phone: "",
        email: "",
        balance: "",
      },
      vertical: "",
      activeIndex:"",
    }
  },
  methods:{
    /*
    async showMessage(){
        // 访问数据库
        this.personInfo.username = localStorage.getItem('username');
        const {data:res} = await this.$http.post("showMessage",this.personInfo);
        // 填充数据
        this.personInfo = res;
        console.log(this.personInfo);
    },
    */
    shoppingCar(){
        this.$router.push({path:"/ShoppingCart"});  //购物车
    },
    editEstablish(){
        this.$router.push({path:"/EditEstablish"}); // 修改发布信息
    },
    back_to_shopmall()
    {
      window.sessionStorage.setItem('top_index','Goods');
      this.$router.push({path:"/ShopMall"}); // 返回商城界面
    }
  }
};
</script>

<style class='less' scoped>
/* 根节点样式 */
.PC-container {
  background-color: #333744;
  height: 100%;
}
/* 头样式 */
.el-header {
  background-color: #333744;
  display: flex;
  font-size: 40px;
}
/* 侧边栏样式 */
.el-aside {
  background-color: #333744;
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
.el-menu {
  border-bottom: none;
}
</style>