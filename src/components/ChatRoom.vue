<template>
    <el-card>
        <el-row style="text-align: left; margin-left: 5%; margin-right: 5%">
            <span class="title" style="margin-top: 5px;">{{ this.who }}</span>
            <el-input class="textarea" type="textarea" readonly :rows="10" v-model="message"></el-input>
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
            client: Stomp.client(MQ_SERVICE),
            who: '',
            textarea: '',
            message: '',
            messageBody: {
                sender: '',
                receiver: '',
                message: '',
            }
        }
    },
    created() {
        this.who = localStorage.getItem("chat_with")
        this.connect()
    },
    methods: {
        async sendMessage() {
            this.messageBody.sender = localStorage.getItem('username');
            this.messageBody.receiver = localStorage.getItem('chat_with');
            this.messageBody.message = this.textarea + "\n";
            const { data: res } = await this.$http.post("sendMessage", this.messageBody);
            this.message += this.textarea + "\n";
            this.textarea = "";
        },
        onConnected: function (frame) {
            var topic = '/topic/all'
            this.client.subscribe(topic, this.responseCallback, this.onFailed)
        },
        onFailed: function (frame) {
        },
        responseCallback: function (frame) {
            console.log(new Date(jumpParams.createDate.time).Format("yyyy-MM-dd hh:mm:ss"))
            this.message += frame.body
            // console.log(frame.body)
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

/deep/ .el-textarea {
    font-size: 18px;
    width: 100%;
}

/deep/ .el-textarea__inner {
    font-family: 'Genshin';
}
</style>