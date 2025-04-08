<template>
	<div id="app">
		<main id="main">
			<section class="section">
				<article class="article">
					<h2>거래 내역</h2>
				</article>
			</section>
		</main>
	</div>
</template>

<script setup>
import Calendar from "../component/Calendar.vue";
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
	width: 100%;
	height: 100%;
	border: 1px solid red;
}

.article {
	margin: 10px;
	padding: 10px;
}
</style>
