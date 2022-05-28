<template>
  <!-- 主体内容 -->
  <el-card class="body">
    <el-row style="text-align: left; margin-left: 5%; margin-right: 5%">
      <span class="title">修改个人信息</span>
      <el-divider></el-divider>
      <el-container>
        <el-aside width="600px">
          <br /><br />
          <div style="font-size: 18px">
            <span class="msg_item">用户名</span>
            <br /><br />
            <el-input :rows="1" style="width: 500px" v-model="modifyForm.username" :disabled="true"></el-input>
          </div>
          <br /><br />
          <div style="font-size: 18px">
            <span class="msg_item">真实姓名</span>
            <br /><br />
            <el-input :rows="1" style="width: 500px" v-model="modifyForm.real_name" placeholder="请输入真实姓名"></el-input>
          </div>
          <br /><br />
          <div style="font-size: 18px">
            <span class="msg_item">性别</span>
            <br /><br />
            <template>
              <el-radio v-model="modifyForm.sex" label="男" style="font-size: 20px">男</el-radio>
              <el-radio v-model="modifyForm.sex" label="女" style="font-size: 20px">女</el-radio>
            </template>
          </div>
          <br /><br />
          <div style="font-size: 18px">
            <span class="msg_item">收货地址</span>
            <br /><br />
            <el-input :rows="1" style="width: 500px" v-model="modifyForm.address" placeholder="请输入收货地址"></el-input>
          </div>
          <br /><br />
          <div style="font-size: 18px">
            <span class="msg_item">电话</span>
            <br /><br />
            <el-input :rows="1" style="width: 500px" v-model="modifyForm.phone" placeholder="请输入电话号码"></el-input>
          </div>
          <br /><br />
          <div style="font-size: 18px">
            <span class="msg_item">邮箱</span>
            <br /><br />
            <el-input :rows="1" style="width: 500px" v-model="modifyForm.email" placeholder="请输入邮箱"></el-input>
          </div>
          <br /><br />
        </el-aside>
        <el-main>
          <span class="msg_item">头像</span>
          <el-upload action="http://localhost:9000/file/upload" :on-success="saveFileURL">
            <el-button circle>
              <el-avatar :src="modifyForm.avatar"> </el-avatar>
            </el-button>
          </el-upload>
          <br /><br />
          <el-button style="margin-left: 90px; width: 200px; font-family: Genshin; font-size: 18px" @click="updateMessage">
            保存
          </el-button>
        </el-main>
      </el-container>
    </el-row>
  </el-card>
</template>

<script>
export default {
  created() {
    this.showMessage();
  },
  data() {
    return {
      modifyForm: {
        username: "",
        real_name: "",
        address: "",
        phone: "",
        email: "",
        sex: "男",
        avatar: "",
      },
      options: [
        {
          value: 1,
          label: "东南",
          children: [
            {
              value: 2,
              label: "上海",
              children: [
                { value: 3, label: "普陀" },
                { value: 4, label: "黄埔" },
                { value: 5, label: "徐汇" },
              ],
            },
            {
              value: 7,
              label: "江苏",
              children: [
                { value: 8, label: "南京" },
                { value: 9, label: "苏州" },
                { value: 10, label: "无锡" },
              ],
            },
            {
              value: 12,
              label: "浙江",
              children: [
                { value: 13, label: "杭州" },
                { value: 14, label: "宁波" },
                { value: 15, label: "嘉兴" },
              ],
            },
          ],
        },
        {
          value: 17,
          label: "西北",
          children: [
            {
              value: 18,
              label: "陕西",
              children: [
                { value: 19, label: "西安" },
                { value: 20, label: "延安" },
              ],
            },
            {
              value: 21,
              label: "新疆维吾尔族自治区",
              children: [
                { value: 22, label: "乌鲁木齐" },
                { value: 23, label: "克拉玛依" },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    // 更新数据库
    async updateMessage() {
      // 访问数据库
      const { data: res } = await this.$http.post(
        "updateMessage",
        this.modifyForm
      );
      if (res == "success") {
        this.$message.success("信息修改成功"); // 信息提示
      } else {
        this.$message.error("信息修改失败"); // 错误提示
      }
    },
    // 显示用户已经填写的信息
    async showMessage() {
      // 访问数据库
      this.modifyForm.username = localStorage.getItem("username");
      const { data: res } = await this.$http.post(
        "showMessage",
        this.modifyForm
      );
      // 填充数据
      this.modifyForm = res;
    },
    // 保存文件路径
    saveImgURL(file) {
      this.modifyForm.avatar = file.response;
      this.updateMessage();
    },
  },
};
</script>

<style class='less' scoped>
/* 主体样式 */
.el-card {
  width: 100%;
  padding: 20px;
}

.el-main[data-v-102ce93a] {
  background-color: #fff;
}

.title {
  font-family: 'Genshin';
  font-size: 30px;
}

.el-divider--horizontal {
  margin: 12px 0;
}

.msg_item {
  font-family: 'Genshin';
  font-size: 18px;
}

.el-main {
  background-color: #eaedf1;
}

/* 去掉链接下划线 */
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}

.el-avatar {
  width: 350px;
  height: 350px;
}

.el-avatar--circle {
  border-radius: 100%;
}

.el-button.is-circle {
  border-color: #fff;
  border-radius: 100%;
}

.el-upload-list {
  display: none;
}
</style>