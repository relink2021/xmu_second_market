<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/logo-mini.png" alt />
        <span>二手商城</span>
      </div>
      <!-- 搜索栏 -->
      <div class="search">
        <el-input placeholder="搜索你想要的二手商品" v-model="query" clearable @clear="saveQuery">
          <!-- 搜索按钮 -->
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="saveQuery"
          ></el-button>
        </el-input>
      </div>
      <!-- 顶栏 -->
      <div class="line"></div>
      <el-menu
        :default-active="top_index"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#333744"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
      >
        <el-menu-item
          :index="top_item.path"
          v-for="top_item in top_list"
          :key="top_item.path"
          @click="save_top_index(top_item.path)"
        >
          <template>
            <span>{{ top_item.name }}</span>
          </template>
        </el-menu-item>
      </el-menu>
      <!-- 用户头像 -->
      <div class="user">
        <el-avatar :src="userInfo.avatar"> </el-avatar>
        <!-- 下拉菜单 -->
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{ this.userInfo.username
            }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="login">切换账号</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
          active-text-color="#409eff"
          :default-active="aside_index"
        >
          <!-- 一级菜单 -->
          <el-menu-item index="0" @click="clearKind">
            <template>
              <i class="el-icon-shopping-bag-1"></i>
              <span>全部商品</span>
            </template>
          </el-menu-item>
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconList[item.id]"></i>
              <span>{{ item.title }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="it.id.toString()"
              v-for="it in item.sList"
              :key="it.id"
              @click="saveKind(it.title, it.id.toString())"
            >
              <template slot="title">
                <i :class="iconList[it.id]"></i>
                <span>{{ it.title }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- 右侧内容主体 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 页脚 -->
        <!-- <el-footer>
          <p>Copyright © 2021.Company name All rights reserved.</p>
        </el-footer> -->
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Utils from "../assets/util.js";
export default {
  name: "Element",
  data() {
    return {
      // 菜单列表
      menuList: [],
      //搜索输入
      query: "",
      top_index: "Goods",
      aside_index: "0",
      // 查询信息实体
      total: 0,
      // 菜单列表
      menuList: [],
      top_list: [
        {
          path: "Goods",
          name: "首页",
        },
        {
          path: "PersonalCenter",
          name: "个人中心",
        },
        {
          path: "MyEstablish",
          name: "我要发布",
        },
      ],
      iconList: {
        100: "iconfont icon-shumachanpin",
        200: "iconfont icon-jiadian",
        300: "iconfont icon-clothes",
        400: "iconfont icon-yundong",
        500: "el-icon-collection",
        101: "iconfont icon-shouji",
        102: "iconfont icon-xiangji",
        103: "iconfont icon-diannao",
        201: "iconfont icon-jiadiandianqi",
        202: "iconfont icon-yingyinjiaocai",
        301: "iconfont icon-nvzhuang",
        302: "iconfont icon-nanzhuang",
        303: "iconfont icon-nvxie",
        304: "iconfont icon-fushi-nanxie",
        305: "iconfont icon-xiangbao",
        306: "iconfont icon-icon-test",
        401: "iconfont icon-jianshenqicai",
        402: "iconfont icon-zihangche",
        501: "iconfont icon-book1",
        502: "iconfont icon-keben",
      },
      userInfo: {
        username: "",
        avatar: "",
      },
    };
  },
  // onload 事件
  created() {
    // 顶栏保存刷新前的页签
    if (window.sessionStorage.getItem("top_index") != null) {
      this.top_index = window.sessionStorage.getItem("top_index");
    }
    // 侧边栏保存刷新前的页签
    if (window.sessionStorage.getItem("aside_index") != null) {
      this.aside_index = window.sessionStorage.getItem("aside_index");
    }
    this.getMenuList();
    this.userInfo.username = localStorage.getItem("username");
    this.getUserInfo();
  },
  methods: {
    // 获取侧边栏菜单
    async getMenuList() {
      const { data: res } = await this.$http.get("Menus");
      if (res.flag != 200) return this.$message.error("获取列表失败！！！"); // 访问失败
      this.menuList = res.menus; // 访问成功，数据回填
    },
    async getUserInfo() {
      const { data: res } = await this.$http.post("oneUser", this.userInfo);
      this.userInfo.avatar = res[0].avatar;
    },
    // 跳转到登录/注册界面
    login() {
      window.sessionStorage.clear(); //清除session
      this.$router.push("/LoginI");
    },
    // 跳转到个人中心
    person() {
      this.$router.push("/PersonalCenter");
    },
    // 跳转到我要发布
    establish() {
      this.$router.push("/Establish");
    },
    // 存储选中的物品名称，跳转至商品详情界面并根据物品名称显示详情
    goodpage(item_name) {
      localStorage.setItem("item_name", item_name);
      this.$router.push("/GoodPage");
    },
    // 存储当前的商品分类，跨页面进行商品信息的更新
    saveKind(sub_kind, id) {
      window.sessionStorage.setItem("sub_kind", sub_kind);
      Utils.$emit("getItemList", "msg");
      window.sessionStorage.setItem("aside_index", id);
    },
    // 清空当前的商品分类
    clearKind() {
      window.sessionStorage.clear("sub_kind");
      Utils.$emit("getItemList", "msg");
      window.sessionStorage.setItem("aside_index", "0");
    },
    // 存储查询信息，跨页面进行商品信息的更新
    saveQuery() {
      window.sessionStorage.setItem("query", this.query);
      Utils.$emit("getItemList", "msg");
    },
    // 存储顶栏的激活状态
    save_top_index(cur_index) {
      window.sessionStorage.setItem("top_index", cur_index);
    },
  },
  mounted() {},
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
  background-color: #333744;
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
  .el-menu {
    border-bottom: none;
    font-weight: bold;
  }

  // .search {
  //   width: 20%;
  //   height: 60%;
  //   position: relative;
  //   top: 20%;
  //   right: 0%;
  //   box-sizing: border-box;
  //   border: 2px solid #ccc;
  //   border-radius: 4px;
  //   font-size: 16px;
  //   background-color: rgb(255, 255, 255);
  //   background-image: url("https://static.runoob.com/images/mix/searchicon.png");
  //   background-position: 9px 6px;
  //   background-repeat: no-repeat;
  //   padding: 12px 20px 12px 40px;
  //   -webkit-transition: width 0.4s ease-in-out;
  //   transition: width 0.4s ease-in-out;
  // }
  //厦门大学logo
  img {
    width: 45%;
    height: 70%;
  }
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
    border-right: none;
  }
}

.iconfont {
  margin-right: 7px;
}

//主体样式
.el-main {
  background-color: #eaedf1;
  //position:absolute;
  width: 100%;
  height: auto;
  .el-row {
    margin-left: 5%;
    margin-top: 5%;
    position: relative;

    &:last-child {
      margin-bottom: 0;
    }
    .el-col {
      border-radius: 4px;

      .good {
        background-color: #ffffff;
        border-radius: 4px;
      }
      .image {
        width: 100%;
        display: block;
        border-radius: 4px;
      }
      .name {
        font-weight: bold;
      }
      .price {
        color: rgb(240, 18, 18);
        font-size: 25px;
        margin-top: 20cm;
      }
      .button {
        float: right;
      }
    }
  }
}

.el-dropdown-link {
  font-size: 16px;
  color: #fff;
}

.el-footer {
  background-color: #eaedf1;
  width: 82%;
  position: absolute;
  left: 16%;
  top: 140%;
  //background-color: slateblue;
  box-shadow: 2px 2px 10px #888888;
  border-radius: 10px;
  p {
    text-align: center;
  }
}
</style>
