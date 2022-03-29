<template>
  <div class="storebox-container">
    <LeftCollumnComponent />
    <FilterProductsComponent />
  </div>
</template>
<script>
import LeftCollumnComponent from "../StorePageComponents/StoreBoxComponents/LeftCollumnComponent.vue";
import FilterProductsComponent from "./FilterBoxComponents/FilterProductsComponent.vue";

export default {
  name: "FilterBoxComponent",
  components: { LeftCollumnComponent, FilterProductsComponent },
};
</script>

<style>
.storebox-container {
  flex: 1;
  display: flex;
}
</style>
