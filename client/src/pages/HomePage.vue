<template>
  <div class="container">
    <TopBarComponent page="home" />
    <HeroComponent />
  </div>
</template>
<script>
import TopBarComponent from "@/components/HomePageComponents/TopBarComponent.vue";
import HeroComponent from "@/components/HomePageComponents/HeroComponent.vue";
export default {
  name: "HomePage",
  components: { TopBarComponent, HeroComponent },
};
</script>
<style>
.container {
  flex: 1;
  align-items: center;
  justify-content: center;
}
</style>
