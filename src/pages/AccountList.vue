<template>
	<div class="transaction-page p-4">
		<TransactionTabs v-model="currentTab" />
		<DateRangePicker v-model:start="startDate" v-model:end="endDate" />

		<TransactionChart :data="filteredData" :tab="currentTab" />

		<TransactionTable
			:data="filteredData"
			v-model:checkedItems="checkedItems"
			:currentTab="currentTab"
		/>

		<TransactionFooter
			:total="totalAmount"
			:checkedTotal="checkedTotalAmount"
			:checkedItems="checkedItems"
			@add="goToAddTransaction"
		/>
	</div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import dayjs from "@/utils/dayjs";
import TransactionTabs from "@/component/TransactionTabs.vue";
import DateRangePicker from "@/component/DateRangePicker.vue";
import TransactionTable from "@/component/TransactionTable.vue";
import rawData from "/db.json"; // 예시 데이터
import TransactionFooter from "@/component/TransactionFooter.vue";
import TransactionChart from "@/component/TransactionChart.vue";

const currentTab = ref("지출");
const startDate = ref("2025-04-01");
const endDate = ref("2025-04-30");
const checkedItems = ref([]);

// 거래내역 데이터
const allData = rawData.periodicData || rawData; // 상황에 따라 key 확인

const filteredData = computed(() => {
	return allData.filter((item) => {
		const date = dayjs(item.date);
		const typeMatch =
			currentTab.value === "전체"
				? true
				: currentTab.value === "수입"
				? item.type === 1
				: item.type === -1;

		return (
			typeMatch &&
			date.isSameOrAfter(startDate.value) &&
			date.isSameOrBefore(endDate.value)
		);
	});
});

const totalAmount = computed(() => {
	return filteredData.value.reduce((sum, item) => {
		if (currentTab.value === "전체") {
			return sum + item.amount * item.type;
		} else {
			return sum + item.amount;
		}
	}, 0);
});

const checkedTotalAmount = computed(() =>
	checkedItems.value.reduce((sum, item) => {
		if (currentTab.value === "전체") {
			return sum + item.amount * item.type;
		} else {
			return sum + item.amount;
		}
	}, 0)
);

watch([currentTab, startDate, endDate], () => {
	checkedItems.value = [];
});

const router = useRouter();
const goToAddTransaction = () => {
	router.push("/account/:id"); // 이 경로는 내가 설정한 페이지로 수정 가능
};
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
	height: 70vh;
	margin: 10px;
	padding: 10px;
	box-sizing: border-box;
}
.section {
	width: 80%;
	border: 1px solid red;
}
.transction-page {
	padding-bottom: 80px;
}
</style>
