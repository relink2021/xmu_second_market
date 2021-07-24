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
    <!-- 面包屑导航区域 -->
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/HomePage' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>订单管理</el-breadcrumb-item>
  <el-breadcrumb-item>订单列表</el-breadcrumb-item>
</el-breadcrumb>
<!-- 卡片视图区区域 -->
<el-card class="box-card">
    <!-- 搜索与添加区域 -->
  <el-row :gutter="20">
      <el-col :span="9">
        <el-input placeholder="请输入内容"  clearable >
        <el-button slot="append" icon="el-icon-search" ></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible=true">添加订单</el-button>
      </el-col>
  </el-row>
  <!-- 用户列表区域 -->
  <el-table :data="userlist" border stripe>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column label="卖家" prop="username"></el-table-column>
      <el-table-column label="买家" prop="mobile"></el-table-column>
      <el-table-column label="成交金额" prop="role_name"></el-table-column>
      <el-table-column label="操作" width="180px">
          <template>
              <!-- 修改按钮 -->
              <el-tooltip class="item" effect="dark" content="修改订单" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
              </el-tooltip>
              <!-- 删除按钮 -->
              <el-tooltip class="item" effect="dark" content="删除订单" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
              </el-tooltip>
              <!-- 分配订单按钮 -->
              <el-tooltip class="item" effect="dark" content="修改订单" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
              </el-tooltip>
          </template>
      </el-table-column>
  </el-table>
  <!-- 分页区域 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
</el-card>

<!-- 添加用户的对话框 -->
<el-dialog
  title="添加订单"
  :visible.sync="addDialogVisible"
  width="50%">
  <!-- 内容主体区域 -->
  <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
  <el-form-item label="卖家" prop="username">
    <el-input v-model="addForm.username"></el-input>
  </el-form-item>
    <el-form-item label="买家" prop="password">
    <el-input v-model="addForm.password"></el-input>
  </el-form-item>
    <el-form-item label="成交金额" prop="mobile">
    <el-input v-model="addForm.mobile"></el-input>
  </el-form-item>
  </el-form>
  <!-- 底部区域 -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

    </el-main>
</el-container>
</el-container>  
</template>

<script>
export default {
    data(){
        return {menulist:[],
        // 是否折叠
        isCollapse:false,
        queryInfo:{
            query:'',
            pagenum:1,
            pagesize:2
        },
        userlist:[],
        total:0,
        addDialogVisible:false,
        addForm:{
            username:'',
            password:'',
            mobile:''
        },
        addFormRules:{
            username:[
                {
                    required:true,message:'请输入用户名',trigger:'blur'
                },
                {
                    min:3,
                    max:10,
                    message:'用户名的长度在3-10个字符之间',
                    trigger:'blur'
                }
            ],
            password:[
                {
                    required:true,message:'请输入密码',trigger:'blur'
                },
                {
                    min:6,
                    max:15,
                    message:'密码的长度在6-15个字符之间',
                    trigger:'blur'
                }
            ],
            mobile:[
                {
                required:true,message:"请输入手机号",trigger:'blur'
                }
            ]
        }
        }
    },
    created(){
        this.getMenuList()
    },
    methods:{
        data(){
            return{
                // 获取用户列表的参数对象
                queryInfo:{
                    query:'',
                    pagenum:1,
                    pagesize:2
                },
                userlist:[],
                total:0
            }
        },
        created(){
            this.getUserList()
        },
        methods:{
            async getUserList(){
            const {data:res}=await this.$http.get('users',{ 
                params:this.queryInfo    
            })
            if(res.meta.status !==200) return this.$message.error('获取用户列表失败！')
            this.userlist=res.data.users
            this.total=res.data.total
            console.log(res)
            },
            handleSizeChange(newSize){
                console.log(newSize)
            },
            handleCurrentChange(newPage){
                console.log(newPage)
            }
        },
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