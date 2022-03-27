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
    //TODO:these statements should be changed with if document.cookie.splice("=")!=auth and so on
    if (!document.cookie) {
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
