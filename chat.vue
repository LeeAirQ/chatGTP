     <v-btn
            fab
            bottom
            dark
            right
            fixed
            color="blue"
            @click="chat_dialog = true"
          > AI助手
        </v-btn>
        <v-dialog
            v-model="chat_dialog"
            max-width="500"
          >
            <v-card class="chat-window">
              <v-card-title class="d-flex justify-space-between align-center" style="border-bottom: 3px solid lavender;background-color:#12b7f5; color:#202123;">
                  <div>
                    <h2 class="mb-2">Victor-智能助手</h2>
                    <p class="mb-0">量子计算、区块链、web3是什么？</p>
                  </div>
                  <div class="d-flex flex-column justify-center align-center">
                    <p class="mb-0" style="font-size: 14px; color: #4a4a4a;">欢迎使用AI对话</p>
                    <p class="mb-0" style="font-size: 12px; color: #e5dede;">基于最新训练模型</p>
                  </div>
                </v-card-title>
              <v-list class="message-list" style="border-bottom: 5px solid lavender">
                <v-list-item v-for="(message, index) in messages" :key="index">
                  <v-list-item-content>
                    <v-card :class="message.role === 'user' ? 'message-me' : 'message-other'">
                      <v-card-text style="color:white">{{ message.text }}</v-card-text>
                      <div class="message-timestamp">{{ message.timestamp }}</div>
                    </v-card>
                  </v-list-item-content>         
                </v-list-item>
              </v-list>
              <v-card-actions>
                  <v-textarea
                     v-model="inputText"
                     label="请输入你的问题"
                     outlined
                     dense
                     auto-grow
                     :rows="3"                 
                     @keydown.enter="sendMessage"
                   ></v-textarea>   
                   <v-btn color="secondary" @click="clearMessages" style="position: absolute; bottom: -5px; left: 6px; margin: 10px; height: 25px; min-width: 50px;">清除聊天记录</v-btn>   
                   <v-btn color="secondary" @click="sendMessage" style="position: absolute; bottom: 25px; right: 6px; margin: 10px; height: 25px; min-width: 50px;">发送</v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>
        上面是悬浮窗和悬浮按钮
        
  data: function () {
    return {
      chat_dialog: false,
      inputText: "",
      messages: [],
      dialog: false,
    }
  },
  //聊天消息保存到localstorage
  created() {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('chat_messages')) {
      this.messages = JSON.parse(localStorage.getItem('chat_messages'));
    }
  }
},  
methods：{
//实现发送消息和清除历史记录
 async sendMessage() {
      if (this.inputText) {
        const timestamp = new Date().toLocaleString();
        this.messages.push({ role: 'user', text: this.inputText, timestamp });
        // Scroll to the bottom
        this.$nextTick(() => {
          const chatWindow = document.querySelector('.message-list');
          chatWindow.scrollTop = chatWindow.scrollHeight;
        });
        const payload = {
          message: this.inputText,
        }
        this.inputText = "";
        const response = await article.getchat(payload);
        if (response && response.data && response.data.length > 0) {
          const message = response.data[0].message;
          this.messages.push({ role: message.role, text: message.content, timestamp: new Date().toLocaleString() });
        }
        localStorage.setItem("chat_messages", JSON.stringify(this.messages));
        this.$nextTick(() => {
          const chatWindow = document.querySelector('.message-list');
          chatWindow.scrollTop = chatWindow.scrollHeight;
        });

      }
    },
    clearMessages() {
      localStorage.removeItem('chat_messages');
      this.messages = [];
    },
    }
    
    
    <style scoped>
.chat-window {
  max-width: 600px;
  margin: 0 auto;
}

.message-list {
  height: 400px;
  overflow-y: auto;
}
.message-me {
  background-color:#12b7f5;
  border-radius: 10px;
  max-width: 70%;
  margin-left: auto;
  margin-right: 10px;
}

.message-other {
  background-color:#000000;
  border-radius: 10px;
  max-width: 70%;
  margin-left: 10px;
  margin-right: auto;
}
.message-timestamp {
  font-size: 10px;
  color: rgb(230, 223, 223);
  margin-right: 10px;
  float: right;
}
</style>
