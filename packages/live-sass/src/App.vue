<template>
  <div id="app">
<!--    <nav>-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
<!--    </nav>-->
<!--    -->
    <nav class="navbar navbar-fixed-top" style="padding:15px;padding-bottom:0;margin-bottom:0;">
      <div class="container" style="margin:0;width: 100%;">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav nav-tabs">
            <li><router-link active-class="active" to="/">Live Sass</router-link></li>
<!--            <li><router-link active-class="active" to="/default">Home</router-link></li>-->
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.home {
  margin-top: 85px;
}

.router-link-exact-active.active {
  border: 1px solid #eee;
  background-color: transparent !important;
  border-bottom: 1px solid white !important;
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
<script setup>
</script>
