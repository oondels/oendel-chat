<template>
  <div class="chat-geral-container d-flex flex-column justify-content-center align-items-center">
    <h2 class="text-center">Chat Geral</h2>

    <div class="container-fluid">
      <ul class="message-list p-0 m-0">
        <!-- Colocar bg-light e bg-primary para serem adaptados de acordo com a mesnagem (enviou ou recebeu) -->
        <!-- Mensagem enviada -->
        <li class="message-item sent d-flex flex-column align-items-end mb-3">
          <div class="message-bubble px-3 py-2 bg-light text-dark">
            <span class="message-user d-block fw-bold"> Hendrius: </span>
            <span class="message-text"> Olá Boa Tarde! </span>
            <div class="message-status d-flex align-items-center mt-1">
              <i class="mdi fs-6 me-1 mdi-check text-primary"></i>
              <small class="text-muted">Não Lida</small>
            </div>
          </div>
        </li>

        <!-- Mensagem recebida -->
        <li class="message-item received d-flex flex-column align-items-start mb-3">
          <div class="message-bubble px-3 py-2 bg-primary text-white">
            <span class="message-user d-block fw-bold"> Fefe: </span>
            <span class="message-text"> Olá Boa Tarde! </span>
            <div class="message-status d-flex align-items-center mt-1">
              <i class="mdi fs-6 me-1 mdi-check text-light"></i>
              <small class="text-muted">Não Lida</small>
            </div>
          </div>
        </li>
      </ul>

      <div class="row mx-2">
        <v-text-field v-model="newMessage" density="compact" class="col-sm-9" variant="outlined" label="Label" />
        <v-btn @click="teste" class="col-sm-3" color="primary" prepend-icon="mdi mdi-send">Enviar</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { io } from "socket.io-client";
import { ref } from "vue";
import ip from "../../ip";

export default {
  name: "ChatGeral",
  components: {},
  props: {},

  setup() {
    // const socket = io(ip);

    const newMessage = ref(null);

    const teste = () => {
      newMessage.value = null;
    };
    return { newMessage, teste };
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
