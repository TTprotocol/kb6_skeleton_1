<template>
	<div>
		<Header v-if="currentRoute === '/'" />
		<router-view></router-view>
		<!-- <Footer v-if="currentRoute === '/'" /> -->
	</div>
</template>

<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
import Header from "./component/Header.vue";
import Footer from "./component/Footer.vue";

import { getAccountListStore } from "./stores/GetAccountListStore";

const currentRoute = useRoute();

console.log("currentRoute : ", currentRoute);
console.log("currentRoute : ", currentRoute.fullPath);

const listStore = getAccountListStore();
const { fetchAllList } = listStore;
fetchAllList();
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");
</style>
