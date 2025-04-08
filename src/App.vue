<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Header from './component/Header.vue';
import Footer from './component/Footer.vue';
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
</style>
