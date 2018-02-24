<template>
  <main id="app">
    <router-view/>
  </main>
</template>

<style>
html, body, #app {
  width: 100%;
  height: 100%;
}
html {
  font-size: 100%;
  font-variant-ligatures: none;
  text-rendering: optimizeLegibility;
  font-smoothing: antialiased;
  text-shadow: rgba(0,0,0,0.01) 0 0 1px;
  position: relative;
  background-image: linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%);
  overflow: hidden;
}
#app {
  overflow: auto;
  padding: 0 1rem;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
