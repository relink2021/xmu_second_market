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
        >个人中心</span
      >
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
            href="https://www.xmu.edu.cn"
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
                @click.native="flushCom1"
                style="font-size: 15px; color: #fff"
                >修改密码
              </router-link></el-menu-item
            >
            <el-menu-item index="2-1-2">
              <router-link
                to="EditData"
                @click.native="flushCom1"
                style="font-size: 15px; color: #fff"
                >手机绑定
              </router-link></el-menu-item
            >
            <el-menu-item index="2-1-3"
              ><router-link
                to="EditData"
                @click.native="flushCom1"
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
                @click.native="flushCom"
                style="font-size: 15px; color: #fff"
                >收货地址
              </router-link></el-menu-item
            >
            <el-menu-item index="2-2-2"
              ><router-link
                to="PersonalData"
                @click.native="flushCom"
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
        <el-menu-item index="3"
          ><a href="https://www.baidu.cn" target="_blank"
            ><span style="font-size: 20px">订单管理</span></a
          ></el-menu-item
        >
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
      <el-aside width="120px">
        <h5 style="font-size: 20px; text-align: center; color: #fff">
          全部功能
        </h5>
        <!-- 侧边栏颜色 -->
        <el-menu
          background-color="#006e9f"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1" @click="shoppingCar">
            <span slot="title" style="font-size: 15px">我的购物车</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span slot="title" style="font-size: 15px">已买到的商品</span>
          </el-menu-item>
          <el-menu-item index="3">
            <span slot="title" style="font-size: 15px">已卖出的商品</span>
          </el-menu-item>
          <el-menu-item index="4" @click="editEstablish">
            <span slot="title" style="font-size: 15px">修改发布商品</span>
          </el-menu-item>
          <!-- <el-menu-item index="4">
            <span slot="title" style="font-size: 15px">我的收藏</span>
          </el-menu-item>
          <el-menu-item index="5">
            <span slot="title" style="font-size: 15px">我的足迹</span>
          </el-menu-item> -->
        </el-menu>
      </el-aside>
      <!-- 主体内容 -->
      <el-main>
        <el-card>
          <el-row>
            <el-col :span="12" style="display:flex; width:1000px; align-items: center;" 
              ><div class="grid-content bg-purple">
                <!-- 点击跳转到个人资料修改页面 -->
                <el-button circle style="margin-left: 25px"
                  ><a
                    href="http://localhost:8080/#/EditData"
                    target="_blank"
                    style="font-size: 20px"
                    ><img src="../assets/logo.png" alt /></a
                ></el-button>
              </div>
              <el-button style="border: none; margin-left: 5px"
                ><a
                  href="http://localhost:8080/#/EditData"
                  target="_blank"
                  style="font-size: 20px"
                  >{{personInfo.username}}</a
                ></el-button
              >
              <el-button style="border: none; margin-left: 25px"
                ><a
                  href="http://localhost:8080/#/EditData"
                  target="_blank"
                  style="font-size: 20px"
                  >{{personInfo.phone}}</a
                ></el-button
              >
              <el-button style="border: none; margin-left: 25px"
                ><a
                  href="http://localhost:8080/#/EditData"
                  target="_blank"
                  style="font-size: 20px"
                  >{{personInfo.email}}</a
                ></el-button
              >
              <span
                style="
                  border: none;
                  margin-left: 25px;
                  font-size: 20px;
                  color: #003c88;
                "
                >您的余额：￥{{personInfo.balance}}
              </span>
            </el-col>
          </el-row>

          <el-menu mode="horizontal">
            <el-menu-item index="1" style="width: 200px; text-align: center"
              ><router-link
                to="PersonalData"
                @click.native="flushCom"
                >我的收货地址
              </router-link></el-menu-item
            >
            <el-menu-item index="2" style="width: 200px; text-align: center"
              >待付款</el-menu-item
            >
            <el-menu-item index="3" style="width: 200px; text-align: center"
              >待发货</el-menu-item
            >
            <el-menu-item index="4" style="width: 200px; text-align: center"
              >待收货</el-menu-item
            >
            <el-menu-item index="5" style="width: 200px; text-align: center"
              >待评价</el-menu-item
            >
            <el-menu-item index="6" style="width: 200px; text-align: center"
              >退款</el-menu-item
            >
          </el-menu>
        </el-card>

        <br />
        <el-card>
          <span
            ><img
              style="width: auto; height: 30px"
              src="../assets/物流.png"
              alt
            /><span slot="title" style="font-size: 25px; text-align: center"
              >我的物流</span
            ></span
          >
          <el-empty description="空空如也"></el-empty>
        </el-card>
        <br />

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>猜你喜欢</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              ><i class="el-icon-refresh"></i>换一换</el-button
            >
          </div>
          <el-button v-model="vertical">
            <img
              style="width: 250px; height: auto"
              class="goods1"
              src="../assets/青菜.jpg"
              alt
            /><br />
            <span>￥1380.00</span><br />
            <span>优选青菜白菜</span><br />
          </el-button>
          <el-button v-model="vertical">
            <img
              style="width: 250px; height: auto"
              src="../assets/青菜.jpg"
              alt
            /><br />
            <span>￥1380.00</span><br />
            <span>优选青菜白菜</span><br />
          </el-button>
          <br />
          <el-button v-model="vertical">
            <img
              style="width: 250px; height: auto"
              src="../assets/青菜.jpg"
              alt
            /><br />
            <span>￥1380.00</span><br />
            <span>优选青菜白菜</span><br />
          </el-button>
          <el-button v-model="vertical">
            <img
              style="width: 250px; height: auto"
              src="../assets/青菜.jpg"
              alt
            /><br />
            <span>￥1380.00</span><br />
            <span>优选青菜白菜</span><br />
          </el-button>
          <br />
          <el-button v-model="vertical">
            <img
              style="width: 250px; height: auto"
              src="../assets/青菜.jpg"
              alt
            /><br />
            <span>￥1380.00</span><br />
            <span>优选青菜白菜</span><br />
          </el-button>
          <el-button v-model="vertical">
            <img
              style="width: 250px; height: auto"
              src="../assets/青菜.jpg"
              alt
            /><br />
            <span>￥1380.00</span><br />
            <span>优选青菜白菜</span><br />
          </el-button>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created(){
    this.showMessage();
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
    }
  },
  methods:{
    async showMessage(){
        // 访问数据库
        this.personInfo.username = localStorage.getItem('username');
        const {data:res} = await this.$http.post("showMessage",this.personInfo);
        // 填充数据
        this.personInfo = res;
        console.log(this.personInfo);
    },
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
</style>