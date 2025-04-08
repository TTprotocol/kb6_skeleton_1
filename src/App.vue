<template>
	<div>
		<Header />
		<router-view></router-view>
		<Footer />
	</div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import Header from "./component/Header.vue";
import Footer from "./component/Footer.vue";

import { getAccountListStore } from "./stores/GetAccountListStore";

const listStore = getAccountListStore();
const { fetchAllList } = listStore;
fetchAllList();
</script>

<style scoped></style>
