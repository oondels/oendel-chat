import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ChatGeral from "@/views/ChatGeral.vue";
import LoginView from "@/views/LoginView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/chat-geral",
    name: "chat",
    component: ChatGeral,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
