<template>
  <div class="container">
    <TopBarComponent page="store" />
    <StoreBoxComponent />
  </div>
</template>
<script>
import TopBarComponent from "@/components/HomePageComponents/TopBarComponent.vue";
import StoreBoxComponent from "../components/StorePageComponents/StoreBoxComponent.vue";

export default {
  name: "StorePage",
  components: { TopBarComponent, StoreBoxComponent },
};
</script>
<style>
.container {
  flex: 1;
  align-items: center;
  justify-content: center;
}
</style>
