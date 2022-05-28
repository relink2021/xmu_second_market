<template>
    <el-card>
        <el-row style="text-align: left; margin-left: 5%; margin-right: 5%;">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="avatar" label="头像" width="180">
                    <template slot-scope="props">
                        <el-avatar src="http://relink-upload.oss-cn-beijing.aliyuncs.com/images/2022/05/27/16536326757382771.jpeg"></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="名字" width="180" />
                <el-table-column prop="message" label="验证信息" />
            </el-table>
        </el-row>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            // 好友请求列表
            requestList: [],
        }
    },
}
</script>

<style lang="less" scoped>
</style>