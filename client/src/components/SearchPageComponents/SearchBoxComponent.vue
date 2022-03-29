<template>
  <div class="storebox-container">
    <LeftCollumnComponent />
    <SearchProductsComponent />
  </div>
</template>
<script>
import LeftCollumnComponent from "../StorePageComponents/StoreBoxComponents/LeftCollumnComponent.vue";
import SearchProductsComponent from "./SearchBoxComponents/SearchProductsComponent.vue";

export default {
  name: "SearchBoxComponent",
  components: { LeftCollumnComponent, SearchProductsComponent },
};
</script>

<style>
.storebox-container {
  flex: 1;
  display: flex;
}
</style>
