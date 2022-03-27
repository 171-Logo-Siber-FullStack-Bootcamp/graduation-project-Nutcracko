<template>
  <div class="contact-container">
    <div class="info">
      <img src="../../assets/logo.png" alt="" />
      <p>Contact Us!</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "ContactComponent",
  components: {},
};
</script>
<style>
.contact-container {
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.contact-container img {
  width: 50%;
  height: auto;
  margin-top: 5%;
  margin-bottom: 3%;
}
.info {
  margin-left: 15%;
  width: 70%;
  height: auto;
}
.info p {
  font-family: "Roboto";
  font-size: 20px;
  text-align: justify;
  flex: 1;
}
</style>
