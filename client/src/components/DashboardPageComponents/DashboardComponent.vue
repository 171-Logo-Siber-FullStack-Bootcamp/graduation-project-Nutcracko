<template>
  <div class="dashboard-container">
    <MyProductsComponent />
    <AddProductComponent />
  </div>
</template>
<script>
import MyProductsComponent from "./DashboardComponents/MyProductsComponent.vue";
import AddProductComponent from "./DashboardComponents/AddProductComponent.vue";

export default {
  name: "DashboardComponent",
  components: { MyProductsComponent, AddProductComponent },
};
</script>
<style>
.dashboard-container {
  flex: 1;
  display: flex;
}
</style>
