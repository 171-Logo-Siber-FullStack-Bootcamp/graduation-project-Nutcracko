<template>
  <div class="products-container">
    <div
      class="product"
      v-for="product in products"
      :key="product._source.name"
    >
      <img
        v-bind:src="product._source.image"
        v-bind:alt="product._source.name"
      />
      <h3>{{ product._source.name }}</h3>
      <hr />
      <p>{{ product._source.seller }}</p>
      <h2>
        {{ product._source.price }} ₺
        <button
          v-if="product._source.stockexists"
          v-on:click="addcomponenttocart(product._source.p_id)"
        >
          + <i class="fas fa-shopping-cart"></i>
        </button>
        <h2 v-else-if="!product._source.stockexists">Out of Stock</h2>
      </h2>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "FilterProductsComponent",
  components: {},
  mounted() {
    //gettin query params
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    // GET request using fetch with error handling
    //gets filtered products
    fetch("http://localhost:5050/api/search/filter/" + params.category)
      .then((response) => response.json())
      .then((data) => {
        this.products = data;
      })
      .catch((err) => console.log("ERROR:" + err.message));
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    addcomponenttocart: function (productid) {
      //when add product to cart is clicked on any product
      if (!localStorage.getItem("auth")) {
        window.location.href = "http://localhost:8080/login";
      } else {
        axios({
          method: "POST",
          mode: "cors",
          url: "http://localhost:5050/api/user/addtocart/" + productid,
          headers: { auth: localStorage.getItem("auth") },
        })
          .then(alert("Product has been added to cart successfully!"))
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>
<style>
.products-container {
  flex: 1;
  display: flex;
  flex-flow: wrap;
  align-items: center;
  justify-content: left;
  margin-left: 5px;
}
.product {
  width: 220px;
  height: 350px;
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
