<template>
  <div class="myproducts-container">
    <div v-if="this.products == []">No products exist.</div>
    <div class="product" v-for="product in products" :key="product.name">
      <img v-bind:src="product.image" v-bind:alt="product.name" />
      <h3>{{ product.name }}</h3>
      <hr />
      <p>{{ product.seller }}</p>
      <h2>{{ product.price }} ₺</h2>
      <p v-if="product.stockexists">Stock Exists</p>
      <p v-else-if="!product.stockexists" style="color: red">Out of Stock!</p>
      <button v-on:click="changeStock(product.p_id)">Change Stock</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "MyProductsComponent",
  components: {},
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    // GET request using fetch with error handling
    axios({
      method: "GET",
      url: "http://localhost:5050/api/product/seller",
      mode: "cors",
      headers: { sellerauth: localStorage.getItem("sellerauth") },
    })
      .then((data) => {
        this.products = data.data;
      })
      .catch((err) => console.log("ERROR:" + err.response.data));
  },
  methods: {
    changeStock: async function (productid) {
      axios({
        method: "PUT",
        url: "http://localhost:5050/api/product/changestock/" + productid,
        mode: "cors",
        headers: { sellerauth: localStorage.getItem("sellerauth") },
      })
        .then((data) => {
          window.location.replace("http://localhost:8080/dashboard");
          console.log(data);
        })
        .catch((err) => alert(`Error occured:${err.response.data}`));
    },
  },
};
</script>
<style>
.myproducts-container {
  flex: 1;
  display: flex;
  flex-flow: wrap;
  align-items: center;
  justify-content: left;
  margin-left: 5px;
}
.product {
  width: 220px;
  height: 370px;
  border: 2px solid var(--primary);
  padding: 10px;
  border-radius: 15px;
  font-family: "Roboto", cursive;
  margin: 4px;
}
.product button {
  margin: 0;
  font-size: 20px;
  padding: 8px 4px;
  background-color: var(--third);
  border: 1px solid var(--primary);
  border-radius: 3px;
}
.product button:hover {
  background-color: green;
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
  border-color: var(--third);
}
.product img {
  width: 150px;
  height: 150px;
}
.pricediv {
  display: contents;
}
</style>
