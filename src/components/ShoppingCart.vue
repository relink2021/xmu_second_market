<template>
<!-- 购物车界面 -->
  <div> 
    <el-table :data="shopCar" 
          ref="multipleTable" 
          @selection-change="handleSelectionChange"
          style="width: 100%"
          stripe  
         >
          <el-table-column type="selection" width="55">
          </el-table-column>

          <el-table-column label="商品详情" >
            <template slot-scope="props">
              <el-row :gutter="20" class="seller">
                卖家：{{ props.row.sellername }}
              </el-row>
              <el-row type="flex"  justify="center" :gutter="20">
                 <el-col :span="6" class="details">
                   <img :src="props.row.item_img" alt />
                 </el-col>
                 <el-col :span="6" class="item_name">
                   {{props.row.item_name}}
                 </el-col>
                 <el-col :span="6">
                   {{ props.row.item_detail }}
                 </el-col>
                 <el-col :span="6" class="kind">
                   {{props.row.fineness}}
                   <br>
                   {{props.row.main_kind}}-{{props.row.sub_kind}}
                 </el-col>

              </el-row>
            </template>
          </el-table-column>
        
          <el-table-column label="单价"  width="200" >
            <template slot-scope="props" >
            <span class="price"> ¥ {{props.row.price}} </span>
            </template>

          </el-table-column>
          <el-table-column label="数量" width="200">
            <template slot-scope="props">
            <el-input-number v-model="props.row.amount" size="small" @change="handleChange" :min="1" :max="100" label="描述文字"></el-input-number>
            </template>
          </el-table-column>

          <el-table-column label="金额" width="200" prop="total">
            <template slot-scope="props">
            <span class="total"> ¥ {{props.row.total}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="200">
                  <template slot-scope="scope">
                    <el-button @click="goodpage(scope.row.item_name)" type="text" size="small">查看商品详情</el-button>
                    <el-button @click="deleteItem(scope.row)" type="text" size="small">移出购物车</el-button>
                  </template>
          </el-table-column>
    </el-table>

    <el-footer>
        <el-col :span="4" :offset="16" class="footer_left">合计：
          <span>¥ {{ num_price }}</span>
        </el-col>
        <button class="footer_right" @click="submmit">结算</button>
    </el-footer>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  created:function() {
    console.log('进入购物车页面!');
    console.log("当前登录用户为："+localStorage.getItem('username'));
    this.getShopCarList();
    this.ItemTotal();
  },
  data() {
    return {
      //用来筛选登录用户的购物车
      checkInfo:{
          cartOwner:"",
          item_name:"",
      },

      //订单信息，结算时存储用
      orderList: [
        {
          sellername: "",
          buyername: "",
          item_name: "",
          fineness: "",
          main_kind: "",
          sub_kind: "",
          price: "",
          amount: "",
          total: "",
          item_img: "",
          item_detail: "",
        },
      ],
      
      //商品数量
      num:1,
      //总记录数
      total_amount: 0,
      num_price: 0,
      //被勾选出的物品
      itemSelected:[
        {
          sellername:"",
          buyername:"",
          item_name:"",
          fineness:"",
          main_kind:"",
          sub_kind:"",
          price:"",
          amount:"",
          total:"",
          item_img:"",
          item_detail:"",
          isbought:""
        }
      ],
      //购物车中的物品
      shopCar:[
        {
          sellername:"",
          buyername:"",
          item_name:"",
          fineness:"",
          main_kind:"",
          sub_kind:"",
          price:"",
          amount:"",
          total:"",
          item_img:"",
          item_detail:"",
          isbought:""
        }
      ],
      //多选框
      multipleSelection: []
    };
  },
  methods: {
    //提交
    submmit(){    
      // 以下是跳转到支付宝支付界面，最后应该把this.addOrder()放在下面，即支付成功后再进行三个表的增删改操作
      if (this.num_price != 0) {
        axios
          .post(
            // 设置自己的主机名加端口号
            "http://localhost:9000/Submit?outTradeNo=" +
              Math.random() * 20210726131 +
              // this.payInfo.outTradeNo +
              "&subject=" +
              "笔记本" +
              // this.payInfo.subject +
              "&totalAmount=" +
              this.num_price +
              "&description=" +
              "笔记本"
            // this.payInfo.description
          )
          .then((resp) => {
            console.log(resp);
            // 添加之前先删除一下，如果单页面，页面不刷新，添加进去的内容会一直保留在页面中，二次调用form表单会出错
            const divForm = document.getElementsByTagName("div");
            if (divForm.length) {
              document.body.removeChild(divForm[0]);
            }
            const div = document.createElement("div");
            div.innerHTML = resp.data; // data就是接口返回的form 表单字符串
            document.body.appendChild(div);
            document.forms[0].setAttribute("target", "_blank"); // 新开窗口跳转
            document.forms[0].submit();
          });
        
      } else {
        this.$message.error("请勾选商品以结算"); // 错误提示
      }
      // this.addOrder();
    },
    //商品加入订单
     async addOrder(){
      this.orderList=this.itemSelected;
      
      const { data: res1 } = await this.$http.post("deleteItem", this.orderList);
      if (res1=="error") this.$message.error("库存不足！");
      else 
      {
        const { data: res } = await this.$http.post("addOrder", this.orderList);
        this.$message.success("结算成功！");
      }
      
     },
    //所有物品金额合计
    Totalprice() {
      let price = 0;
      this.itemSelected.forEach((item, index) => {
        price += item.amount * item.price ;//有一个判断是否打钩的状态0或1
      });
      this.num_price = price.toFixed(2);
    },
    //单个物品金额
    ItemTotal(){
      this.shopCar.forEach((item) => {
        let total_price = item.price * item.amount;
        console.log(total_price);
        item.total = total_price.toFixed(2);
      });
      
    },

    // 获取物品信息
    async getShopCarList() 
    {
      //以下三行代码，变量命名均无意义不用管
      this.checkInfo.item_name=localStorage.getItem('username');
      console.log("获取物品信息的测试：checkinfo.item_name的值为：" + this.checkInfo.item_name);
      const { data: res } = await this.$http.post("allShopCar",this.checkInfo);
      this.shopCar = res.data;
      this.total_amount = res.numbers;//注意这里有个s！
      this.ItemTotal();//计算total
      

    },
  

    //选中多选框触发事件
      handleSelectionChange(val) 
      {
        console.log("val=");
        console.log(val);
        this.itemSelected=val;
        //计算被选中的物品总金额
        this.Totalprice();
      },

    //点击计数器触发事件
      handleChange(value) 
      {
        //计算被选中的物品总金额
        this.Totalprice();
        console.log(value);
        //计算某项商品的total值
        this.ItemTotal();
      },


      //操作按钮：
      // 查看商品详情
      goodpage(item_name) {
      localStorage.setItem('item_name',item_name);
      this.$router.push("/GoodPagePlus");
      },

      // 移出购物车
      async deleteItem(shopcar) {
      const confirmResult = await this.$confirm(
        "确定要将该商品移出购物车？",
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
      const { data: res } = await this.$http.post(
        "deleteShopCar",shopcar
      );
      if (res == "success") {
        this.$message.success("删除成功"); // 信息提示
        this.getShopCarList();
      } else {
        this.$message.error("删除失败"); // 错误提示
      }
    },

    mounted() 
    {
      this.Totalprice(),
      this.ItemTotal(),
      this.$refs.dataTable.toggleAllSelection()
    }
  }
}
</script>

<style  lang="less" scoped>
.body {
  height: 200%;
  width: 100%;
}

//商品信息样式
.seller{
  margin:5px;
  font-size: 10px;
}
.details img {
  width: 100px;
  height: 90px;
  border-radius: 5px;
}
.item_name{
  font-size:18px;
  font-weight: bold;
}
.kind{
  color:goldenrod;
  font-size:15px;
  text-align: center;
}
.price{
  font-size: 20px;
}
.total{
  font-size: 20px;
  color:red;
}

//页脚
el-footer{
  position:fixed;
}

.footer_left {
  text-align: right;
  font-size: 20px;
  font-weight: bold;
  padding-top: 1%;
  padding-right: 2%;
}
.footer_left span {
  color: red;
}

.footer_right {
  background: red;
  color: white;
  width: 10%;
  height: 100%;
  font-size: 20px;
  font-weight: bold;
  padding-top: 1%;
  float:right;
}
</style>>
