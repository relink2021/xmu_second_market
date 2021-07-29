<template>
  <!-- 权限管理界面 -->
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
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
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
            <el-menu-item index="users">
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
          <el-breadcrumb-item :to="{ path: '/HomePage' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区区域 -->
        <el-card class="box-card">
          <!-- 搜索与添加区域 -->
          <el-row :gutter="20">
            <el-col :span="9">
              <el-input
                placeholder="请输入用户名搜索用户"
                v-model="queryInfo.query"
                clearable
                @clear="getUserList"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="getUserList"
                ></el-button>
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="addDialogVisible = true"
                >添加用户</el-button
              >
            </el-col>
          </el-row>
          <!-- 用户列表区域 -->
          <el-table :data="userList" border stripe>
            <el-table-column label="用户名" prop="username"></el-table-column>
            <!-- <el-table-column label="密码" prop="password"></el-table-column> -->
            <el-table-column label="电话" prop="phone"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="角色" prop="role"></el-table-column>
            <el-table-column label="状态" prop="state">
              <!-- 作用域插槽 -->
              <template slot-scope="scope">
                <el-switch v-model="scope.row.state" @change="userStateChanged(scope.row)"></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180px">
              <template slot-scope="scope">
                <!-- 修改按钮 -->
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="修改角色"
                  placement="top"
                  :enterable="false"
                >
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="showUpdateDialog(scope.row.username)"
                  ></el-button>
                </el-tooltip>
                <!-- 删除按钮 -->
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="删除角色"
                  placement="top"
                  :enterable="false"
                >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    @click="deleteUser(scope.row.username)"
                  ></el-button>
                </el-tooltip>
                <!-- 分配角色按钮 -->
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="修改角色"
                  placement="top"
                  :enterable="false"
                >
                  <el-button
                    type="warning"
                    icon="el-icon-setting"
                    size="mini"
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页区域 -->
          <div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryInfo.pageNum"
              :page-sizes="[1, 2, 5, 10]"
              :page-size="queryInfo.pageSize"
              layout="total, sizes, prev, pager, next"
              :total="total"
            >
            </el-pagination>
          </div>
        </el-card>
        <!-- 添加用户的对话框 -->
        <el-dialog
          title="添加用户"
          :visible.sync="addDialogVisible"
          width="50%"
        >
          <!-- 内容主体区域 -->
          <el-form
            :model="addForm"
            :rules="addFormRules"
            ref="addFormRef"
            label-width="70px"
            status-icon
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="addForm.username"></el-input>
            </el-form-item>
            <!-- <el-form-item label="密码" prop="password">
              <el-input v-model="addForm.password"></el-input>
            </el-form-item> -->
            <el-form-item label="手机" prop="phone">
              <el-input v-model="addForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="addForm.email"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="role">
              <el-radio v-model="addForm.role" label="普通用户"
                >普通用户</el-radio
              >
              <el-radio v-model="addForm.role" label="超级管理员"
                >超级管理员</el-radio
              >
            </el-form-item>
          </el-form>
          <!-- 底部区域 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 修改对话框 -->
        <el-dialog
          title="修改用户信息"
          :visible.sync="updateDialogVisible"
          width="50%"
        >
          <!-- 内容主体区域 -->
          <el-form
            :model="updateForm"
            :rules="updateFormRules"
            ref="updateFormRef"
            label-width="70px"
            status-icon
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="updateForm.username" disabled></el-input>
            </el-form-item>
            <!-- <el-form-item label="密码" prop="password">
              <el-input v-model="updateForm.password"></el-input>
            </el-form-item> -->
            <el-form-item label="手机" prop="phone">
              <el-input v-model="updateForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="updateForm.email"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="role">
              <el-radio v-model="updateForm.role" label="普通用户"
                >普通用户</el-radio
              >
              <el-radio v-model="updateForm.role" label="超级管理员"
                >超级管理员</el-radio
              >
            </el-form-item>
          </el-form>
          <!-- 底部区域 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="updateDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateUserInfo">确 定</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {
    this.getUserList();
  },
  data() {
    // 验证用户名是否合法
    var checkUsername = (rule, value, callback) => {
      this.checkUser();
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      setTimeout(() => {
        if (value.length > 12 || value.length < 5) {
          callback(new Error("长度在5 ~ 12个字符"));
        } else {
          if (!this.userFlag) {
            callback(new Error("用户名已存在"));
          } else callback();
        }
      }, 500);
    };
    // 验证手机号码是否正确
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        if (isNaN(value)) {
          callback(new Error("电话号码应为纯数字"));
        } else {
          if (value.length !== 11) {
            callback(new Error("请输入11位电话号码"));
          } else {
            callback();
          }
        }
      }, 500);
    };
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      setTimeout(() => {
        if (!reg.test(value)) {
          callback(new Error("邮箱格式错误"));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      menulist: [],
      // 是否折叠
      isCollapse: false,
      // 查询信息实体
      queryInfo: {
        query: "",
        pageNum: 1,
        pageSize: 5,
      },
      activeIndex1: "",
      userList: [], // 用户列表
      total: 0, // 总记录数
      userFlag: "",
      addDialogVisible: false, // 对话框隐藏显示状态
      // 添加表单信息
      addForm: {
        username: "",
        password: "",
        phone: "",
        email: "",
        role: "普通用户",
      },
      // 修改用户信息
      updateForm: {},
      // 显示/隐藏修改用户栏
      updateDialogVisible: false,
      // 添加表单验证
      addFormRules: {
        username: [
          { required: true, validator: checkUsername, trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 20, message: "长度在6 ~ 20个字符", trigger: "blur" },
        ],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        role: [{ required: true }],
      },
      // 修改表单验证
      updateFormRules: {
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 20, message: "长度在6 ~ 20个字符", trigger: "blur" },
        ],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        role: [{ required: true }],
      },
    };
  },
  methods: {
    // 获取用户列表
    async getUserList() {
      const { data: res } = await this.$http.get("allUser", {
        params: this.queryInfo,
      });
      this.userList = res.data;
      this.total = res.number;
    },
    // 新增用户
    addUser() {
      // 1. 验证校验规则
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return; // 验证失败
        const { data: res } = await this.$http.post("addUser", this.addForm); // 访问后台
        if (res == "success") {
          this.$message.success("新建用户成功"); // 信息提示
          this.addDialogVisible = false;
          this.getUserList();
        } else {
          this.$message.error("新建用户失败"); // 错误提示
        }
      });
    },
    async checkUser() {
      const { data: res } = await this.$http.post("checkUser", this.addForm);
      if (res == "ok") {
        this.userFlag = true;
      } else {
        this.userFlag = false;
      }
    },
    // 根据用户名删除信息
    async deleteUser(username) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除用户,是否继续",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult != "confirm") {
        return this.$message.info("取消删除");
      }
      const { data: res } = await this.$http.delete(
        "deleteUser?username=" + username
      );
      if (res == "success") {
        this.$message.success("删除成功"); // 信息提示
        this.getUserList();
      } else {
        this.$message.error("删除失败"); // 错误提示
      }
    },
    // 显示对话框
    async showUpdateDialog(username){
      const {data:res} = await this.$http.get("getUpdate?username="+username);
      this.updateForm = res; // 回填信息
      this.updateDialogVisible = true; // 打开对话框
    },
    // 关闭窗口
    updateDialogClosed(){
      this.$refs.updateForm.resetFields(); 
    },
    // 确认修改
    updateUserInfo(){
      this.$refs.updateFormRef.validate(async valid =>{
        if(!valid) return;
        const {data:res} = await this.$http.put("updateUser",this.updateForm);
        if(res!="success") return this.$message.error("更新信息失败");
        this.$message.success("更新信息成功");
        // 隐藏
        this.updateDialogVisible = false;
        this.getUserList();
      })
    },
    // 单页最大用户数量
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getUserList();
    },
    // pageNum的触发动作
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getUserList();
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/LoginI");
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    async userStateChanged(userInfo) {
      const {data:res} = await this.$http.post("updateState",userInfo);
      if (res == "success") {
        this.$message.success("修改状态成功"); // 信息提示
        this.getUserList();
      } else {
        this.$message.error("修改状态失败"); // 错误提示
        userInfo.state = !userInfo.state;
      }
    }
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  overflow-y: scroll;
}
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 17px;
}
.el-header {
  background-color: #373d41;
  display: flex;
  padding-left: 0;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #373d41;
  .el-menu {
    border-right: none;
  }
}
.el-menu {
  border-right-width: 0px;
}
.el-main {
  background-color: #eaedf1;
  text-align: left;
}
.fenge {
  padding: 20px 6px 0px 6px;
  margin-left: 6px;
  border-left: 1px solid rgb(255, 255, 255);
  font-size: 0;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
.el-input{
  width: 95%;
}
</style>