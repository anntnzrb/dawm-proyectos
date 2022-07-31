<template>
  <header>
    <router-link to="/">
      <h1>nnn-movies</h1>
    </router-link>
  </header>

  <main>
    <router-view/>
  </main>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Barrio&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Ubuntu Mono', monospace;
  }

  body {
    background-color: #242A32;
  }

  a {
    text-decoration: none;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: gray; // FIXME
    box-shadow: 0 0 0 6px rgba(0, 0, 0, 0.1);
  }

  h1 {
    color: #C95C5C;
    font-size: 32pt;
    font-family: 'Barrio', cursive;
  }
</style>
