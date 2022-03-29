<template>
  <div class="container">
    <TopBarComponent page="cart" />
    <UserCartComponent />
  </div>
</template>
<script>
import TopBarComponent from "@/components/HomePageComponents/TopBarComponent.vue";
import UserCartComponent from "@/components/CartPageComponents/UserCartComponent.vue";

export default {
  name: "CartPage",
  components: { TopBarComponent, UserCartComponent },
  mounted() {
    //if user token does not exists go to login page
    if (!localStorage.getItem("auth")) {
      window.location.href = "http://localhost:8080/login";
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
