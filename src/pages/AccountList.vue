<template>
	<div id="app" class="transaction-page container">
		<div
			class="d-flex align-items-center justify-content-between gap-2 flex-wrap"
		>
			<TransactionTabs
				v-model="currentTab"
				@changeTab="handleTabChange"
				class="mb-3"
			/>
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
					@open-filter="setFilterModal"
				/>
			</div>
		</div>

		<TransactionFooter
			:total="totalAmount"
			:checkedTotal="checkedTotalAmount"
			:checkedItems="checkedItems"
			@add="goToAddTransaction"
		/>
		<ModalFilter
			v-if="isFilterModalOpen"
			:categories="filteredCategories"
			:selected="selectedCategories"
			:sort="selectedSort"
			@update:selected="selectedCategories = $event"
			@update:sort="selectedSort = $event"
			@close="setFilterModal"
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
import ModalFilter from "@/component/ModalFilter.vue";

const store = getAccountListStore();
const currentTab = ref("지출");
const startDate = ref(dayjs().startOf("month").format("YYYY-MM-DD"));
const endDate = ref(dayjs().endOf("month").format("YYYY-MM-DD"));
const checkedItems = ref([]);
const isFilterModalOpen = ref(false);

// 정렬 기본값: 최신순
const selectedCategories = ref([]);
const selectedSort = ref({
	date: "date-desc",
	amount: "",
});
//데이터
const allData = ref([]);

onMounted(async () => {
	try {
		await store.fetchPageList({ type: currentTab.value });
		allData.value = store.pageList;
	} catch (err) {
		console.error("데이터 불러오기 실패:", err);
	}
});

const handleTabChange = async (tab) => {
	currentTab.value = tab;
	await store.fetchPageList({ type: tab });
	allData.value = store.pageList;
};

const filteredData = computed(() => {
	// let data = allData.value.filter((item) => {
	let data = store.pageList.filter((item) => {
		const date = dayjs(item.date);
		const typeMatch =
			currentTab.value === "전체"
				? true
				: currentTab.value === "수익"
				? item.type === 1
				: item.type === -1;

		const categoryMatch =
			selectedCategories.value.length === 0 ||
			selectedCategories.value.includes(item.category);

		return (
			typeMatch &&
			categoryMatch &&
			date.isSameOrAfter(startDate.value) &&
			date.isSameOrBefore(endDate.value)
		);
	});
	// 정렬 추가
	// 정렬: 날짜
	switch (selectedSort.value.date) {
		case "date-asc":
			data.sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());
			break;
		case "date-desc":
		default:
			data.sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());
	}

	// 금액 정렬 (선택한 경우만)
	if (selectedSort.value.amount) {
		switch (selectedSort.value.amount) {
			case "amount-asc":
				data.sort((a, b) => a.amount - b.amount);
				break;
			case "amount-desc":
				data.sort((a, b) => b.amount - a.amount);
				break;
		}
	}
	return data;
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
		return store.allPageList.filter((item) =>
			dayjs(item.date).isSameOrAfter(sixMonthsAgo)
		);
	} else {
		return filteredData.value;
	}
});

watch([currentTab], () => {
	checkedItems.value = [];
});

watch([startDate, endDate], () => {
	selectedCategories.value = [];
	selectedSort.value = {
		date: "date-desc",
		amount: "",
	};
});

const router = useRouter();
const goToAddTransaction = () => {
	router.push("/account/0000"); // 이 경로는 내가 설정한 페이지로 수정 가능
};

const availableCategories = computed(() => {
	const income = new Set();
	const expense = new Set();

	store.pageList.forEach((item) => {
		if (item.type === 1) income.add(item.category);
		else if (item.type === -1) expense.add(item.category);
	});
	return {
		income: Array.from(income),
		expense: Array.from(expense),
	};
});

const filteredCategories = computed(() => {
	if (currentTab.value === "수익") {
		return { income: availableCategories.value.income, expense: [] };
	} else if (currentTab.value === "지출") {
		return { income: [], expense: availableCategories.value.expense };
	} else {
		return availableCategories.value;
	}
});

const setFilterModal = () => {
	isFilterModalOpen.value = !isFilterModalOpen.value;
};
</script>

<style scoped>
#app {
	height: 100%;
	margin-top: 60px;
	padding-bottom: 50px;
	/* border: 1px solid red; */
}
</style>
