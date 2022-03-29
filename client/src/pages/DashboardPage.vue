<template>
  <div class="container">
    <TopBarComponent page="dashboard" />
    <DashboardComponent />
  </div>
</template>
<script>
import TopBarComponent from "@/components/HomePageComponents/TopBarComponent.vue";
import DashboardComponent from "@/components/DashboardPageComponents/DashboardComponent.vue";

export default {
  name: "DashboardPage",
  components: { TopBarComponent, DashboardComponent },
  mounted() {
    //if seller token does not exists go to login page
    if (!localStorage.getItem("sellerauth")) {
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
