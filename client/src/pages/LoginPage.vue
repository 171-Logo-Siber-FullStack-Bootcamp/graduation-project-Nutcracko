<template>
  <div class="container">
    <TopBarComponent page="login" />
    <LoginBoxComponent />
  </div>
</template>
<script>
import TopBarComponent from "@/components/HomePageComponents/TopBarComponent.vue";
import LoginBoxComponent from "@/components/LoginPageComponents/LoginBoxComponent.vue";

export default {
  name: "LoginPage",
  components: { TopBarComponent, LoginBoxComponent },
  mounted() {
    if (localStorage.getItem("auth") || localStorage.getItem("sellerauth")) {
      window.location.href = "http://localhost:8080/";
    }
  },
};
</script>
<style>
.container {
  flex: 1;
  align-items: center;
  justify-content: center;
}
</style>
