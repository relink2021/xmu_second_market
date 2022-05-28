<template>
    <el-card>
        <el-row style="text-align: left; margin-left: 5%; margin-right: 5%;">
            <span class="title" style="margin-top: 5px;">{{ this.who }}</span>
            <br /><br />
            <div class="chat_space">
                <el-row v-for="item in messageDetail">
                    <div v-if="item.sender === me">
                        <el-container style="float: right;">
                            <el-aside width="auto" style="float: right;">
                                <el-card class="chat_pane_right">{{ item.message }}</el-card>
                            </el-aside>
                            <el-main class="avatar_space" style="float: right;">
                                <el-avatar class="my_avatar" :src="item.avatar">
                                </el-avatar>
                            </el-main>
                        </el-container>
                        <br /><br />
                    </div>
                    <div v-if="item.sender !== me">
                        <el-container>
                            <el-aside width="auto">
                                <el-avatar class="you_avatar" :src="item.avatar">
                                </el-avatar>
                            </el-aside>
                            <el-main class="avatar_space_left" width="fit-content">
                                <el-card class="chat_pane_left">{{ item.message }}</el-card>
                            </el-main>
                        </el-container>
                        <br /><br />
                    </div>
                </el-row>
            </div>
            <el-input class="textarea" type="textarea" :rows="5" v-model="textarea">
            </el-input>
        </el-row>
        <el-row style="text-align: right; margin-left: 5%; margin-right: 5%; margin-top: 10px;">
            <el-button style="width: 200px;" @click="sendMessage">
                <span style="font-family: Genshin; font-size: 18px;">发送</span>
            </el-button>
        </el-row>
    </el-card>
</template>

<script>
import Stomp from 'stompjs'
import { MQ_SERVICE, MQ_USERNAME, MQ_PASSWORD } from '../util/linkparam'
export default {
    data() {
        return {
            userInfo: {
                username: "",
                avatar: "",
            },
            client: Stomp.client(MQ_SERVICE),
            me: '',
            who: '',
            textarea: '',
            message: '',
            messageBody: {
                sender: '',
                receiver: '',
                message: '',
            },
            messageDetail: []
        }
        
    },
    created() {
        // 交谈者
        this.who = localStorage.getItem("chat_with")
        // 本人
        this.me = localStorage.getItem("username")
        this.userInfo.username = localStorage.getItem("username")
        // 加载聊天记录
        this.loadMessage()
        // 获取用户信息
        // this.getUserInfo();
        // 监听ActiveMQ
        this.connect()
    },
    methods: {
        // 获取用户信息
        async getUserInfo() {
            const { data: res } = await this.$http.post("oneUser", this.userInfo);
            this.userInfo.avatar = res[0].avatar;
        },
        // 发送信息到ActiveMQ
        async sendMessage() {
            this.messageBody.sender = localStorage.getItem('username');
            this.messageBody.receiver = localStorage.getItem('chat_with');
            this.messageBody.message = this.textarea + "\n";
            const { data: res } = await this.$http.post("sendMessage", this.messageBody);
            this.textarea = "";
        },
        // 将消息更新到聊天界面
        async updateMessage(res) {
            if(res.receiver != this.me && res.sender != this.me && res.receiver != "公共聊天室") {
                return;
            }
            this.userInfo.username = res.sender;
            await this.getUserInfo();
            var newMessage = {
                sender: this.userInfo.username,
                avatar: this.userInfo.avatar,
                message: res.message,
            }
            if(res.message != "\n") {
                this.messageDetail.push(newMessage)
            }
        },
        // 加载聊天记录到聊天页面
        async loadMessage() {
            const { data: res } = await this.$http.post("loadMessage?self=" + this.me + "&chatter=" + this.who);
            console.log(res.msgList);
            for(var i in res.msgList) {
                this.userInfo.username = res.msgList[i].sender;
                const { data: res_ } = await this.$http.post("oneUser", this.userInfo);
                var newMessage = {
                    sender: res.msgList[i].sender,
                    avatar: res_[0].avatar,
                    message: res.msgList[i].message,
                }
                this.messageDetail.push(newMessage)
            }
        },
        onConnected: function (frame) {
            var topic = '/topic/all'
            this.client.subscribe(topic, this.responseCallback, this.onFailed)
        },
        onFailed: function (frame) {
        },
        responseCallback: function (frame) {
            var res = eval("(" + frame.body + ")");
            this.updateMessage(res);
        },
        connect: function () {
            var headers = {
                'login': MQ_USERNAME,
                'passcode': MQ_PASSWORD
            }
            this.client.connect(headers, this.onConnected, this.onFailed)
        }
    }
}
</script>

<style lang="less" scoped>
.title {
    font-family: 'Genshin';
    font-size: 30px;
}



.textarea {
    margin-top: 10px;
}

.chat_pane_right {
    font-family: 'Genshin';
    background-color: rgb(31, 172, 31);
    font-size: 18px;
    width: fit-content;
}

.chat_pane_left {
    font-family: 'Genshin';
    background-color: rgb(228, 227, 227);
    font-size: 18px;
    width: fit-content;
}

/deep/.el-main {
    width: 100px;
}

.my_avatar {
    position: relative;
    bottom: 20px;
    width: 70px;
    height: 70px;
}

/deep/.chat_space {
    height: 300px;
    overflow: auto;
}

.avatar_space {
    width: 110px;
    height: auto;
}

.you_avatar {
    width: 70px;
    height: 70px;
    position: relative;
    top: 15px;
}

/deep/ .el-textarea {
    font-size: 18px;
    width: 100%;
}

/deep/ .el-textarea__inner {
    font-family: 'Genshin';
}
</style>