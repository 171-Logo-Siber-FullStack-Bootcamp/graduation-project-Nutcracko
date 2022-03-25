<template>
  <div class="logo-container">
    <img src="../../../assets/logo.png" alt="E-Commmerce Logo" />
    <a>Nut<span>E-Commerce</span></a>
  </div>
</template>
<script>
export default {
  name: "LogoComponent",
  components: {},
};
</script>
<style>
.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-container a {
  font-family: "Pacifico", cursive;
  text-decoration: none;
  color: var(--primary);
  font-size: 25px;
  font-weight: 400;
}
.logo-container span {
  text-decoration: none;
  color: var(--secondary);
}
.logo-container img {
  width: 70px;
  height: 70px;
}
</style>
