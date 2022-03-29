<template>
  <div class="leftcollumn-container">
    <div class="searchbar">
      <input
        class="search"
        id="search-bar"
        type="text"
        placeholder="Search.."
      />
      <button class="srch" id="search-button" v-on:click="search">
        <i class="fas fa-search"></i>
      </button>
    </div>
    <div class="filter-options">
      <h2>Categories:</h2>
      <select name="filter-dropdown" id="filter-dropdown">
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
        type="submit"
        id="filter-button"
        value="Filter"
        v-on:click="filter"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "LeftCollumnComponent",
  components: {},
  mounted() {
    // GET request using fetch with error handling
    fetch("http://localhost:5050/api/category")
      .then((response) => response.json())
      .then((data) => (this.categories = data))
      .catch((err) => console.log("ERROR:" + err.message));
  },
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    search: function () {
      if (document.getElementById("search-bar").value != "") {
        window.location.replace(
          "http://localhost:8080/search?term=" +
            document.getElementById("search-bar").value
        );
      } else {
        window.location.replace("http://localhost:8080/store");
      }
    },
    filter: function () {
      if (document.getElementById("filter-dropdown").value != "select") {
        window.location.replace(
          "http://localhost:8080/filter?category=" +
            document.getElementById("filter-dropdown").value
        );
      } else {
        alert("Please Select a filter to filter elements.");
      }
    },
  },
};
</script>

<style>
.leftcollumn-container {
  width: 350px;
  height: auto;
  left: 3px;
  margin-top: 5px;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--primary);
  border-radius: 10px;
}
.searchbar {
  margin: 1em;
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
}
.searchbar input {
  margin: 5px;
  background: none;
  display: block;
  text-align: center;
  border: 2px solid var(--secondary);
  outline: none;
  width: 200px;
  height: 30px;
  border-radius: 12px;
  transition: 0.25s;
  font-size: 1.2em;
}
.searchbar input:focus {
  width: 225px;
  height: 40px;
  border-color: var(--third);
}
.searchbar button {
  border-radius: 10px;
  width: 35px;
  height: 35px;
}
.filter-options {
  justify-content: center;
  align-items: center;
  font-family: "Roboto", cursive;
  font-size: 20px;
}
.filter-options select {
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
  border-radius: 5px;
  transition: 0.25s;
}
.filter-options option {
  font-size: 1.5em;
}

.filter-options input[type="submit"] {
  border: 0;
  background: none;
  margin: 30px 125px;
  display: block;
  text-align: center;
  font-size: 18px;
  padding: 14px 30px;
  border: 2px solid var(--third);
  outline: none;
  color: black;
  border-radius: 24px;
  transition: 0.25s;
  cursor: pointer;
}
.filter-options input[type="submit"]:hover {
  background: var(--third);
}
</style>
