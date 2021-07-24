<template>
<!-- 用户界面 -->
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/logo-mini.png" alt />
        <span>校园二手交易平台</span>
      </div>
      <!-- 搜索块 -->
      <input class="search" placeholder="搜索你想要的二手商品" />

      <!-- 导航栏 -->
      <ul>
        <li>
          <a class="active" type="info" @click="establish"
            >我要发布</a
          >
        </li>
        <li><a href="#person" type="info" @click="person">个人中心</a></li>
        <li><a href="#home" type="info">首页</a></li>
      </ul>
      <!-- 用户头像 -->
      <div class="user">
        <i class="el-icon-user-solid" />
        <el-button round type="info" @click="login">登录/注册</el-button>
      </div>
    </el-header>

    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="220px">
        <div class="aside_title">
        <span class="title">商品分类</span>
        </div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#2f3235"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{ item.title }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="it.path"
              v-for="it in item.sList"
              :key="it.id"
              @click="saveNavState(it.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ it.title }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- 右侧内容主体 -->
        <el-main>
          <!-- 走马灯 -->

          <el-carousel indicator-position="outside">
            <el-carousel-item>
              <img src="../assets/logo-mini.png" width="100%" height="50%" />
            </el-carousel-item>
            <el-carousel-item>
              <img src="../assets/logo-mini.png" width="100%" height="auto" />
            </el-carousel-item>
            <el-carousel-item>
              <img src="../assets/翔安校区.jpg" width="100%" height="auto" />
            </el-carousel-item>
          </el-carousel>

          <!-- 物品栏 -->
          <div class="box-block">
            <span>精选商品</span>
            <!-- 物品1 -->
            <div class="box1">
              <img src="../assets/校徽.jpg" />
              <span class="good-name">
                算法导论
                <br />
              </span>
              <!-- <span class="newness-rate">
                    九成新
                    <br/>
                </span> -->
              <span class="good-price"> ¥1567.89 </span>

              <el-button round size="medium">加入购物车</el-button>
            </div>

            <!-- 物品2 -->
            <div class="box2">
              <img src="../assets/校徽.jpg" />
              <span class="good-name">
                数据库系统
                <br />
              </span>
              <!-- <span class="newness-rate">
                    九成新
                    <br/>
                </span> -->
              <span class="good-price"> ¥1567.89 </span>

              <el-button round size="medium">加入购物车</el-button>
            </div>
            <!-- 物品3 -->
            <div class="box3">
              <img src="../assets/校徽.jpg" />
              <span class="good-name">
                计算机组成原理
                <br />
              </span>
              <!-- <span class="newness-rate">
                    九成新
                    <br/>
                </span> -->
              <span class="good-price"> ¥1567.89 </span>

              <el-button round size="medium">加入购物车</el-button>
            </div>
            <!-- 物品4 -->
            <div class="box4">
              <img src="../assets/校徽.jpg" />
              <span class="good-name">
                计算机网络
                <br />
              </span>
              <!-- <span class="newness-rate">
                    九成新
                    <br/>
                </span> -->
              <span class="good-price"> ¥1567.89 </span>

              <el-button round size="medium">加入购物车</el-button>
            </div>
          </div>

          <!-- 网站信息 -->
          <div class="home_page_info">
            <div class="bottom_info">
              <h2>关于我们</h2>
              <p>该网站是厦门大学校内二手交易平台，仅供校内人员交流使用。</p>
            </div>
            <div class="bottom_info">
              <h2>团队信息</h2>
              <p>
                该网站由厦门大学信息学院软件工程专业2019级本科生人民当家做组小组协作完成。
              </p>
            </div>
            <div class="bottom_info">
              <h2>版权声明</h2>
              <p>本网站享有一切解释权。</p>
            </div>
          </div>
        </el-main>
        <!-- 页脚 -->
        <el-footer>
          <p>Copyright © 2021.Company name All rights reserved.</p>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Element",
  data() {
    return {
      // 菜单列表
      menuList: [],
      //搜索输入
      //input,
      //走马灯图片
      imgUrls: [
        { id: 0, idView: require("../assets/翔安校区.jpg") },
        { id: 1, idView: require("../assets/校徽.jpg") },
        { id: 2, idView: require("../assets/logo-mini.png") },
      ],
    };
  },
  // onload 事件
  created() {
    // 查询menuList
    this.getMenuList();
  },
  methods: {
    // 跳转到登录/注册界面
    login() {
      window.sessionStorage.clear(); //清除session
      this.$router.push("/login");
    },
    // 获取导航菜单方法
    async getMenuList() {
      const { data: res } = await this.$http.get("Menus");
      console.log(res);
      if (res.flag != 200) return this.$message.error("获取列表失败！！！"); // 访问失败
      this.menuList = res.menus; // 访问成功，数据回填
      console.log(this.menuList);
    },
    // 跳转到个人中心
    person() {
      this.$router.push("/PersonalCenter");
    },
    // 跳转到联系我们
    contact() {
      //   this.$router.push("/contact");
    },
    // 跳转到我要发布
    establish() {
      this.$router.push("/Establish");
    },
    shopmall() {
      this.$router.push("/ShopMall");
    },
    imgLoad() {
      this.$nextTick(() => {
        this.bannerHeight = this.$refs.bannerHeight[0].bannerHeight;
        console.log(this.$refs.bannerHeight[0], height);
      });
    },
    // 保存路径
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath); // 路径存放在activePath
      this.activePath = activePath;
    },
  },
  mounted() {
    this.imgLoad();
    window.addEventListener(
      "resize",
      () => {
        this.bannerHeight = this.$refs.bannerHeight[0].height;
        this.imgLoad();
      },
      false
    );
  },
};
</script>

