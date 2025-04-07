<template>
	<div>
		<Header />
		<router-view></router-view>
		<Footer />
	</div>
</template>

<script setup>
import Header from "./component/Header.vue";
import Footer from "./component/Footer.vue";
</script>

<style scoped></style>
