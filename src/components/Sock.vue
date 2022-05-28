<template>
    <div></div>
</template>
<script>
import Stomp from 'stompjs'
import { MQ_SERVICE, MQ_USERNAME, MQ_PASSWORD } from '../util/linkparam'
export default {
  name: 'entry',
  data () {
    return {
      client: Stomp.client(MQ_SERVICE),
      topic : '/topic/iqc_check_list'
    }
  },
  created () {
    this.connect()
  },

  methods: {
    onConnected: function (frame) {
      console.log('Connected: ---------' + frame.body)
      // 主题模式
      this.client.subscribe(this.topic, this.responseCallback, { id: 20210820 })
    },
    onFailed: function (frame) {

    },
    responseCallback: function (frame) {
      if(frame.body != null){
        this.$notify.info({
          showClose: true,
          message: '有新的检验单  ' + frame.body,
          position: 'bottom-right',
          duration: '3000',
          onClose: () => {
            // 执行查询方法
            this.$parent.query()
          },
        });
      }
    },

    connect: function () {
      let headers = {
        'login': MQ_USERNAME,
        'passcode': MQ_PASSWORD
      }
      // 心跳发送频率
      this.client.heartbeat.outgoing = 50000;
      // 心跳接收频率
      this.client.heartbeat.incoming = 50000;
      this.client.connect(headers, this.onConnected, this.onFailed)
    }
  }
}
</script>