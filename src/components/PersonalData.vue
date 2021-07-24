<template>
  <!-- 引入布局 -->
  <el-container class="PCp-container">
    <!-- 头部 -->
    <el-header style="width: auto; height: auto">
      <!-- 标题图标文字 -->
      <div>
        <img
          style="width: auto; height: 30px"
          src="../assets/logo-mini.png"
          alt
        />
      </div>
      <span
        style="
          width: 250px;
          text-align: center;
          display: block;
          color: #fff;
          font-size: 35px;
          font-weight: bold;
        "
        >个人中心</span
      >
      <!-- 页面菜单栏 -->
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#003c88"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1"
          ><a
            href="https://www.xmu.edu.cn"
            target="_blank"
            style="font-size: 20px"
            ><span style="font-size: 20px">首页</span></a
          ></el-menu-item
        >
        <el-submenu index="2">
          <template slot="title"
            ><span style="font-size: 20px">账户设置</span></template
          >
          <el-submenu index="2-1">
            <template slot="title">安全设置</template>
            <el-menu-item index="2-1-1"
              ><router-link
                to="edit"
                @click.native="flushCom"
                style="font-size: 15px; color: #fff"
                >修改密码
              </router-link></el-menu-item
            >
            <el-menu-item index="2-1-2">
              <router-link
                to="edit"
                @click.native="flushCom"
                style="font-size: 15px; color: #fff"
                >手机绑定
              </router-link></el-menu-item
            >
            <el-menu-item index="2-1-3"
              ><router-link
                to="edit"
                @click.native="flushCom"
                style="font-size: 15px; color: #fff"
                >邮箱绑定
              </router-link></el-menu-item
            >
          </el-submenu>
          <el-submenu index="2-2">
            <template slot="title">个人资料</template>
            <el-menu-item index="2-2-1"
              ><router-link
                to="user"
                @click.native="flushCom"
                style="font-size: 15px; color: #fff"
                >收货地址
              </router-link></el-menu-item
            >
            <el-menu-item index="2-2-2"
              ><router-link
                to="user"
                @click.native="flushCom"
                style="font-size: 15px; color: #fff"
                >修改头像、昵称
              </router-link></el-menu-item
            >
          </el-submenu>
          <el-submenu index="2-3">
            <template slot="title">账号绑定</template>
            <el-menu-item index="2-3-1">支付宝绑定</el-menu-item>
            <el-menu-item index="2-3-2">微博绑定</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3"
          ><a href="https://www.baidu.cn" target="_blank"
            ><span style="font-size: 20px">订单管理</span></a
          ></el-menu-item
        >
      </el-menu>
      <!-- 搜索栏 -->
      <div style="margin-top: -5px; margin-left: 400px" align="right">
        <el-input>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="120px">
        <h5 style="font-size: 20px; text-align: center; color: #fff">
          账号管理
        </h5>
        <!-- 侧边栏颜色 -->
        <el-menu
          background-color="#006e9f"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">
            <span slot="title" style="font-size: 15px">个人资料</span>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link
              to="edit"
              @click.native="flushCom"
              style="font-size: 15px; color: #fff"
              >安全设置
            </router-link>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主体内容 -->
      <el-main>
        <el-card>
          <el-row style="text-align: begin; margin-left: 0%">
            <span style="font-size: 20px">
              头像：
              <el-button circle style="margin-left: 25px"
                ><img src="../assets/logo.png" alt />
              </el-button> </span
            ><br /><br />
            <div style="font-size: 20px">
              用户名：<el-input
                :rows="1"
                style="width: 400px"
                v-model="modifyForm.username"
                :disabled="true"
              ></el-input>
            </div>
            <br />
            <div style="font-size: 20px">
              真实姓名：<el-input
                :rows="1"
                style="width: 400px"
                v-model="modifyForm.real_name"
                placeholder="请输入真实姓名"
              ></el-input>
            </div>
            <br />
            <div style="font-size: 20px">
              性别：<template>
                <el-radio v-model="modifyForm.sex" label="男" style="font-size: 20px"
                  >男</el-radio
                >
                <el-radio v-model="modifyForm.sex" label="女" style="font-size: 20px"
                  >女</el-radio
                >
              </template>
            </div>
            <br />
            <div class="block" style="font-size: 20px">
              居住地：
              <el-cascader
                :options="options"
                :props="{ checkStrictly: true }"
                clearable
              ></el-cascader>
            </div>
            <br />
            <div class="block" style="font-size: 20px">
              家乡：
              <el-cascader
                :options="options"
                :props="{ checkStrictly: true }"
                clearable
              ></el-cascader>
            </div>
            <br />
            <div style="font-size: 20px">
              收货地址：<el-input
                :rows="1"
                style="width: 400px"
                v-model="modifyForm.address"
                placeholder="请输入收货地址"
              ></el-input>
            </div>
            <br />
            <div style="font-size: 20px">
              电话：<el-input
                :rows="1"
                style="width: 400px"
                v-model="modifyForm.phone"
                placeholder="请输入电话号码"
              ></el-input>
            </div>
            <br />
            <div style="font-size: 20px">
              邮箱：<el-input
                :rows="1"
                style="width: 400px"
                v-model="modifyForm.email"
                placeholder="请输入邮箱"
              ></el-input>
            </div>
            <br />
            <el-button style="margin-left: 200px" @click="updateMessage"> 保存 </el-button>
          </el-row>
        </el-card></el-main
      ></el-container
    ></el-container
  >
</template>

<script>
export default {
  created(){
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
    async updateMessage(){
        // 访问数据库
        const {data:res} = await this.$http.post("updateMessage",this.modifyForm);
        if (res == "success") {
          this.$message.success("信息修改成功"); // 信息提示
        } else {
          this.$message.error("信息修改失败"); // 错误提示
        }
    },
    // 显示用户已经填写的信息
    async showMessage(){
        // 访问数据库
        this.modifyForm.username = localStorage.getItem('username');
        const {data:res} = await this.$http.post("showMessage",this.modifyForm);
        // 填充数据
        this.modifyForm = res;
        console.log(this.modifyForm)
    },
  },
};
</script>

<style class='less' scoped>
/* 根节点样式 */
.PCp-container {
  background-color: rgb(0, 60, 136);
  height: 100%;
}
/* 头样式 */
.el-header {
  background-color: #003c88;
  display: flex;
  font-size: 40px;
}
/* 侧边栏样式 */
.el-aside {
  background-color: rgb(0, 60, 136);
  width: auto;
}
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