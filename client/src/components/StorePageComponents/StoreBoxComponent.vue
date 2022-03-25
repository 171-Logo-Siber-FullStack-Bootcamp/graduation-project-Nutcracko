<template>
  <div class="storebox-container">
    <LeftCollumnComponent />
    <ProductsComponent />
  </div>
</template>
<script>
import LeftCollumnComponent from "./StoreBoxComponents/LeftCollumnComponent.vue";
import ProductsComponent from "./StoreBoxComponents/ProductsComponent.vue";

export default {
  name: "StoreBoxComponent",
  components: { LeftCollumnComponent, ProductsComponent },
};
</script>

<style>
.storebox-container {
  flex: 1;
  display: flex;
}
</style>
