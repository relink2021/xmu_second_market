<template>
  <div>
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/logo-mini.png" alt />
        <span>修改或删除已发布的商品</span>
      </div>
      <!-- 搜索块 -->
      <input class="search" placeholder="搜索你想要的二手商品" />
      <!-- 用户头像 -->
      <div class="user">
        <i class="el-icon-user-solid" />
        <el-button round @click="login">登录/注册</el-button>
      </div>
    </el-header>

    <!-- 导航栏 -->
    <ul>
      <li><a class="active" @click="home">首页</a></li>
      <li><a @click="shopmall">二手商城</a></li>
      <li><a @click="establish">我要发布</a></li>
    </ul>

    <!--中间内容区域-->
    <div class="container">
      <div class="item" v-for="(item, index) in releaseList" :key="index">
        <!--详细内容区域-->
        <div class="details">
          <img :src="item.item_img" />
          <div class="details_list">
            <span>{{ item.item_name }}</span>
            <div class="list_more">
              <span>{{ item.main_kind }}</span>
              <span>{{ item.sub_kind }}</span>
            </div>
            <div class="list_price">￥{{ item.price }}</div>
          </div>
        </div>

        <!--购买数量区域-->
        <div class="num">
          <span>操作</span>
          <div>
            <button @click="editItemDialog(item.item_name)">修改</button>
            <button @click="deleteGoods(item.item_name)">删除</button>
          </div>
        </div>
      </div>
      <!-- 分页区域 -->
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNum"
          :page-sizes="[5, 10]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
      <!-- 修改对话框 -->
      <el-dialog
        title="修改商品信息"
        style="align-content: left"
        :visible.sync="editDialogVisible"
        width="50%"
      >
        <!-- 内容主体区域 -->
        <el-form :model="editForm" label-width="70px">
          <el-form-item label="商品名" prop="item_name">
            <el-input v-model="editForm.item_name"></el-input>
          </el-form-item>
          <el-form-item label="成色" prop="fineness">
            <el-cascader
              v-model="values1"
              :options="options1"
              @change="handleChange1"
              clearable
            ></el-cascader>
          </el-form-item>
          <el-form-item label="分类" prop="kind">
            <el-cascader
              v-model="values2"
              :options="options2"
              @change="handleChange2"
              clearable
            ></el-cascader>
          </el-form-item>
          <!-- 分类 -->
          <el-form-item label="单价" prop="price">
            <el-input v-model="editForm.price"></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="amount">
            <el-input v-model="editForm.amount"></el-input>
          </el-form-item>
          <el-form-item label="详情" prop="comment">
            <el-input v-model="editForm.comment"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="contact">
            <el-input v-model="editForm.contact"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="eidtDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editItemInfo">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getReleaseList();
  },
  data() {
    return {
      num_price: 0,
      releaseList: [],
      queryInfo: {
        query: "",
        pageNum: 1,
        pageSize: 100,
      },
      total: 0,
      editForm: {},
      editDialogVisible: false,
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
            ]
        },
      ],
    };
  },
  methods: {
    // 显示发布商品列表
    async getReleaseList() {
      const { data: res } = await this.$http.get("allItem", {
        params: this.queryInfo,
      });
      this.releaseList = res.data;
      this.total = res.number;
      this.releaseList = this.releaseList.filter(
        (item) => item.username == localStorage.getItem('username')
      );
      this.total = this.releaseList.length;
    },
    // 显示对话框
    async editItemDialog(item_name) {
      const { data: res } = await this.$http.get(
        "getEdit?item_name=" + item_name
      );
      this.editForm = res; // 回填信息
      this.values1[0] = this.editForm.fineness;
      this.values2[0] = this.editForm.main_kind;
      this.values2[1] = this.editForm.sub_kind;
      this.editDialogVisible = true; // 打开对话框
    },
    handleChange1(){    
        this.editForm.fineness = this.values1[0];
    },
    handleChange2(){
        this.editForm.main_kind = this.values2[0];
        this.editForm.sub_kind = this.values2[1];
    },
    async editItemInfo(){
        const {data:res} = await this.$http.put("editGoods",this.editForm);
        if(res!="success") return this.$message.error("更新信息失败");
        this.$message.success("更新信息成功");
        // 隐藏
        this.editDialogVisible = false;
        this.getReleaseList();
    },
    // 删除商品
    async deleteGoods(item_name) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除发布的商品,是否继续",
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
        "deleteGoods?item_name=" + item_name
      );
      if (res == "success") {
        this.$message.success("删除成功"); // 信息提示
        this.getReleaseList();
      } else {
        this.$message.error("删除失败"); // 错误提示
      }
    },
    home() {
      this.$router.push("/PersonalCenter");
    },
    shopmall() {
      this.$router.push("/ShopMall");
    },
    establish() {
      this.$router.push("/Establish");
    },
    login() {
      this.$router.push("/Login");
    },
    // 单页最大用户数量
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getReleaseList();
    },
    // pageNum的触发动作
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getReleaseList();
    },
  },
};
</script>

<style  lang="less" scoped>
.body {
  height: 200%;
  width: 100%;
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
    }
  }

  .search {
    width: 20%;
    height: 60%;
    position: relative;
    top: 20%;
    right: 10%;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    background-color: rgb(255, 255, 255);
    background-image: url("https://static.runoob.com/images/mix/searchicon.png");
    background-position: 10px 10px;
    background-repeat: no-repeat;
    padding: 12px 20px 12px 40px;
    -webkit-transition: width 0.4s ease-in-out;
    transition: width 0.4s ease-in-out;
  }

  img {
    height: 65%;
  }
}

.pagination {
  padding: 10px;
}

.el-row {
  position: absolute;
}
.container {
  background: #fff;
  margin-left: 100px;
  margin-right: 100px;
}
.item {
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
}
.logo {
  height: 40px;
  /* 左右浮动布局 */
  display: flex;
  /* 以交叉轴的中点对齐 */
  align-items: center;
}
.logo img {
  width: 20px;
  height: 20px;
  margin-left: 5px;
}
.logo span {
  margin-left: 5px;
  font-size: 12px;
}
.details {
  background: #f5f5f5;
  padding: 15px;
  font-size: 12px;
  display: flex;
}
.details img {
  width: 100px;
  height: 90px;
}
.details_list {
  margin-left: 15px;
  color: black;
}
.list_more span {
  color: #888;
}
.details_list span {
  display: block;
  margin-top: 3px;
}
.list_price {
  color: red;
  font-size: 16px;
}

.num {
  color: #888;
  padding: 10px;
  /* 弹性布局 */
  display: flex;
  /* 左右排列 以两侧对齐 */
  justify-content: space-between;
}

.num button {
  width: 50px;
  height: 25px;
  background: #caf4ff;
  //border: none;
  //outline: none;
}
.num input {
  width: 37px;
  height: 25px;
  border: none;
  text-align: center;
  background: #fff;
}

//导航栏
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #111;
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
}

li a:hover {
  background-color: #111;
}
</style>
