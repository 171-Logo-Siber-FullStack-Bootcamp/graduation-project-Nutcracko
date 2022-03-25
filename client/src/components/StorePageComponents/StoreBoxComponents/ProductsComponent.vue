<template>
  <div class="products-container">
    <div class="product" v-for="product in products" :key="product.name">
      <img v-bind:src="product.image" v-bind:alt="product.name" />
      <h3>{{ product.name }}</h3>
      <hr />
      <p>{{ product.description }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProductsComponent",
  components: {},
  mounted() {
    // GET request using fetch with error handling
    fetch("http://localhost:5050/api/product")
      .then((response) => response.json())
      .then((data) => (this.products = data))
      .catch((err) => console.log("ERROR:" + err.message));
  },
  data() {
    return {
      products: [],
    };
  },
};
</script>
<style>
.products-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: left;
  margin-left: 5px;
}
.product {
  width: 220px;
  height: 300px;
  border: 2px solid var(--primary);
  padding: 10px;
  border-radius: 15px;
  font-family: "Roboto", cursive;
  margin: 4px;
}
.product h3 {
  margin: 0;
  margin-top: 2px;
}
.product p {
  margin: 0;
  margin-top: 2px;
}
.product:hover {
  border: 3px solid var(--third);
}
.product img {
  width: 150px;
  height: 150px;
}
</style>
