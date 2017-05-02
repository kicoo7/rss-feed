<template>
  <div id="app">
    <!-- Latest compiled and minified JavaScript -->
    <img src="./assets/logo.png">
    <Feed></Feed>
  </div>

</template>

<script>
import Feed from './components/Feed';

export default {
  name: 'app',
  components: {
    Feed,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
