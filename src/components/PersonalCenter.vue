<template>
  <!-- 引入布局 -->
  <el-container class="PC-container">
    <!-- 头部 -->
    <el-header style="width: auto; height: auto;">
      <!-- 标题图标文字 -->
      <div>
        <img
          style="width: auto; height: 30px"
          src="../assets/logo-mini.png"
          alt
        />
      </div>
      <span
        style="
          width: 250px;
          text-align: center;
          display: block;
          color: #fff;
          font-size: 35px;
          font-weight: bold;
        "
        >个人中心</span>
      <!-- 页面菜单栏 -->
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#003c88"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1"
          ><a
            href="#Goods"
            target="_blank"
            style="font-size: 20px"
            ><span style="font-size: 20px">首页</span></a
          ></el-menu-item
        >
        <el-submenu index="2">
          <template slot="title"
            ><span style="font-size: 20px">账户设置</span></template
          >
          <el-submenu index="2-1">
            <template slot="title">安全设置</template>
            <el-menu-item index="2-1-1"
              ><router-link
                to="EditData"
                style="font-size: 15px; color: #fff"
                >修改密码
              </router-link></el-menu-item
            >
            <el-menu-item index="2-1-2">
              <router-link
                to="EditData"
                style="font-size: 15px; color: #fff"
                >手机绑定
              </router-link></el-menu-item
            >
            <el-menu-item index="2-1-3"
              ><router-link
                to="EditData"
                style="font-size: 15px; color: #fff"
                >邮箱绑定
              </router-link></el-menu-item
            >
          </el-submenu>
          <el-submenu index="2-2">
            <template slot="title">个人资料</template>
            <el-menu-item index="2-2-1"
              ><router-link
                to="PersonalData"
                style="font-size: 15px; color: #fff"
                >收货地址
              </router-link></el-menu-item
            >
            <el-menu-item index="2-2-2"
              ><router-link
                to="PersonalData"
                style="font-size: 15px; color: #fff"
                >修改头像、昵称
              </router-link></el-menu-item
            >
          </el-submenu>
          <el-submenu index="2-3">
            <template slot="title">账号绑定</template>
            <el-menu-item index="2-3-1">支付宝绑定</el-menu-item>
            <el-menu-item index="2-3-2">微博绑定</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
      <!-- 搜索栏 -->
      <div style="margin-top: -5px; margin-left: 400px" align="right">
        <el-input>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
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
          background-color="#006e9f"
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
            <span slot="title" style="font-size: 15px">修改发布商品</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主体内容 -->
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
        this.$router.push({path:"/ShoppingCart"});  //主页
    },
    editEstablish(){
        this.$router.push({path:"/EditEstablish"}); // 修改发布信息
    }
  }
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
.el-menu {
  border-bottom: none;
}
</style>