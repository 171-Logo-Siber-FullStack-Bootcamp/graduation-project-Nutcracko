<template>
  <div class="topbar-container">
    <LogoComponent style="margin-left: 5%" />
    <NavBarComponent />
  </div>
</template>
<script>
import LogoComponent from "./TopBarComponents/LogoComponent.vue";
import NavBarComponent from "./TopBarComponents/NavBarComponent.vue";
export default {
  name: "TopBarComponent",
  components: { LogoComponent, NavBarComponent },
};
</script>
<style>
.topbar-container {
  background-color: white;
  display: flex;
  width: 100%;
  height: 20%;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  border: 2px solid var(--primary);
}
</style>
