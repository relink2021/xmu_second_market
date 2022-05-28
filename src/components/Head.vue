<template>
    <!-- 软件主页 -->
    <el-container class="top_navigation_bar">
        <!-- 顶部导航栏 -->
        <el-header>
            <!-- Logo -->
            <img src="../assets/logo.png" alt />
            <!-- 搜索栏 -->
            <div class="search">
                <!-- 搜索框 -->
                <el-input placeholder="Search Friend ..." v-model="query">
                    <!-- 搜索栏 -->
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <!-- 标题 -->
            <div class="title">
                <span>TestChat</span>
            </div>
            <!-- 查看是否有新的好友验证 -->
            <el-button class="new_friend" @click="manage"> New Friend </el-button>
            <!-- 用户菜单 -->
            <div class="user">
                <!-- 用户头像 -->
                <el-avatar :src="userInfo.avatar">
                </el-avatar>
                <!-- 下拉菜单 -->
                <el-dropdown trigger="click">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                    <!-- 菜单选项 -->
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="setting">个人信息</el-dropdown-item>
                        <el-dropdown-item @click.native="login">切换账号</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-container class="bottom">
            <!-- 侧边栏 -->
            <el-aside class="aside" width="200px">
                <el-card>
                    <!-- 好友列表 -->
                    <!-- @node-click="handleNodeClick" -->
                    <el-tree node-key="label" class="friend_tree" :data="friend" @node-click="clickNode">
                    </el-tree>
                </el-card>
            </el-aside>
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        <!-- 内容主题，由打开的页面决定 -->
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            query: "",
            userInfo: {
                username: "",
                avatar: "",
            },
            friend: [{
                label: '好友',
                children: [
                ],
            },
            {
                label: '群组',
                children: [{
                    label: '公共聊天室',
                }]
            }]
        }
    },
    created() {
        this.userInfo.username = localStorage.getItem("username")
        this.getUserInfo();
        this.getAllRelation();
    },
    methods: {
        // 获取用户头像
        async getUserInfo() {
            const { data: res } = await this.$http.post("oneUser", this.userInfo);
            this.userInfo.avatar = res[0].avatar;
            localStorage.setItem("avatar" + this.userInfo.username, res[0].avatar)
        },
        async getAllRelation() {
            const { data: res } = await this.$http.post("getRelation?username=" + this.userInfo.username)
            for (var i in res.friends) {
                var newLabel = {
                    label: res.friends[i]
                };
                this.friend[0].children.push(newLabel);
            }
        },
        // 切换账号，跳转到登录页面
        login() {
            window.sessionStorage.clear();
            this.$router.push("/LoginI");
        },
        // 跳转到个人信息设置
        setting() {
            this.$router.push("/PersonalData");
        },
        // 跳转到好友管理
        manage() {
            this.$router.push("/FriendAccess");
        },
        // 跳转到聊天室
        clickNode(data, node, obj) {
            if (node.label === "好友" || node.label === "群组") {
                return;
            } else {
                localStorage.setItem("chat_with", node.label);
                this.$router.push("/ChatRoom")
                location.reload();
            }
        },
    }
}
</script>

<style lang="less" scoped>
.el-header {
    z-index: 1;
    background-color: #000;
    justify-content: space-between; //左右贴边
    padding-left: 0%; //左边界
    color: #fff;
    font-size: 30px;
    display: flex;

    .title {
        position: relative;
        left: 160px;
        font-weight: bold;
        font-family: 'Genshin';
        padding-top: 12px;
        padding-right: 550px;
    }

    .new_friend {
        position: relative;
        border-color: #000;
        right: 200px;
        font-weight: bold;
        background-color: #000;
        color: #fff;
        font-family: 'Genshin';
        font-size: 20px;
        padding-top: 12px;
    }

    img {
        height: 60px;
        width: 60px;
    }

    .search {
        /deep/.el-input__inner::placeholder {
            font-family: 'Genshin';
        }

        /deep/.el-input__inner {
            font-family: 'Genshin';
            background-color: #000;
            color: #fff;
        }

        /deep/.el-input {
            padding-top: 10px;
            width: 400px;
        }
    }

    .user {
        padding-top: 8px;

        /deep/.el-icon-arrow-down {
            color: #fff;
            font-weight: bold;
        }
    }
}

.aside {
    background-color: #fff;
    width: 50%;
    height: auto;

    .friend_tree {
        background-color: #fff;
        color: #000;
    }

    /deep/.el-tree-node__label {
        font-size: 18px;
        font-family: 'Genshin';
    }
}

.el-main {
    background-color: #eaedf1;
    //position:absolute;
    width: 100%;
    height: auto;
}

.el-card {
    padding: 3px;
    height: auto;
}

.top_navigation_bar {
    height: 150%;
    width: 100%;
    background-color: #eaedf1;
}
</style>