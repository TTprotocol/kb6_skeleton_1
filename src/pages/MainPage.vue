<template>
	<div id="app">
		<main id="main">
			<section class="section">
				<!-- 꽉 찬 카드 -->
				<div class="card full-width">
					<!-- <h2>ㅇㅇㅇ님의 4월 소비 달성률</h2> -->
					<budgetBarChart
						v-if="loginUser && state.periodicData.length > 0"
						:budget="loginUser.budget"
						:transactions="state.periodicData"
						:userEmail="loginUser.email"
					/>
				</div>

				<!-- 절반 너비 카드 두 개 -->
				<div class="card-container">
					<div class="card half-width">
						<!-- <h2>ㅇㅇㅇ님의 최근 거래 내역</h2> -->
						<!-- <p>왼쪽 카드입니다.</p> -->
						<TransactionList
							v-if="loginUser && state.periodicData.length > 0"
							:userEmail="loginUser.email"
							:userName="loginUser.name"
							:transactions="state.periodicData"
							@refresh="fetchDataAgain"
						/>
					</div>
					<div class="card half-width">
						<!-- <h2>ㅇㅇㅇ님의 소비 트렌드</h2> -->
						<ExpenseTrend
							v-if="loginUser && state.periodicData.length > 0"
							:userName="loginUser.name"
							:userEmail="loginUser.email"
							:transactions="state.periodicData"
						/>
						<!-- <p>오른쪽 카드입니다.</p> -->
					</div>
				</div>
			</section>
		</main>
	</div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { reactive, computed, provide, onMounted, watchEffect } from "vue";
import axios from "axios";
import TransactionList from "@/component/TransactionList.vue";
import budgetBarChart from "@/component/budgetBarChart.vue";
import ExpenseTrend from "@/component/ExpenseTrend.vue";

const state = reactive({
	income: [],
	expense: [],
	users: [],
	periodicData: [],
});

const loginUser = computed(() => state.users.find((u) => u.login === true));
watchEffect(() => {
	if (loginUser.value) {
		console.log("로그인 유저:", loginUser.value.name);
		// console.log('전체 소비 금액:', totalExpense.value);
	}
});

const fetchDataAgain = async () => {
	try {
		const periodicRes = await axios.get("http://localhost:3000/periodicData");
		state.periodicData = periodicRes.data;
		console.log("📦 최신 거래 내역 갱신됨!");
	} catch (err) {
		console.error("❌ 거래 데이터 재조회 실패:", err);
	}
};

onMounted(async () => {
	try {
		// 수입 카테고리
		const incomeRes = await axios.get("http://localhost:3000/categories");
		console.log(`incomeRes.data.income : ${incomeRes.data.income}`);
		// console.log(`incomeRes.data : ${incomeRes.data}`);
		state.income = incomeRes.data.income;

		// 지출 카테고리
		const expenseRes = await axios.get("http://localhost:3000/categories");
		console.log(`expenseRes.data.expense : ${expenseRes.data.expense}`);
		state.expense = expenseRes.data.expense;

		// 사용자 목록
		const userRes = await axios.get("http://localhost:3000/users");
		state.users = userRes.data;
		console.log(`유저 목록 : ${state.users}`);
		// console.log(state.users);

		// 정기 데이터
		const periodicRes = await axios.get("http://localhost:3000/periodicData");
		state.periodicData = periodicRes.data;
	} catch (err) {
		console.error("데이터 불러오기 실패:", err);
	}
});
</script>

<style scoped>
#app {
	margin-top: 50px;
	padding: 10px;
	box-sizing: border-box;
}
#main {
	display: flex;
	justify-content: space-between;
	/* margin: 10px; */
	padding: 10px;
	box-sizing: border-box;
}
.section {
	width: 80%;
	height: 80%;
	max-width: 1200px;
	margin: 0 auto;
	padding: 10px;
	box-sizing: border-box;
}
.card {
	background-color: #f5f5f5;
	border: 1px solid #ddd;
	border-radius: 8px;
	padding: 20px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	margin-bottom: 20px;
}

/* 꽉 찬 카드 */
.full-width {
	width: 100%;
}

/* 절반 크기 카드 컨테이너 */
.card-container {
	display: flex;
	gap: 20px;
	flex-wrap: wrap;
}

/* 절반 너비 카드 */
.half-width {
	flex: 1;
	min-width: 300px; /* 반응형 대응 */
	height: 400px;
}
</style>
