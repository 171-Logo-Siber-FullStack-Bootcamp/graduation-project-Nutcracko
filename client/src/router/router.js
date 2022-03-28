//importing vue router
import { createRouter, createWebHistory } from "vue-router";

//importing page components
import HomePage from "../pages/HomePage.vue";
import StorePage from "../pages/StorePage.vue";
import ContactPage from "../pages/ContactPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import CartPage from "../pages/CartPage.vue";
import DashboardPage from "../pages/DashboardPage.vue";

//defining routes
const routes = [
  { path: "/", component: HomePage },
  { path: "/store", component: StorePage },
  { path: "/contact", component: ContactPage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/cart", component: CartPage },
  { path: "/dashboard", component: DashboardPage },
];

//creating history
const history = createWebHistory();

//creating router
const router = createRouter({
  history: history,
  routes: routes,
});

export default router;
