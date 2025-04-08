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
							<tr
								v-for="item in sortedList"
								:key="item.id"
								@click="router.push(`/account/${item.id}`)"
							>
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
import { onMounted, ref, computed, reactive, watchEffect, watch } from "vue";
import { getAccountListStore } from "@/stores/GetAccountListStore.js";
import { useRouter } from "vue-router";

const router = useRouter();
const store = getAccountListStore();

const { fetchPageList, nextPage, prevPage } = store;
fetchPageList();

const sortedList = computed(() => {
	console.log(store.pageList);
	return [...store.pageList].sort((a, b) => (a.date > b.date ? -1 : 1));
});

// // 정렬 기준 및 순서
// const sortKey = ref("date"); // 정렬 기준 필드 (예: date, amount, category)
// const sortOrder = ref("desc"); // desc 또는 asc

// // 정렬된 리스트 반환
// const sortedList = computed(() => {
// 	return [...store.pageList].sort((a, b) => {
// 		const valA = a[sortKey.value];
// 		const valB = b[sortKey.value];

// 		// 문자열과 숫자에 모두 대응
// 		if (valA === valB) return 0;

// 		if (sortOrder.value === "desc") {
// 			return valA > valB ? -1 : 1;
// 		} else {
// 			return valA < valB ? -1 : 1;
// 		}
// 	});
// });

// // 정렬 기준 변경 함수
// function changeSort(key) {
// 	if (sortKey.value === key) {
// 		// 동일 키 클릭 시 오름/내림 순 토글
// 		sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
// 	} else {
// 		sortKey.value = key;
// 		sortOrder.value = "desc"; // 새로운 키 선택 시 기본은 내림차순
// 	}
// }
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
