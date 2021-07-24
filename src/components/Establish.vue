<template>
  <el-container class="homecontainer">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/logo-mini.png" alt />
        <span>二手商品发布</span>
      </div>

      <!-- 导航栏 -->
      <ul>
        <li><a class="active" type="info" @click="establish">我要发布</a></li>
        <li><a type="info" @click="person">个人中心</a></li>
        <li><a type="info" @click="home">首页</a></li>
      </ul>

      <!-- 用户头像 -->
      <div class="user">
        <i class="el-icon-user-solid" />
        <el-button round type="info" @click="login">登录/注册</el-button>
      </div>
    </el-header>
    <el-container>
      <div class="establish_box">
        <el-row style="text-align: left" class="row">
          <span style="font-size: 20px">
            商品名:
            <el-input
              :rows="1"
              style="width: 320px"
              v-model="releaseForm.item_name"
            ></el-input> </span
          ><br /><br />
          <div style="font-size: 20px">
            成色：<el-cascader
              v-model="values1"
              :options="options1"
              @change="handleChange1"
              clearable
            ></el-cascader>
          </div>
          <br />
          <div style="font-size: 20px">
            分类：<el-cascader
              v-model="values2"
              :options="options2"
              @change="handleChange2"
              clearable
            ></el-cascader>
          </div>
          <br />
          <span style="font-size: 20px">
            单价:
            <el-input
              :rows="1"
              style="width: 320px"
              v-model="releaseForm.price"
            ></el-input> </span
          ><br /><br />
          <span style="font-size: 20px">
            数量:
            <el-input
              :rows="1"
              style="width: 320px"
              v-model="releaseForm.amount"
            ></el-input> </span
          ><br /><br />

          <span style="font-size: 20px">
            详情:
            <el-input
              type="textarea"
              style="width: 320px"
              v-model="releaseForm.comment"
            ></el-input> </span
          ><br /><br />
          <span style="font-size: 20px">
            联系方式:<el-input
              type="textarea"
              style="width: 320px"
              v-model="releaseForm.contact"
            ></el-input> </span
          ><br /><br />
          <div class="publish_title">
            <h3>上传图片</h3>
          </div>
          <div class="img_content">
            <input
              class="upload_img_input"
              type="file"
              name="image"
              required="required"
            />
          </div>
          <img src="" class="show_choose_img" id="show_choose_img" />
          <img
            src=""
            class="show_choose_img"
            th:if="${shopInformation.image}!=null"
            th:src="${shopInformation.image}"
          />
          <!-- 商品图片上传组件 -->
          <br /><br />
          <!-- 商品发布按钮 -->
          <el-button @click="release"> 发布 </el-button>
        </el-row>
      </div>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      releaseForm: {
        username: "",
        item_name: "",
        fineness: "",
        main_kind: "",
        sub_kind: "",
        price: "",
        amount: "",
        comment: "",
        contact: "",
      },
      fileList: [],
      values1: [],
      values2: [],
      options1: [
        {
          value: "一成新",
          label: "一成新",
        },
        {
          value: "二成新",
          label: "二成新",
        },
        {
          value: "三成新",
          label: "三成新",
        },
        {
          value: "四成新",
          label: "四成新",
        },
        {
          value: "五成新",
          label: "五成新",
        },
        {
          value: "六成新",
          label: "六成新",
        },
        {
          value: "七成新",
          label: "七成新",
        },
        {
          value: "八成新",
          label: "八成新",
        },
        {
          value: "九成新",
          label: "九成新",
        },
        {
          value: "全新",
          label: "全新",
        },
      ],
      options2: [
        {
          value: "数码科技",
          label: "数码科技",
          children: [
            {
              value: "手机",
              label: "手机",
            },
            {
              value: "相机",
              label: "相机",
            },
            {
              value: "电脑",
              label: "电脑",
            },
          ],
        },
        {
          value: "影音家电",
          label: "影音家电",
          children: [
            {
              value: "家电",
              label: "家电",
            },
            {
              value: "影音",
              label: "影音",
            },
          ],
        },
        {
          value: "鞋服配饰",
          label: "鞋服配饰",
          children: [
            {
              value: "女装",
              label: "女装",
            },
            {
              value: "男装",
              label: "男装",
            },
            {
              value: "女鞋",
              label: "女鞋",
            },
            {
              value: "男鞋",
              label: "男鞋",
            },
            {
              value: "箱包",
              label: "箱包",
            },
            {
              value: "手表",
              label: "手表",
            },
          ],
        },
        {
          value: "运动代步",
          label: "运动代步",
          children: [
            {
              value: "器械",
              label: "器械",
            },
            {
              value: "代步",
              label: "代步",
            },
          ],
        },
        {
          value: "书籍文具",
          label: "书籍文具",
          children: [
            {
              value: "修养",
              label: "修养",
            },
            {
              value: "专业",
              label: "专业",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleChange1() {
      this.releaseForm.fineness = this.values1[0];
    },
    handleChange2() {
      this.releaseForm.main_kind = this.values2[0];
      this.releaseForm.sub_kind = this.values2[1];
    },
    async release() {
      this.releaseForm.username = localStorage.getItem("username");
      const { data: res } = await this.$http.post(
        "releaseItem",
        this.releaseForm
      );
      if (res == "success") {
        this.$message.success("发布商品成功"); // 信息提示
        this.home();
      } else {
        this.$message.error("发布商品失败"); // 错误提示
      }
    },
    login() {
      window.sessionStorage.clear(); //清除session
      this.$router.push("/Login");
    },
    // 获取导航菜单方法
    getMenuList() {
      console.log("getMenuList");
    },
    // 跳转到个人中心
    person() {
      this.$router.push("/PersonalCenter");
    },
    // 跳转到我要发布
    establish() {
      this.$router.push("/Establish");
    },
    home() {
      this.$router.push("/ShopMall");
    },
    publish() {
      this.$alert("发布成功！", "消息提示", {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `action: ${action}`,
          });
          this.$router.push("/ShopMall");
        },
      });
    },
  },
};
</script>


<style lang="less" scoped>
.home-container {
  height: 200%;
  width: 100%;
  background-color: #eaedf1;
  z-index: -1;
}
//头部样式
.el-header {
  z-index: 1;
  background-color: #2f3235;
  justify-content: space-between; //左右贴边
  padding-left: 0%; //左边界
  color: #fff;
  font-size: 30px;
  display: flex;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
      font-weight: bold;
      width: 200px;
    }
    img {
      width: 42%;
      height: 70%;
    }
  }

  .el-row {
    position: absolute;
  }
}
.establish_box {
  width: 500px;
  height: 550px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  position: absolute;
  z-index: 6;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
}
//导航栏

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #2f3235;
  margin-left: 500px;
  width: 300px;
}

li {
  float: right;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 20px;
}

li a:hover {
  background-color: #111;
}
</style>
