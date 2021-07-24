<template>
<!-- 登录界面 -->
<div class="login_container">
        <div class="avatar_box">
            <!-- 页头 -->
            <img src="../assets/xmuPhoto.jpg" alt/>
         </div>
        <!-- <div class="xmu_badge">
            <img src="../assets/xmuBadge.jpg" alt/>
        </div> -->
        

    <div class="login_box">
        <!--从此处开始为表单区域 -->
        <div class="title"> 厦门大学二手交易平台</div>
        <el-form ref="loginFormRef" :model="loginForm" class="login_form" label-width="0">
        <!-- 用户名 -->
         <el-form-item label>
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-administratorsearch" placeholder="请输入账号"></el-input>
         </el-form-item>
         <!-- 密码 -->
        <el-form-item label>
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-password" type="password" placeholder="请输入密码"></el-input>
         </el-form-item>
         <!-- 按钮 -->
         <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="registerBtn">注册</el-button>
        </el-form-item>
        </el-form>
    </div>
</div>

</template>
<script>
export default {
    data(){
        return{
            loginForm:{
                username:"",
                password:""
            }
        }
    },
    methods:
    {
        registerBtn(){
           this.$router.push("Register");
        },
        login(){
        this.$refs.loginFormRef.validate(async valid=>
        {
            //完成验证是否成功
            if(!valid) return;
            const{data:res}=await this.$http.post("Login",this.loginForm);   //访问后台
            if(res.flag=="ok") {
                this.$message.success("登录成功");
                localStorage.setItem('username',this.loginForm.username)
                console.log(res);
                if(res.user.role == "普通用户"){
                    this.$router.push({path:"/ShopMall"});  //主页
                }
                else{
                    this.$router.push({path:"/HomePage"}); //管理员界面
                }
            }else{
                this.$message.error("登录失败");
            }
        })
        },
        
    },
}
</script>
<style lang="less" scoped>
.login_container{
    background-color:#ffffff ;
    height: 100%;
}

.login_box{
    width: 450px;
    height: 290px;
    background-color: rgba(255, 255, 255, 0.8);
    position:absolute ;
    z-index: 6;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    opacity: 1;
    border-radius: 20px;
    }
    .avatar_box{
        width: 100%;
        height:100%;
        border:1px solid rgb(245, 235, 235) ;
        box-shadow:0 0 10px #ddd;
        position:absolute ;
        background: #eee;
        z-index:5 ;
        img{
            width:100%;
            height: 100%;
            background-color: #eee;
        }
    }
    //     .xmu_badge{
    //     width:100px;
    //     height:100px;
    //     position: absolute;
    //     left:46%;
    //     top:10%;
    //     border:1px solid #eee ;
    //     background: #eee;
    //     z-index: 7;
    //     image{
    //         width: 100%;
    //         height:100%;
    //         background-color: #eee;
    //     }
    // }


    .btns{
        display: flex;
        justify-content: flex-end;

    }
    .login_form{
        position:absolute ;
        bottom: 0%;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
    .title{
        font-family:"微软雅黑" ;
        font-size: 35px;
        padding: 25px;
    }
</style>