<template>
  <!-- 主体内容 -->
  <el-card>
    <el-row style="text-align: left; margin-left: 35%">
      <el-upload
        action="http://localhost:9000/file/upload"
        :on-change="saveImgURL"
        :on-success="flush"
        accept=".jpg, .jpeg, .png"
      >
        <span style="font-size: 18px">
          头像：
          <el-button circle> 
            <el-avatar :src="modifyForm.avatar"> </el-avatar>
          </el-button>
        </span>
      </el-upload>
      <br /><br />
      <div style="font-size: 18px">
        用户名：<el-input
          :rows="1"
          style="width: 400px"
          v-model="modifyForm.username"
          :disabled="true"
        ></el-input>
      </div>
      <br /><br />
      <div style="font-size: 18px">
        真实姓名：<el-input
          :rows="1"
          style="width: 400px"
          v-model="modifyForm.real_name"
          placeholder="请输入真实姓名"
        ></el-input>
      </div>
      <br /><br />
      <div style="font-size: 18px">
        性别：<template>
          <el-radio v-model="modifyForm.sex" label="男" style="font-size: 20px"
            >男</el-radio
          >
          <el-radio v-model="modifyForm.sex" label="女" style="font-size: 20px"
            >女</el-radio
          >
        </template>
      </div>
      <br /><br />
      <div style="font-size: 18px">
        收货地址：<el-input
          :rows="1"
          style="width: 400px"
          v-model="modifyForm.address"
          placeholder="请输入收货地址"
        ></el-input>
      </div>
      <br /><br />
      <div style="font-size: 18px">
        电话：<el-input
          :rows="1"
          style="width: 400px"
          v-model="modifyForm.phone"
          placeholder="请输入电话号码"
        ></el-input>
      </div>
      <br /><br />
      <div style="font-size: 18px">
        邮箱：<el-input
          :rows="1"
          style="width: 400px"
          v-model="modifyForm.email"
          placeholder="请输入邮箱"
        ></el-input>
      </div>
      <br /><br />
      <el-button style="margin-left: 200px" @click="updateMessage">
        保存
      </el-button>
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
    // 保存头像路径
    saveImgURL(file) {
      this.modifyForm.avatar = file.response;
      this.updateMessage();
    },
    flush() {
      location.reload();
      location.reload();
    }
  },
};
</script>

<style class='less' scoped>
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

.el-avatar {
  width: 200px;
  height: 200px;
}

.el-avatar--circle {
    border-radius: 100%;
}

.el-button.is-circle {
    border-color: #fff;
    border-radius: 100%;
}

.el-upload-list__item {
    display: none;
}
</style>