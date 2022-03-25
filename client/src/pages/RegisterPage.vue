<template>
  <div class="container">
    <TopBarComponent page="register" />
    <RegisterBoxComponent />
  </div>
</template>

<script>
import RegisterBoxComponent from "@/components/RegisterPageComponents/RegisterBoxComponent.vue";
import TopBarComponent from "@/components/HomePageComponents/TopBarComponent.vue";
export default {
  name: "RegisterPage",
  components: { RegisterBoxComponent, TopBarComponent },
};
</script>
<style>
.container {
  flex: 1;
  align-items: center;
  justify-content: center;
}
</style>
