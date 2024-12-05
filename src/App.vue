<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/chat-geral">Chat Geral</router-link>
  </nav>
  <router-view />
</template>

<style>
body,
html {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background-color: #121212;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  background-color: #121212;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
