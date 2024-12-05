import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark", // Certifique-se de usar "dark" ou "light" corretamente
    themes: {
      light: {
        colors: {
          primary: "#1976D2",
          secondary: "#424242",
          background: "#FFFFFF", // Cor de fundo clara
          surface: "#FFFFFF", // Superfícies de componentes claros
        },
      },
      dark: {
        colors: {
          primary: "#90CAF9",
          secondary: "#424242",
          background: "#121212", // Cor de fundo escura
          surface: "#1E1E1E", // Superfícies de componentes escuros
        },
      },
    },
  },
});

const appInstance = createApp(App);

appInstance.use(router);
appInstance.use(vuetify);
appInstance.mount("#app");
