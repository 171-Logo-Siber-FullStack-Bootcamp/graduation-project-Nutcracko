<template>
  <div class="register-container">
    <div class="registerbox" id="register">
      <LogoComponent />
      <h1>Register</h1>
      <hr />
      <label for="acc-type">Account-Type:</label>
      <select name="acctype-dropdown" id="acc-dropdown">
        <option value="select">Select...</option>
        <option value="user">User Account</option>
        <option value="seller">Seller Account</option>
      </select>
      <input type="text" name="username" id="username" placeholder="Username" />
      <input type="text" name="email" id="email" placeholder="Email" />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
      />
      <input
        type="password"
        name="password"
        id="repeatpassword"
        placeholder="Repeat-password"
      />
      <input
        type="submit"
        id="register-button"
        value="Register"
        v-on:click="register"
      />

      <ul id="form-messages">
        <li id="generic-error">Generic Eror #1</li>
      </ul>
    </div>
  </div>
</template>

<script>
import LogoComponent from "../HomePageComponents/TopBarComponents/LogoComponent.vue";

import axios from "axios";

export default {
  name: "RegisterBox",
  components: { LogoComponent },
  methods: {
    register: async function () {
      //check if repeat password matches
      if (
        document.getElementById("password").value !=
        document.getElementById("repeatpassword").value
      ) {
        document.getElementById(
          "generic-error"
        ).innerHTML = `Passwords do not match.`;
        document.getElementById("form-messages").style["display"] = "block";
        document.getElementById("form-messages").style["border"] =
          "2px solid red";
        document.getElementById("form-messages").style["background-color"] =
          "rgb(255, 232, 232)";
        return;
      }
      //
      const data = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };
      if (document.getElementById("acc-dropdown").value == "user") {
        axios({
          method: "POST",
          url: "http://localhost:5050/api/auth/user/register",
          mode: "cors",
          data: data,
        })
          .then((response) => {
            console.log(response);
            document.getElementById(
              "generic-error"
            ).innerHTML = `User has been created successfully!`;
            document.getElementById("form-messages").style["display"] = "block";
            document.getElementById("form-messages").style["border"] =
              "2px solid var(--third)";
            document.getElementById("form-messages").style["background-color"] =
              "var(--third)";
            document.getElementById("form-messages").style["background-color"] =
              "#68d986";
          })
          .catch((err) => {
            document.getElementById(
              "generic-error"
            ).innerHTML = `Error: ${err.response.data}`;
            document.getElementById("form-messages").style["display"] = "block";
            document.getElementById("form-messages").style["border"] =
              "2px solid red";
            document.getElementById("form-messages").style["background-color"] =
              "rgb(255, 232, 232)";
          });
      } else if (document.getElementById("acc-dropdown").value == "seller") {
        axios({
          method: "POST",
          url: "http://localhost:5050/api/auth/seller/register",
          mode: "cors",
          data: data,
        })
          .then((response) => {
            console.log(response);
            document.getElementById(
              "generic-error"
            ).innerHTML = `Seller has been created successfully!`;
            document.getElementById("form-messages").style["display"] = "block";
            document.getElementById("form-messages").style["border"] =
              "2px solid var(--third)";
            document.getElementById("form-messages").style["background-color"] =
              "var(--third)";
            document.getElementById("form-messages").style["background-color"] =
              "#68d986";
          })
          .catch((err) => {
            document.getElementById(
              "generic-error"
            ).innerHTML = `Error: ${err.response.data}`;
            document.getElementById("form-messages").style["display"] = "block";
            document.getElementById("form-messages").style["border"] =
              "2px solid red";
            document.getElementById("form-messages").style["background-color"] =
              "rgb(255, 232, 232)";
          });
      } else {
        document.getElementById(
          "generic-error"
        ).innerHTML = `Please Select Account-Type.`;
        document.getElementById("form-messages").style["display"] = "block";
        document.getElementById("form-messages").style["border"] =
          "2px solid red";
        document.getElementById("form-messages").style["background-color"] =
          "rgb(255, 232, 232)";
      }
    },
  },
};
</script>
<style>
.register-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.registerbox {
  width: 90%;
  padding: 40px;
  background: #f5f6fa;
  text-align: center;
  border-radius: 20px;
  border: 3px solid var(--third);
}
.registerbox h1 {
  padding: 0;
  color: var(--primary);
  margin-bottom: 0;
  font-weight: 300;
  font-family: "Pacifico", cursive;
}
.registerbox span {
  padding: 0;
  color: var(--secondary);
  font-weight: 300;
  font-family: "Pacifico", cursive;
}
.registerbox input[type="text"],
.registerbox input[type="password"] {
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
.registerbox input[type="text"]:focus,
.registerbox input[type="password"]:focus {
  width: 250px;
  border-color: var(--third);
}
.registerbox input[type="submit"] {
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
.registerbox input[type="submit"]:hover {
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
.registerbox select {
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
.registerbox option {
  font-size: 1.5em;
}
</style>
