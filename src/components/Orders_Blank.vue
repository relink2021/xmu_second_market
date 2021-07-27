<template>
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
        </el-menu>
        <span></span>
        <el-button type="info" @click="logout">返回</el-button>
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
        <el-menu-item index="users" >
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
        <el-menu-item index="orders">
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
         <router-view></router-view>
    </el-main>

</el-container>  
</el-container>
</template>

<script>
export default {
    created()
    {
       // this.getMenuList()
        this.getOrderList()
        this.getItemList();
    },
    data(){
        return {menulist:[],
        activeIndex1: "",
        // 是否折叠
        isCollapse:false,
        queryInfo:{
            query:'',
            pagenum:1,
            pagesize:2
        },
        orderList:[],
        userList:[],
        total:0,
        item_name:"",
        sellername:"",
        buyername:"",
        }
    },

        methods:{

            // 获取所有订单
            async getOrderList() 
            {
                const { data: res } = await this.$http.get("allOrder", {params: this.queryInfo,});
                //console.log(res);
                this.orderList = res.data;
                this.total = res.number;
                console.log(this.orderList);
            },
            async getItemList()
            {
                const { data: res } = await this.$http.get("allItem", {params: this.queryInfo,});
                this.itemList = res.data;
                this.total = res.number;
                console.log(this.itemList);
            },
            /*
            // 获取所有菜单
            async getMenuList(){
            const {data:res} =await this.$http.get('menus')
            if(res.meta.status !==200) return this.$message.error(res.meta.msg)
            this.menulist=res.data
            console.log(res)
            },
            */
            // 单页最大用户数量
            handleSizeChange(newSize){
                //console.log(newSize);
                this.queryInfo.pagesize=newSize;
                this.getOrderList();
            },
             // pageNum的触发动作
            handleCurrentChange(newPage){
                //console.log(newPage);
                this.queryInfo.pageNum = newPage;
                this.getOrderList();
            },
            logout(){
            window.sessionStorage.clear()
            this.$router.push('/Login')
            },
        
        // 点击按钮，切换菜单的折叠与展开
        toggleCollapse(){
            this.isCollapse=!this.isCollapse
        },

        detail(item_name,sellername,buyername,total) {
            //console.log(item_name);
            localStorage.setItem('order_item',item_name);
            localStorage.setItem('order_sellername', sellername);
            localStorage.setItem('order_buyername',buyername);
            this.$router.push("/OrderDetail");
        },

        },
        
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
.el-menu{
    border-right-width:0px;
}
.el-main{
    background-color:#EAEDF1;
    text-align:left;
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
.el-table{
    margin-top: 15px;
    font-size: 12px;
}
</style>