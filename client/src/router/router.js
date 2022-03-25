//importing vue router
import { createRouter, createWebHistory } from "vue-router";

//importing page components
import HomePage from "../pages/HomePage.vue";
import StorePage from "../pages/StorePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";

//defining routes
const routes = [
  { path: "/", component: HomePage },
  { path: "/store", component: StorePage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
];

//creating history
const history = createWebHistory();

//creating router
const router = createRouter({
  history: history,
  routes: routes,
});

export default router;
