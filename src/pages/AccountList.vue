<template>
	<div id="app">
		<main id="main">
			<section id="graph" class="section">
				<article>
					<h2>섹션1</h2>
				</article>
			</section>
			<section id="list" class="section">
				<h2 id="list__title">거래 내역 목록</h2>
				<article id="list__article">
					<table class="table">
						<thead>
							<tr>
								<th scope="col">ㅁ</th>
								<th scope="col">날짜</th>
								<th scope="col">카테고리</th>
								<th scope="col">사용내역</th>
								<th scope="col">금액</th>
								<th scope="col">메모</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in sortData" :key="item.id">
								<td>ㅁ</td>
								<td>{{ item.date }}</td>
								<td>{{ item.category }}</td>
								<td>{{ item.description }}</td>
								<td>{{ item.amount }}</td>
								<td>{{ item.memo }}</td>
							</tr>
						</tbody>
					</table>
				</article>
			</section>
		</main>
	</div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { getAccountListStore } from "@/stores/GetAccountListStore.js";

const store = getAccountListStore();
store.setUser("user4@example.com");

onMounted(() => {
	store.fetchData();
});

const { dataList } = storeToRefs(store);

const sortData = computed(() => {
	return [...dataList.value].sort((a, b) => (a.date > b.date ? 1 : -1));
});
</script>

<style scoped>
#app {
	margin: 10px;
	padding: 10px;
	box-sizing: border-box;
}
#main {
	/* display: flex;
	justify-content: space-between; */
	border: 1px solid blue;
	height: 75vh;
	margin: 10px;
	padding: 10px;
	box-sizing: border-box;
}
.section {
	width: 100%;
	height: 50%;
	border: 1px solid red;
}

#graph {
}

#list {
	height: 50%;
}
#list__title {
	display: inline-block;
	height: 10%;
}
#list__article {
	height: 90%;
	overflow: scroll;
}
</style>
