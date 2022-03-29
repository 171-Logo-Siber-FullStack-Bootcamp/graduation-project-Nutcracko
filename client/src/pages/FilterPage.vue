<template>
  <div class="container">
    <TopBarComponent page="store" />
    <FilterBoxComponent />
  </div>
</template>
<script>
import TopBarComponent from "@/components/HomePageComponents/TopBarComponent.vue";
import FilterBoxComponent from "@/components/FilterPageComponents/FilterBoxComponent.vue";

export default {
  name: "FilterPage",
  components: { TopBarComponent, FilterBoxComponent },
};
</script>
<style>
.container {
  flex: 1;
  align-items: center;
  justify-content: center;
}
</style>
