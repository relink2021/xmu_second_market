<template>
<!-- 管理员界面 -->
<el-container class="home-container">
    <!-- 头部 -->
    <el-header>
        <div>
            <span>厦门大学二手交易平台</span>
            <span>管理员界面</span>
            <span class="fenge"></span>
        </div>
        <el-menu
        :default-active="activeIndex1"
        class="el-navigation"
        mode="horizontal"
        background-color="#373D41"
        text-color="#fff"
        active-text-color="#ffd04b"
        >
        <el-submenu index="1">
        <template slot="title">导航栏</template>
        <el-menu-item index="1-1">了解我们</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">我的二手交易</template>
        <el-menu-item index="2-1">已购买的宝贝</el-menu-item>
        <el-menu-item index="2-2">我的购物车</el-menu-item>
        </el-submenu>
        </el-menu>
        <span></span>
        <el-button type="info" @click="logout">Return</el-button>
    </el-header>
<el-container>
    <!-- 侧边栏区域 -->
    <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单 -->
      <el-menu background-color="#333744" text-color="#fff"
      active-text-color="#409EFF" :unique-opened="true"  :collapse="isCollapse"
      :collapse-transition="false" :router="true"
      >
      <!-- 一级菜单 -->
      <el-submenu index="1">
          <!-- 一级菜单的模板区域 -->
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-user"></i>
          <!-- 文本 -->
          <span>用户管理</span>
        </template>
        <el-menu-item index="Users" >
            <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>用户列表</span>
            </template>
        </el-menu-item>
        </el-submenu>
              <el-submenu index="2">
          <!-- 一级菜单的模板区域 -->
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-goods"></i>
          <!-- 文本 -->
          <span>订单管理</span>
        </template>
        <el-menu-item index="Orders">
            <template slot="title">
                <i class="el-icon-s-goods"></i>
                <span>订单列表</span>
            </template>
        </el-menu-item>
        </el-submenu>  
    </el-menu>
    </el-aside>
    <!-- 右边主体区域 -->
    <el-main>
        <div>欢迎来到厦门大学二手交易平台的管理员界面。</div>
        <div>点击用户管理中的用户列表，可以进入用户列表界面。</div>
        <div>在用户列表界面中，你可以增加、修改、删除用户数据。</div>
        <div>点击订单管理中的订单列表，可以进入订单列表界面。</div>
        <div>在订单列表界面中，你可以查看本网站的订单数据。</div>
        <div>Enjoy your journey in this website!</div>
    </el-main>
</el-container>
</el-container>  
</template>

<script>
export default {
    data(){
        return {menulist:[],
        // 是否折叠
        isCollapse:false
        }
    },
    created(){
        this.getMenuList()
    },
    methods:{
        logout(){
            window.sessionStorage.clear()
            this.$router.push('/Login')
        },
        // 获取所有菜单
        async getMenuList(){
            const {data:res} =await this.$http.get('menus')
            if(res.meta.status !==200) return this.$message.error(res.meta.msg)
            this.menulist=res.data
            console.log(res)
        },
        // 点击按钮，切换菜单的折叠与展开
        toggleCollapse(){
            this.isCollapse=!this.isCollapse
        }
    }
}
</script>

<style lang="less" scoped>
.home-container{
    height: 100%;
    overflow-y:scroll;
}
.el-header{
    background-color:#373D41 ;
    display: flex;
    padding-left: 0;
    color: #fff;
    font-size: 20px;
    >div {
        display: flex;
        align-items: center;
        span{
            margin-left: 15px;
        }
    }
}
.el-aside{
    background-color:#373D41 ;
    .el-menu{
        border-right: none;
    }
}
.el-main{
    background-color:#EAEDF1;
    text-align:center;
}
 .fenge{
padding:20px 6px 0px 6px;
margin-left: 6px;
border-left: 1px solid rgb(255, 255, 255);
font-size: 0;
}
.toggle-button{
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>