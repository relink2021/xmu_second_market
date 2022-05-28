<template>
    <el-card>
        <el-row style="text-align: left; margin-left: 5%; margin-right: 5%;">
            <el-table :data="requestList" style="width: 100%" class="request">
                <el-table-column prop="avatar" label="头像" width="180">
                    <template slot-scope="props">
                        <el-avatar :src="props.row.avatar" class="avatar"> </el-avatar>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="名字" width="180">
                    <template slot-scope="props">
                        <span>{{ props.row.name }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="验证信息" width="500">
                    <template slot-scope="props">
                        <span>{{ props.row.message }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="验证情况">
                    <template slot-scope="props" width="180">
                        <div v-if="props.row.access == 0">
                            <el-button @click="agree(props.row.name)">同意</el-button>
                            <el-button @click="refuse(props.row.name)">拒绝</el-button>
                        </div>
                        <div v-if="props.row.access == 1">
                            <span style="color: green">已同意</span>
                        </div>
                        <div v-if="props.row.access == -1">
                            <span style="color: red">已拒绝</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </el-card>
</template>

<script>
export default {
    created() {
        this.getAllAccess();
    },
    data() {
        return {
            // 好友请求列表
            requestList: [],
            userInfo: {
                username: "",
                avatar: "",
            },
        }
    },

    methods: {
        // 获取所有好友请求
        async getAllAccess() {
            const { data: res } = await this.$http.post("getAllAccess?username=" + localStorage.getItem("username"));
            console.log(res);
            for (var i in res.accessInfo) {
                this.userInfo.username = res.accessInfo[i].sender;
                const { data: res_ } = await this.$http.post("oneUser", this.userInfo);
                var newAccess = {
                    avatar: res_[0].avatar,
                    name: res.accessInfo[i].sender,
                    message: res.accessInfo[i].message,
                    access: res.accessInfo[i].access,
                }
                this.requestList.push(newAccess);
            }
        },
        // 同意好友请求
        async agree(other) {
            const { data: res } = await this.$http.post("agreeAccess?self=" + localStorage.getItem("username") + "&other=" + other);
            this.$message.success("添加好友成功"); 
            location.reload();
        },
        // 拒绝好友请求
        async refuse(other) {
            const { data: res } = await this.$http.post("refuseAccess?self=" + localStorage.getItem("username") + "&other=" + other);
            location.reload();
        },
    },
}
</script>

<style lang="less" scoped>
.request {
    font-family: 'Genshin';
    font-size: 20px;
}

.avatar {
    width: 80px;
    height: 80px;
}
</style>