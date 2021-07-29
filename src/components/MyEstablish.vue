<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/ShopMall' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 提示区域 -->
      <el-alert
        title="添加商品信息"
        type="info"
        center
        show-icon
        :closable="false"
      >
      </el-alert>
      <!-- 步骤条区域 -->
      <el-steps
        :space="500"
        :active="activeIndex - 0"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品种类"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品详情"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- tab栏区域 -->
      <el-form
        :model="releaseForm"
        :rules="releaseFormRules"
        ref="releaseFormRef"
        label-width="50px"
        label-position="top"
        class="demo-ruleForm"
        align
      >
        <el-tabs v-model="activeIndex" :tab-position="'left'">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="item_name">
              <el-input v-model="releaseForm.item_name" size="small"></el-input>
            </el-form-item>
            <el-form-item label="单价" prop="price">
              <el-input
                v-model="releaseForm.price"
                size="small"
                type="number"
              ></el-input>
            </el-form-item>
            <el-form-item label="数量" prop="amount">
              <el-input
                v-model="releaseForm.amount"
                size="small"
                type="number"
              ></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品种类" name="1">
            <el-row>
              <el-col :span="8" style="margin-left: 200px; margin-top: 25px">
                <el-form-item label="成色" prop="fineness">
                  <el-cascader
                    v-model="values1"
                    :options="options1"
                    @change="handleChange1"
                    clearable
                    size="small"
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="margin-top: 25px">
                <el-form-item label="分类" prop="kind">
                  <el-cascader
                    v-model="values2"
                    :options="options2"
                    @change="handleChange2"
                    clearable
                    size="small"
                  ></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="2">
            <!-- action:图片上传的API地址 
                   handlePreview: 预览图
              -->
            <!-- "http://localhost:9000/upload" -->
            <el-upload
              drag
              action="http://localhost:9000/file/upload"
              :on-change="saveImgURL"
              :limit="1"
              accept=".jpg, .jpeg, .png"
              list-type="picture"
            >
              <i class="el-icon-upload"></i>
              <!-- <el-button size="small" type="primary">点击上传</el-button> -->
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品详情" name="3">
            <el-form-item label="详情" prop="item_detail" size="small">
              <el-input v-model="releaseForm.item_detail"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="contact" size="small">
              <el-input v-model="releaseForm.contact"></el-input>
            </el-form-item>
            <el-button type="primary" @click="release">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.imgFlag = false;
  },
  data() {
    return {
      activeIndex: "0",
      // 添加商品的表单数据对象
      releaseForm: {
        username: "",
        item_name: "",
        fineness: "",
        main_kind: "",
        sub_kind: "",
        price: "",
        amount: "",
        item_detail: "",
        contact: "",
        item_img: "",
      },
      // 添加表单的校验规则
      releaseFormRules: {
        item_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        fineness: [{ required: true, message: "请选择成色", trigger: "blur" }],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        amount: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
        ],
        contact: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
        ],
      },
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
              value: "器材",
              label: "器材",
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
    // 成色选择器改变
    handleChange1() {
      this.releaseForm.fineness = this.values1[0];
    },
    // 分类选择器改变
    handleChange2() {
      this.releaseForm.main_kind = this.values2[0];
      this.releaseForm.sub_kind = this.values2[1];
    },
    // 处理移除图片的操作
    handleRemove() {},
    // 发布商品
    async release() {
      this.$refs.releaseFormRef.validate(async (valid) => {
        if (!valid) return; // 验证失败
        if (!this.imgFlag) return;
        this.releaseForm.username = localStorage.getItem("username");
        const { data: res } = await this.$http.post(
          "releaseItem",
          this.releaseForm
        ); // 访问后台
        if (res == "success") {
          this.$message.success("发布商品成功"); // 信息提示
          this.$router.push("/ShopMall");
        } else {
          this.$message.error("发布商品失败"); // 错误提示
        }
      });
    },
    saveImgURL(file) {
      this.releaseForm.item_img = file.response;
      this.imgFlag = true;
    },
  },
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 17px;
}
.el-steps {
  margin: 15px;
  text-align: left;
}
.el-steps__title {
  font-size: 13px;
}
.el-form-item__label {
  line-height: 20px;
}
.el-form-item {
  text-align: justify;
  padding-right: 130px;
  padding-left: 10px;
  height: 80px;
  font-size: 14px;
}
.el-input {
  font-size: 14px;
}
.upload-demo {
  margin-right: 100px;
}
</style>