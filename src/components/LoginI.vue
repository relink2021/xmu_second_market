<template>
  <!-- 登录界面 -->
  <div class="login_container">
    <!-- <div class="avatar_box"> -->
    <!-- 页头 -->
    <!-- <img src="../assets/校徽.jpg" alt />
    </div> -->
    <!-- <div class="xmu_badge">
            <img src="../assets/xmuBadge.jpg" alt/>
        </div> -->

    <div class="login_box">
      <!--从此处开始为表单区域 -->
      <div class="title">TestChat</div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login_form" label-width="0">
        <el-form-item prop="username">
        <!-- 用户名 -->
        <!-- prefix-icon="iconfont icon-administratorsearch" -->
          <el-input v-model="loginForm.username" placeholder="请输入账号">
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <!-- prefix-icon="iconfont icon-password" -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns1">
          <el-button type="text" @click="resetPassword = true">忘记密码？</el-button>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="registerBtn">注册</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 弹出修改密码对话框 -->
    <!-- 1.外层对话框：验证手机号和邮箱 -->
    <el-dialog title="找回密码" :visible.sync="resetPassword" width="30%">
      <!-- 2.内层对话框：修改密码 -->
      <el-dialog width="30%" title="修改密码" :visible.sync="innerVisible" append-to-body center>
        <el-form ref="resetFormRef" :rules="resetRules" :model="resetForm" class="reset_form" status-icon>
          <el-form-item prop="password">
            新密码：
            <el-input v-model="resetForm.password" type="password" placeholder="请输入新密码" autocomplete="off"
              style="font-size: 15px; margin-right: 357px; width: 400px"></el-input>
          </el-form-item>
          <!-- 密码验证 -->
          <el-form-item prop="checkpass">
            重复输入密码：
            <el-input v-model="resetForm.checkpass" type="password" placeholder="再次输入密码" autocomplete="off"
              style="font-size: 15px; margin-right: 400px; width: 400px"></el-input>
          </el-form-item>
          <br />
          <el-button style="margin-right: 300px" @click="resetPW">
            保存
          </el-button>
        </el-form>
      </el-dialog>
      <div class="dialog_span">
        <span>请输入注册时所用手机和邮箱：</span>
      </div>
      <el-form :model="PandE" ref="PandEFormRef">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="PandE.username" autocomplete="off" placeholder="请输入用户名"
            style="width: 200px; margin-right: 400px"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="PandE.phone" autocomplete="off" placeholder="请输入手机号"
            style="width: 200px; margin-right: 400px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="PandE.email" autocomplete="off" placeholder="请输入邮箱"
            style="width: 200px; margin-right: 400px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetPassword = false">取 消</el-button>
        <el-button type="primary" @click="validPandE">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  created() {
    this.keyupSubmit();
  },
  data() {
    // 验证再次输入的密码是否正确
    var checkPassWord = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请再次输入密码"));
      }
      setTimeout(() => {
        if (value !== this.resetForm.password) {
          return callback(new Error("两次输入的密码必须一致"));
        } else callback();
      }, 500);
    };
    return {
      // 表单数据对象
      loginForm: {
        username: "",
        password: "",
      },
      // 验证对象
      loginRules: {
        // 校验用户名
        username: [
          { required: true, message: "用户名为必填项", trigger: "blur" }, //必填项验证
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          }, //长度验证
        ],
        // 校验密码
        password: [
          { required: true, message: "用户密码为必填项", trigger: "blur" }, //必填项验证
          { min: 6, max: 10, message: "长度在 6 ~ 10 个字符", trigger: "blur" }, //长度验证
        ],
      },
      resetPassword: false,
      innerVisible: false,
      // 手机和邮箱
      PandE: {
        username: "",
        phone: "",
        email: "",
      },
      formLabelWidth: "30%",
      // 重置密码及校验

      resetForm: {
        username: "",
        password: "",
        checkpass: "",
      },
      resetRules: {
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 20, message: "长度在6 ~ 20个字符", trigger: "blur" },
        ],
        checkpass: [{ validator: checkPassWord, trigger: "blur" }],
      },
    };
  },

  methods: {
    // 跳转至注册页面
    registerBtn() {
      this.$router.push("Register");
    },
    // 登录方法
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        // 1.验证校验规则
        if (!valid) return; // 验证失败
        const { data: res } = await this.$http.post("Login", this.loginForm); //访问后台
        if (res.flag == "ok") {
          window.sessionStorage.setItem("user", res.user); //存储user对象
          this.$message.success("登录成功"); //信息提示
          localStorage.setItem("username", this.loginForm.username);
          if (res.user.role == "普通用户") {
            localStorage.setItem("chat_with", "公共聊天室");
            this.$router.push({ path: "/Head" }); //主页
          } else {
            this.$router.push({ path: "/HomePage" }); //管理员界面
          }
        } else {
          this.$message.error("登录失败"); // 错误提示
        }
      });
    },
    // 验证手机号和邮箱
    validPandE() {
      this.$refs.PandEFormRef.validate(async (valid) => {
        // 1.验证校验规则
        if (!valid) return; // 验证失败
        const { data: res } = await this.$http.post("ValidPandE", this.PandE); //访问后台
        if (res.flag == "ok") {
          //window.sessionStorage.setItem("user",res.user);//存储user对象
          this.$message.success("验证成功");
          localStorage.setItem("username", this.PandE.username);
          this.resetPassword = false; //关闭验证对话框
          this.innerVisible = true; //弹出修改密码对话框
        } else {
          this.$message.error("验证失败"); // 错误提示
        }
      });
    },
    // 重置密码方法
    resetPW() {
      // 1. 验证校验规则
      this.resetForm.username = localStorage.getItem("username");
      this.$refs.resetFormRef.validate(async (valid) => {
        if (!valid) return; // 验证失败
        const { data: res } = await this.$http.post("reset", this.resetForm); // 访问后台
        if (res == "success") {
          this.$message.success("修改密码成功"); // 信息提示
          this.innerVisible = false;
        } else {
          this.$message.error("修改密码失败"); // 错误提示
          this.innerVisible = false;
        }
      });
    },
    // 登录绑定回车按钮
    keyupSubmit() {
      document.onkeydown = (e) => {
        let _key = window.event.keyCode;
        // 按回车，调用登录方法
        if (_key === 13) {
          this.login();
        }
      };
    },
  },
};
</script>
<style lang="less" scoped>
.login_container {
  background: url("../assets/xmuPhoto.jpg");
  background-size: 100% 100%;
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 500px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.8);
  position: absolute;
  //z-index: 6;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  border-radius: 20px;
}

.btns1 {
  position: relative;
  left: 42%;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  top: 40%;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.title {
  font-family: "微软雅黑";
  font-size: 35px;
  font-weight: bold;
  padding: 25px;
  position: relative;
  left: 0%;
  top: 15%;
}

.dialog_span {
  font-family: "微软雅黑";
  font-size: 20px;
  padding: 5px;
  margin-bottom: 5px;
}

/deep/.el-input__inner {
  font-family: 'Genshin';
  text-align: center;
  background-color: transparent;
  border-color: grey;
  width: 280px;
  border-radius: 0em;
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
  font-size: 16px;
  /*outline: medium;*/
}

/deep/.el-input {
  width: 400px;
}

/deep/.el-input__inner::placeholder {
  font-family: 'Genshin';
  color: rgba(57, 54, 54, 0.461);
  font-size: 16px;
  text-align: center;
}

/deep/ .el-form-item__error {
  margin-left: 90px;
  text-align: left;
}
</style>