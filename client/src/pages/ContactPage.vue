<template>
  <div class="container">
    <TopBarComponent page="home" />
    <ContactComponent />
  </div>
</template>
<script>
import TopBarComponent from "@/components/HomePageComponents/TopBarComponent.vue";
import ContactComponent from "@/components/ContactPageComponents/ContactComponent.vue";
export default {
  name: "ContactPage",
  components: { TopBarComponent, ContactComponent },
};
</script>
<style>
.container {
  flex: 1;
  align-items: center;
  justify-content: center;
}
</style>
