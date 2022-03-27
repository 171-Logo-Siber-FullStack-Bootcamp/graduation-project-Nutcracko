<template>
  <div class="navbar-container">
    <ul class="nav-bar">
      <li class="home"><a href="/">Home</a></li>
      <li class="store"><a href="/store">Store</a></li>
      <li class="contact"><a href="/contact">Contact</a></li>
      <li v-if="!cookie" class="sign-in"><a href="/login">Sign In</a></li>
      <li v-else-if="cookie" class="cart">
        <a href="/cart"><i class="fas fa-shopping-cart"></i>Cart</a>
      </li>
      <li
        v-if="cookie"
        class="sign-in"
        v-on:click="logout"
        style="border-color: red"
      >
        <a>Log-out</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "NavBarComponent",
  components: {},
  data() {
    return {
      cookie: document.cookie,
    };
  },
  methods: {
    logout: function () {
      document.cookie = `auth=; Max-Age=-99999999`;
      document.cookie = `sellerauth=; Max-Age=-99999999`;
      localStorage.clear();
      window.location.href = "http://localhost:8080/login";
    },
  },
};
</script>
<style>
.navbar-container {
  display: flex;
  margin-right: 5%;
}
.navbar-container ul {
  display: flex;
  list-style-type: none;
}
.navbar-container a {
  text-decoration: none;
  color: var(--primary);
  font-size: 30px;
  margin-right: 40px;
  font-family: "Lobster", cursive;
}
.sign-in {
  justify-content: center;
  margin: 0;
  border-radius: 10px;
  border: 3px solid var(--third);
  font-size: 20px;
}
</style>
