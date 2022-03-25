<template>
  <div class="login-container">
    <div class="box" id="login">
      <img src="../../assets/logo.png" alt="E-Commerce Logo" />

      <h1>Nut<span>E-Commerce</span></h1>
      <h1>Login</h1>
      <p>Don't you have an account?<a href="/register">Register here!</a></p>

      <input type="text" name="email" id="email" placeholder="Email" />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
      />
      <input type="submit" id="login-button" value="Login" />

      <ul id="form-messages">
        <li id="generic-error">Generic Eror #1</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "LoginBox",
  components: {},
};
</script>
<style>
.login-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  width: 350px;
  margin-top: 1%;
  padding: 40px;
  background: #f5f6fa;
  text-align: center;
  border-radius: 20px;
  border: 3px solid var(--secondary);
}
.box h1 {
  padding: 0;
  color: var(--primary);
  margin: 0;
  font-weight: 300;
  font-family: "Pacifico", cursive;
}
.box span {
  padding: 0;
  color: var(--secondary);
  font-weight: 300;
  font-family: "Pacifico", cursive;
}
.box img {
  width: 200px;
  padding: 5px;
  position: relative;
}
.box input[type="text"],
.box input[type="password"] {
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
.box input[type="text"]:focus,
.box input[type="password"]:focus {
  width: 250px;
  border-color: var(--third);
}
.box input[type="submit"] {
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid var(--third);
  padding: 14px 40px;
  outline: none;
  color: black;
  border-radius: 24px;
  transition: 0.25s;
  cursor: pointer;
}
.box input[type="submit"]:hover {
  background: var(--third);
}
#form-messages {
  background-color: rgb(255, 232, 232);
  border: 2px solid red;
  color: red;
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
</style>
