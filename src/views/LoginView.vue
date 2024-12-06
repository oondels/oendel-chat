<template>
  <div class="login-container">
    <v-text-field v-model="emailUser" label="User/emailUser" variant="outlined" color="success" />
    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      @keyup.enter="login"
      variant="outlined"
      color="success"
    />
    <v-btn :disabled="!emailUser || !password" variant="outlined" color="success" @click="login">Login</v-btn>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import ip from "@/ip";

export default {
  name: "LoginView",
  components: {},

  setup() {
    const router = useRouter();
    const emailUser = ref(null);
    const password = ref(null);

    const login = () => {
      if (!password.value || !emailUser.value) {
        return console.log("All fields are required");
      }

      axios
        .post(`${ip}/user/login`, {
          emailUser: emailUser.value,
          password: password.value,
        })
        .then((response) => {
          console.log(response.data);
          router.push("/chat-geral");
          sessionStorage.setItem("token", response.data);
        })
        .catch((error) => {
          console.error("Error at login: ", error);
        });
    };

    return {
      emailUser,
      password,
      login,
    };
  },
};
</script>

<style></style>
