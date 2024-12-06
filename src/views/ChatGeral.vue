<template>
  <div class="chat-geral-container d-flex flex-column justify-content-center align-items-center">
    <h2 class="text-center">Chat Geral</h2>

    <div class="container-fluid">
      <ul class="message-list p-0 m-0">
        <li
          v-for="message in oldMessages"
          :key="message.id"
          :class="message.user.id === userOn ? 'sent align-items-end' : 'received align-items-start'"
          class="message-item d-flex flex-column mb-3"
        >
          <div
            :class="message.user.id === userOn ? 'bg-light text-dark' : 'bg-primary text-white'"
            class="message-bubble px-3 py-2"
          >
            <span class="message-user d-block fw-bold"> {{ message.user.username }} </span>
            <span class="message-text"> {{ message.message }} </span>
          </div>
        </li>
      </ul>

      <div class="row mx-2">
        <v-text-field v-model="newMessage" density="compact" class="col-sm-9" variant="outlined" label="Label" />
        <v-btn @click="sendMessage" class="col-sm-3" color="primary" prepend-icon="mdi mdi-send">Enviar</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { io } from "socket.io-client";
import { ref } from "vue";
import ip from "@/ip";
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "ChatGeral",
  components: {},
  props: {},

  setup() {
    const socket = io(ip);

    // SImulação de id de user on
    // Pegar dados do user no token
    const userOn = ref(1);

    // Old Messages
    const oldMessages = ref([]);
    socket.emit("old-messages");
    socket.on("old-messages", (messages) => {
      oldMessages.value = messages;
    });

    // Send Messages
    const newMessage = ref(null);
    const sendMessage = () => {
      if (newMessage.value) {
        let data = {
          user: 1,
          message: newMessage.value,
        };

        socket.emit("send-message", data);
      }
    };
    socket.on("new-message", (message) => {
      socket.emit("old-messages");
    });

    return {
      newMessage,
      sendMessage,
      userOn,
      oldMessages,
    };
  },
};
</script>

<style scoped>
.container-fluid {
  background-color: #2d2d2d;
  border-radius: 20px;
  max-width: 500px;
}

.message-list {
  padding: 20px !important;
  list-style: none;
  overflow-y: auto;
  max-height: 400px;
}

.message-bubble {
  min-width: 130px;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
}

.sent .message-bubble {
  border-top-right-radius: 0px;
}
.received .message-bubble {
  border-top-left-radius: 0px;
}

.message-text {
  font-size: 0.9rem;
  line-height: 1.5;
  word-wrap: break-word;
}

.message-status {
  font-size: 0.8rem;
  display: flex;
  align-items: center;
}
</style>
