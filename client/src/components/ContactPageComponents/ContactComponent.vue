<template>
  <div class="contact-container">
    <div class="left">
      <LogoComponent></LogoComponent>
    </div>
    <div class="right">
      <h1>Contact Us!</h1>
      <p><span>Mail:</span></p>
      <p>info: info@nut-e.com</p>
      <p>support: help@nut-e.com</p>
      <p><span>Address:</span><Address>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel deleniti, ab alias blanditiis porro voluptatibus! <span>Kadikoy/Istanbul</span></Address></p>
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12046.367960184745!2d29.0291628!3d40.9904143!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x703cd0993370cf84!2zS2FkxLFrw7Z5IEJvxJ9hIEhleWtlbGk!5e0!3m2!1str!2str!4v1648462128683!5m2!1str!2str" width="350" height="350" style="border:2px solid var(--secondary);border-radius:10px;padding:  10px;margin: 15px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </div>
</template>
<script>
import LogoComponent from "../HomePageComponents/TopBarComponents/LogoComponent.vue";
export default {
  name: "ContactComponent",
  components: { LogoComponent },
};
</script>
<style>
.contact-container {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 20px;
}
.left {
  flex:1;
  width: 40%;
}
.right {
  flex:1;
  width: 70%;
  border: 2px solid var(--primary);
  border-radius: 15px;
}
.left img {
  width: 40%;
  height: auto;
  margin-top: 5%;
  margin-bottom: 3%;
}
.right p h1{
  font-family: "Roboto";
  font-size: 20px;
  flex: 1;
  text-align: justify;
}
.right span{
  font-weight: bold;
}
</style>
