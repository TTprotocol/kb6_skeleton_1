<template>
	<div id="app">
		<header id="header">
			<h1>헤더</h1>
		</header>
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
		<footer id="footer">
			<div>
				<h1>푸터</h1>
			</div>
		</footer>
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
#header {
	width: 100%;
	height: 100px;
	margin: 10px;
	padding: 10px;
	box-sizing: border-box;
	border: 1px solid red;
}
#main {
	display: flex;
	justify-content: space-between;
	border: 1px solid blue;
	height: 70vh;
	margin: 10px;
	padding: 10px;
	box-sizing: border-box;
}
.section {
	width: 80%;
	border: 1px solid red;
}
#footer {
	height: 100px;
	margin: 10px;
	padding: 10px;
	box-sizing: border-box;
	border: 1px solid green;
}
</style>
