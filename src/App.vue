<template>
	<div style="padding: 10px; box-sizing: border-box">
		<Header v-if="isRootPage"></Header>
		<router-view></router-view>
		<!-- <Footer v-if="currentRoute === '/'" /> -->
	</div>
</template>

<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
import { computed } from "vue";
import Header from "./component/Header.vue";
import Footer from "./component/Footer.vue";

import { getAccountListStore } from "./stores/GetAccountListStore";

const currentRoute = useRoute();

const isRootPage = computed(() => currentRoute.path !== "/");

const listStore = getAccountListStore();
const { fetchAllList } = listStore;
fetchAllList();
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");
</style>
