<template>
  <div id="app">
    <MainNavbar />
    <router-view></router-view>
    <MainFooter /> <!-- ✅ Footer-i tani do të shfaqet në çdo faqe -->
  </div>
</template>

<script>
import MainNavbar from './components/MainNavbar.vue'; // ✅ Navbar-i kryesor
import MainFooter from './components/MainFooter.vue'; // ✅ Footer-i i ri

export default {
  components: {
    MainNavbar,
    MainFooter
  }
};
</script>

<style>
nav {
  margin-bottom: 20px;
}
nav a {
  margin-right: 10px;
  text-decoration: none;
  color: blue;
}
</style>
