<template>
	<div id="app">
		<main id="main">
			<section class="section">
				<article>
					<h2>섹션1</h2>
				</article>
			</section>
			<section class="section">
				<article>
					<h2>섹션1</h2>
				</article>
			</section>
			<section class="section">
				<article>
					<h2>섹션1</h2>
				</article>
			</section>
		</main>
	</div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped>
#app {
	margin: 10px;
	padding: 10px;
	box-sizing: border-box;
}
#main {
	display: flex;
	justify-content: space-between;
	border: 1px solid blue;
	height: 75vh;
	margin: 10px;
	padding: 10px;
	box-sizing: border-box;
}
.section {
	width: 80%;
	border: 1px solid red;
}
</style>