<style lang="less" scoped>
//布局器样式
.home-container {
  height: 150%;
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
img {
  width: 35%;
  height: 70%;
}

.el-main {
  // 物品块
  .box-block {
    position: relative;
    width: 100%;
    height: 45%;
    background-color: #f5f5f5;
    border-radius: 10px;
    border-style: solid;
    border-color: rgb(153, 149, 149);
    border-width: 2px;
    box-shadow: 2px 2px 10px #888888;

    span {
      color: rgb(15, 14, 14);
      font-family: "微软雅黑";
      font-weight: bold;
      font-size: 20px;
      position: relative;
      left: 47%;
    }
    // 物品1
    .box1 {
      position: absolute;
      left: 0%;
      top: -10%;
      width: 300px;
      height: 500px;
      margin: 100px auto;
      background-color: #eaedf1;
      border-radius: 10px;
      border-style: solid;
      border-color: rgb(161, 118, 118);
      border-width: 1px;
      img {
        border-radius: 10px;
        width: 100%;
        height: auto;
      }
      span.good-name {
        color: #000;
        font-size: 30px;
        position: absolute;
        left: 28%;
        bottom: 30%;
      }
      // span.newness-rate{
      //     color:rgb(252, 5, 17);
      //     border-style:solid;
      //     border-radius:30px;
      // }
      span.good-price {
        color: #ff0000;
        font-size: 30px;
        position: absolute;
        left: 25%;
        bottom: 18%;
      }

      .el-button {
        position: absolute;
        bottom: 5%;
        left: 28%;
      }
    }
    // 物品2
    .box2 {
      position: absolute;
      left: 25%;
      top: -10%;
      width: 300px;
      height: 500px;
      margin: 100px auto;
      background-color: #eaedf1;
      border-radius: 10px;
      border-style: solid;
      border-color: rgb(161, 118, 118);
      border-width: 1px;
      img {
        border-radius: 8px;
        width: 100%;
        height: auto;
      }
      span.good-name {
        color: #000;
        font-size: 30px;
        position: absolute;
        left: 28%;
        bottom: 30%;
      }
      // span.newness-rate{
      //     color:rgb(252, 5, 17);
      //     border-style:solid;
      //     border-radius:30px;
      // }
      span.good-price {
        color: #ff0000;
        font-size: 30px;
        position: absolute;
        left: 25%;
        bottom: 18%;
      }

      .el-button {
        position: absolute;
        bottom: 5%;
        left: 28%;
      }
    }
    // 物品3
    .box3 {
      position: absolute;
      left: 50%;
      top: -10%;
      width: 300px;
      height: 500px;
      margin: 100px auto;
      background-color: #eaedf1;
      border-radius: 10px;
      border-style: solid;
      border-color: rgb(161, 118, 118);
      border-width: 1px;
      img {
        border-radius: 8px;
        width: 100%;
        height: auto;
      }
      span.good-name {
        color: #000;
        font-size: 30px;
        position: absolute;
        left: 18%;
        bottom: 30%;
      }
      // span.newness-rate{
      //     color:rgb(252, 5, 17);
      //     border-style:solid;
      //     border-radius:30px;
      // }
      span.good-price {
        color: #ff0000;
        font-size: 30px;
        position: absolute;
        left: 25%;
        bottom: 18%;
      }

      .el-button {
        position: absolute;
        bottom: 5%;
        left: 28%;
      }
    }
    // 物品4
    .box4 {
      position: absolute;
      left: 75%;
      top: -10%;
      width: 300px;
      height: 500px;
      margin: 100px auto;
      background-color: #eaedf1;
      border-radius: 10px;
      border-style: solid;
      border-color: rgb(161, 118, 118);
      border-width: 1px;
      img {
        border-radius: 8px;
        width: 100%;
        height: auto;
      }
      span.good-name {
        color: #000;
        font-size: 30px;
        position: absolute;
        left: 28%;
        bottom: 30%;
      }
      // span.newness-rate{
      //     color:rgb(252, 5, 17);
      //     border-style:solid;
      //     border-radius:30px;
      // }
      span.good-price {
        color: #ff0000;
        font-size: 30px;
        position: absolute;
        left: 25%;
        bottom: 18%;
      }

      .el-button {
        position: absolute;
        bottom: 5%;
        left: 28%;
      }
    }
  }
}

//走马灯
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

//网站信息格式
.home_page_info {
  width: 83.5%;
  height: 33%;
  position: absolute;
  display: inline-block;
  top: 160%;
  left: 15%;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.home_page_info .bottom_info {
  float: left;
  width: 20%;
  margin-left: 9%;
  margin-right: 3%;
  height: 98%;
}

.home_page_info .bottom_info h2 {
  color: rgba(0, 0, 0, 0.85);
}

.home_page_info .bottom_info p {
  color: rgba(0, 0, 0, 0.62);
}

.el-footer {
  background-color: #eaedf1;
  // color: #333;
  // text-align: center;
  // line-height: 60px;
  width: 82%;
  position: absolute;
  left: 16%;
  top: 206%;
  //background-color: slateblue;
  box-shadow: 2px 2px 10px #888888;
  border-radius: 10px;
  p {
    text-align: center;
  }
}
</style>