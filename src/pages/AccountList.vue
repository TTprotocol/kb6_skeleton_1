<template>
	<div id="app" class="transaction-page container">
		<div
			class="d-flex align-items-center justify-content-between gap-2 flex-wrap"
		>
			<TransactionTabs v-model="currentTab" class="mb-3" />
			<DateRangePicker
				v-model:start="startDate"
				v-model:end="endDate"
				class="mb-4"
			/>
		</div>

		<div class="card mb-4">
			<div class="card-body">
				<TotalChart :data="chartData" :tab="currentTab" class="mb-4" />
			</div>
		</div>

		<div class="card mb-4">
			<div class="card-body p-0">
				<TransactionTable
					:data="filteredData"
					v-model:checkedItems="checkedItems"
					:currentTab="currentTab"
					class="mb-4"
				/>
			</div>
		</div>

		<TransactionFooter
			:total="totalAmount"
			:checkedTotal="checkedTotalAmount"
			:checkedItems="checkedItems"
			@add="goToAddTransaction"
		/>
	</div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import dayjs from "@/utils/dayjs";
import TransactionTabs from "@/component/TransactionTabs.vue";
import DateRangePicker from "@/component/DateRangePicker.vue";
import TransactionTable from "@/component/TransactionTable.vue";
import TransactionFooter from "@/component/TransactionFooter.vue";
import TotalChart from "@/component/TotalChart.vue";
import { getAccountListStore } from "@/stores/GetAccountListStore.js";

const store = getAccountListStore();
const currentTab = ref("지출");
const startDate = ref(dayjs().startOf("month").format("YYYY-MM-DD"));
const endDate = ref(dayjs().endOf("month").format("YYYY-MM-DD"));
const checkedItems = ref([]);
//데이터
const allData = ref([]);

onMounted(async () => {
	try {
		const res = await axios.get("/api/periodicData");
		allData.value = res.data;
	} catch (err) {
		console.error("데이터 불러오기 실패:", err);
	}
});

const filteredData = computed(() => {
	return allData.value.filter((item) => {
		const date = dayjs(item.date);
		const typeMatch =
			currentTab.value === "전체"
				? true
				: currentTab.value === "수익"
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

const chartData = computed(() => {
	if (currentTab.value === "전체") {
		const sixMonthsAgo = dayjs().subtract(5, "month").startOf("month");
		return allData.value.filter((item) =>
			dayjs(item.date).isSameOrAfter(sixMonthsAgo)
		);
	} else {
		return filteredData.value;
	}
});

watch([currentTab, startDate, endDate], () => {
	checkedItems.value = [];
});

const router = useRouter();
const goToAddTransaction = () => {
	router.push("/account/0000"); // 이 경로는 내가 설정한 페이지로 수정 가능
};

console.log("allData:", allData);
</script>

<style scoped>
#app {
	height: 100%;
	margin-top: 100px;
	padding-bottom: 50px;
	/* border: 1px solid red; */
}
</style>
