<template>
  <div class="addproduct-container">
    <h2>Add New Product:</h2>
    <hr />
    <label for="Image">Product Image:</label>
    <input
      type="file"
      name="image"
      id="image"
      placeholder="Product Name"
      accept="image/*"
    />
    <label>Category:</label>
    <select name="category-dropdown" id="category-dropdown">
      <option value="select">Select...</option>
      <option
        v-for="category in categories"
        :key="category.name"
        v-bind:value="category.name"
      >
        {{ category.name }}
      </option>
    </select>
    <input
      type="text"
      name="productname"
      id="productname"
      placeholder="Product Name"
    />
    <input
      type="text"
      name="description"
      id="description"
      placeholder="Description"
    />
    <input type="text" name="price" id="price" placeholder="Price" />

    <input
      type="submit"
      id="addproduct-button"
      value="Create Product"
      v-on:click="addproduct"
    />

    <ul id="form-messages">
      <li id="generic-error">Generic Eror #1</li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "AddProductComponent",
  components: {},
  data() {
    return {
      categories: [],
    };
  },
  mounted() {
    // GET request using fetch with error handling
    //gets categories for category dropdown
    fetch("http://localhost:5050/api/category")
      .then((response) => response.json())
      .then((data) => (this.categories = data))
      .catch((err) => console.log("ERROR:" + err.message));
  },
  methods: {
    addproduct: async function () {
      //works when create product clicked
      //creates form-data
      const data = new FormData();
      //adds info to form-data
      data.append("image", document.getElementById("image").files[0]);
      data.append("name", document.getElementById("productname").value);
      data.append("description", document.getElementById("description").value);
      data.append(
        "category",
        document.getElementById("category-dropdown").value
      );
      data.append("price", document.getElementById("price").value);
      //posts product form-data to api
      axios({
        method: "post",
        url: "http://localhost:5050/api/product",
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
          sellerauth: localStorage.getItem("sellerauth"),
        },
      })
        .then((response) => {
          console.log(response);
          document.getElementById(
            "generic-error"
          ).innerHTML = `Product has been created successfully!`;
          document.getElementById("form-messages").style["display"] = "block";
          document.getElementById("form-messages").style["border"] =
            "2px solid var(--third)";
          document.getElementById("form-messages").style["background-color"] =
            "var(--third)";
          document.getElementById("form-messages").style["background-color"] =
            "#68d986";
        })
        .catch((err) => {
          console.log(err);
          document.getElementById(
            "generic-error"
          ).innerHTML = `Error: ${err.response.data}`;
          document.getElementById("form-messages").style["display"] = "block";
        });
    },
  },
};
</script>
<style>
.addproduct-container {
  width: 40%;
  height: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  border: 2px solid var(--primary);
  border-radius: 10px;
}
.addproduct-container input {
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid var(--secondary);
  padding: 14px 10px;
  width: 200px;
  outline: none;
  color: black;
  border-radius: 24px;
  transition: 0.25s;
}
.addproduct-container input:focus {
  width: 250px;
  border-color: var(--third);
}
.addproduct-container input[type="submit"] {
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid var(--third);
  padding: 14px 40px;
  outline: none;
  color: var(--primary);
  border-radius: 24px;
  transition: 0.25s;
  cursor: pointer;
}
.addproduct-container input[type="submit"]:hover {
  background: var(--third);
}
#form-messages {
  background-color: rgb(255, 232, 232);
  border: 2px solid red;
  color: black;
  border-radius: 20px;
  display: none;
  font-size: 13px;
  font-weight: 300;
  margin-top: 10px;
  padding: 10px;
  width: auto;
  position: relative;
}
#form-messages li {
  list-style-type: none;
}
.addproduct-container select {
  border: 0;
  background: transparent;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid var(--secondary);
  padding: 14px 10px;
  width: 200px;
  outline: none;
  color: var(--primary);
  border-radius: 24px;
  transition: 0.25s;
}
.addproduct-container option {
  font-size: 1.5em;
}
</style>
