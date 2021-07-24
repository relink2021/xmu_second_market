<template>
  <!-- 注册界面 -->
  <div class="register_container">
    <div class="avatar_box">
      <!-- 背景图片 -->
      <img src="../assets/xmuPhoto.jpg" alt />
    </div>

    <div class="register_box">
      <!--从此处开始为表单区域 -->
      <div class="title">注册</div>
      <el-form
        ref="registerFormRef"
        :rules="registerRules"
        :model="registerForm"
        class="register_form"
        label-width="0"
        status-icon
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
            prefix-icon="iconfont icon-administratorsearch"
            placeholder="请输入账号"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            prefix-icon="iconfont icon-password"
            type="password"
            placeholder="请输入密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 密码验证 -->
        <el-form-item prop="checkPass">
          <el-input
            v-model="registerForm.checkPass"
            prefix-icon="iconfont icon-password"
            type="password"
            placeholder="再次输入密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 电话 -->
        <el-form-item prop="phone">
          <el-input
            v-model="registerForm.phone"
            prefix-icon="iconfont icon-iconfonticon1"
            placeholder="请输入电话号码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item prop="email">
          <el-input
            v-model="registerForm.email"
            prefix-icon="iconfont icon-youxiang"
            placeholder="请输入邮箱"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="register">注册</el-button>
          <el-button type="info" @click="rollback">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 验证用户名是否合法
    var checkUsername = (rule, value, callback) => {
      this.checkUser();
      if (!value){
          return callback(new Error("用户名不能为空"));
      }
      setTimeout(() => {
        if (value.length > 12 || value.length < 5) {
          callback(new Error("长度在5 ~ 12个字符"));
        } else {
            if(!this.userFlag){
                callback(new Error("用户名已存在"));
            }
            else callback();
        }
      }, 500);
    };
    // 验证再次输入的密码是否正确
    var checkPassWord = (rule, value, callback) => {
      if (!value){
          return callback(new Error("请再次输入密码"));
      }
      setTimeout(() => {
        if (value !== this.registerForm.password) {
          return callback(new Error("两次输入的密码必须一致"));
        }
        else callback();
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
      if(!value) {
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
    }
    return {
      // 注册表
      registerForm: {
        username: "",
        password: "",
        checkPass: "",
        phone: "",
        email: "",
      },
      userFlag:false,
      // 校验规则
      registerRules: {
        username: [
          { validator: checkUsername, trigger: "blur" }
        ],
        checkPass: [{ validator: checkPassWord, trigger: "blur" }],
        password: [
          { required:true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 20, message: "长度在6 ~ 20个字符", trigger: "blur" },
        ],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        email: [
          { validator: checkEmail, trigger: "blur" }
        ],
      },
    };
  },
  methods: {
    // 注册方法
    register() {
      // 1. 验证校验规则
      this.$refs.registerFormRef.validate(async (valid) => {
        if (!valid) return; // 验证失败
        const { data: res } = await this.$http.post(
          "register",
          this.registerForm
        ); // 访问后台
        console.log(res);
        if (res == "success") {
          this.$message.success("注册成功"); // 信息提示
          this.$router.push({ path: "/Login" }); // 页面路由跳转
        } else {
          this.$message.error("注册失败"); // 错误提示
        }
      });
    },
    async checkUser(){
        const {data:res} = await this.$http.post("checkUser",this.registerForm);
        console.log(res);
        if(res == "ok"){
            this.userFlag = true;
        } else {
            this.userFlag = false;
        }
    },
    // 返回按钮
    rollback() {
      this.$router.push("/Login");
    },
  },
};
</script>

<style lang="less" scoped>
.register_container {
  background-color: #ffffff;
  height: 100%;
}

.register_box {
  width: 450px;
  height: 470px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  position: absolute;
  z-index: 6;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
}
.avatar_box {
  width: 100%;
  height: 100%;
  border: 1px solid #eee;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  background: #eee;
  z-index: 5;
  img {
    width: 100%;
    height: 100%;
    background-color: #eee;
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.register_form {
  position: absolute;
  bottom: 0%;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
}
.title {
  font-family: "微软雅黑";
  font-size: 35px;
  padding: 25px;
}
</style>