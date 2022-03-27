<template>
  <div v-if="this.itemsLoaded" class="cart-container">
    <div
      class="product-incart"
      v-for="product in this.usercart"
      :key="product.name"
    >
      <div class="item-options">
        <h2>{{ product.numberofitem }} x {{ product.price }} ₺</h2>
        <button style="border: 2px solid var(--third)">+</button>
        <button style="border: 2px solid red">-</button>
      </div>
      <hr />
      <img v-bind:src="product.image" alt="{{product.name}} Image" />
      <div class="productinfo">
        <h1>{{ product.name }}</h1>
        <h3><span>by</span> {{ product.seller }}</h3>

        <hr />
        <p>{{ product.description }}</p>
      </div>
    </div>
    <h2>Total: {{ this.totalvalue }} ₺</h2>
    <button class="checkout" v-on:click="checkout">Check-Out!</button>
    <button class="clearcart" v-on:click="clearcart">Clear Cart</button>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "UserCart",
  components: {},
  mounted() {
    // GET request using fetch with error handling
    axios({
      method: "GET",
      url: "http://localhost:5050/api/user/cart",
      headers: { auth: localStorage.getItem("auth") },
    })
      .then((data) => {
        this.usercart = data.data;
        this.itemsLoaded = true;
        this.calculateTotalValue(data.data);
      })
      .catch((err) => console.log(err));
  },
  data() {
    return {
      usercart: {},
      totalvalue: 0,
      itemsLoaded: false,
    };
  },
  methods: {
    calculateTotalValue: function (data) {
      var totalval = 0;
      for (var i = 0; i < data.length; i++) {
        var val = parseFloat(data[i].numberofitem) * parseFloat(data[i].price);
        totalval += val;
      }
      this.totalvalue = totalval;
    },
    checkout: function () {
      alert("Check-out is not possible yet.");
    },
    clearcart: function () {
      alert("Clear cart presssed.");
    },
  },
};
</script>
<style>
.cart-container {
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 3px solid var(--primary);
  border-radius: 10px;
  padding: 4px;
  margin: 30px 50px;
  font-family: "Roboto", cursive;
}
.product-incart {
  display: flex;
  border: 3px solid var(--primary);
  border-radius: 10px;
  padding: 8px;
  margin: 10px;
}
.product-incart img {
  align-self: center;
  width: 150px;
  height: 150px;
}
.product-incart hr {
  margin: 10px;
  padding: 0;
}
.item-options {
  align-self: center;
}
.item-options button {
  width: 30px;
  height: 30px;
  text-align: center;
  background-color: transparent;
  border-radius: 5px;
  font-size: 25px;
  margin: 2px 8px;
}
.item-options button:hover {
  background-color: grey;
}
.productinfo {
  flex: 1;
  margin: 5px;
}
.productinfo span {
  font-size: 15px;
}
.checkout {
  background-color: transparent;
  margin: 5px;
  padding: 10px 20px;
  border: 2px solid var(--third);
  border-radius: 5px;
  font-size: 18px;
}
.checkout:hover {
  background-color: var(--third);
}
.clearcart {
  background-color: transparent;
  margin: 5px;
  padding: 10px 20px;
  border: 2px solid red;
  border-radius: 5px;
  font-size: 18px;
}
.clearcart:hover {
  background-color: red;
}
</style>
