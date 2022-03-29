<template>
  <div class="container">
    <TopBarComponent page="store" />
    <SearchBoxComponent />
  </div>
</template>
<script>
import TopBarComponent from "@/components/HomePageComponents/TopBarComponent.vue";
import SearchBoxComponent from "../components/SearchPageComponents/SearchBoxComponent.vue";

export default {
  name: "SearchPage",
  components: { TopBarComponent, SearchBoxComponent },
};
</script>
<style>
.container {
  flex: 1;
  align-items: center;
  justify-content: center;
}
</style>
