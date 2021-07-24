<template>
  <!-- 引入布局 -->
  <el-container class="PCp-container">
    <!-- 头部 -->
    <el-header style="width: auto; height: auto">
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
                to="edit"
                @click.native="flushCom1"
                style="font-size: 15px; color: #fff"
                >修改密码
              </router-link></el-menu-item
            >
            <el-menu-item index="2-1-2">
              <router-link
                to="edit"
                @click.native="flushCom1"
                style="font-size: 15px; color: #fff"
                >手机绑定
              </router-link></el-menu-item
            >
            <el-menu-item index="2-1-3"
              ><router-link
                to="edit"
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
                to="user"
                @click.native="flushCom"
                style="font-size: 15px; color: #fff"
                >收货地址
              </router-link></el-menu-item
            >
            <el-menu-item index="2-2-2"
              ><router-link
                to="user"
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
          账号管理
        </h5>
        <!-- 侧边栏颜色 -->
        <el-menu
          background-color="#006e9f"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">
           <router-link
              to="user"
              @click.native="flushCom"
              style="font-size: 15px; color: #fff"
              >个人资料
            </router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <span slot="title" style="font-size: 15px">安全设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主体内容 -->
      <el-main>
        <el-card>
          <el-row style="text-align: begin; margin-left: 400px">
            <div style="font-size: 20px">
              密码：<el-input
                :rows="1"
                style="width: 400px"
                v-model="input1"
                placeholder="***********"
              ></el-input>
            </div>
            <br />
            <div style="font-size: 20px">
              再次确认密码：<el-input
                :rows="1"
                style="width: 400px"
                v-model="input2"
                placeholder="***********"
              ></el-input>
            </div>
            <br />
            <el-button style="margin-left: 200px"> 保存 </el-button>
          </el-row>
        </el-card></el-main
      ></el-container
    ></el-container
  >
</template>

<script>
export default {
  data() {
    return {
      input1: "",
      input2: "",
    };
  },
};
</script>

<style class='less' scoped>
/* 根节点样式 */
.PCp-container {
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