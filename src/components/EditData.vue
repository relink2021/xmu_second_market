<template>
    <!-- 主体 -->
        <el-card>
          <el-form
            ref="resetFormRef"
            :rules="resetRules"
            :model="resetForm"
            class="reset_form"
            status-icon
            style="margin-left: 400px"
          >
            <el-form-item prop="password">
              新密码：
              <el-input
                v-model="resetForm.password"
                type="password"
                placeholder="请输入新密码"
                autocomplete="off"
                style="font-size: 15px; margin-right: 357px; width: 400px;"
              ></el-input>
            </el-form-item>
            <!-- 密码验证 -->
            <el-form-item prop="checkpass">
              重复输入密码：
              <el-input
                v-model="resetForm.checkpass"
                type="password"
                placeholder="再次输入密码"
                autocomplete="off"
                style="font-size: 15px; margin-right: 400px; width: 400px"
              ></el-input>
            </el-form-item>
            <br />
            <el-button 
            style="margin-right: 300px;" 
            @click="resetPassWord">
              保存
            </el-button>
          </el-form>
        </el-card>
</template>

<script>
export default {
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
    // 校验规则
    return {
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
  methods:{
    // 重置密码
    resetPassWord() {
      // 1. 验证校验规则
      this.resetForm.username = localStorage.getItem('username');
      this.$refs.resetFormRef.validate(async (valid) => {
        if (!valid) return; // 验证失败
        const { data: res } = await this.$http.post(
          "reset",this.resetForm
        ); // 访问后台
        console.log(res);
        if (res == "success") {
          this.$message.success("修改密码成功"); // 信息提示
        } else {
          this.$message.error("修改密码失败"); // 错误提示
        }
      });
    },
  },
};
</script>

<style class='less' scoped>
/* 根节点样式 */

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