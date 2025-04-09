<template>
	<div class="container mt-4">
		<div class="card shadow">
			<div class="card-header bg-primary text-white fw-bold">
				{{ chartTitle }}
			</div>
			<div class="card-body overflow-x-auto">
				<div class="w-100" style="min-width: 500px; max-width: 100%">
					<v-chart
						ref="chartRef"
						:option="chartOptions"
						style="width: 100%; height: 400px"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { use } from "echarts/core";
import VChart from "vue-echarts";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart, LineChart, PieChart } from "echarts/charts";
import {
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	GridComponent,
} from "echarts/components";
import dayjs from "dayjs";

use([
	CanvasRenderer,
	BarChart,
	LineChart,
	PieChart,
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	GridComponent,
]);

const chartRef = ref(null);

const props = defineProps({
	data: Array,
	tab: String,
});

const chartTitle = computed(() => {
	return props.tab === "전체"
		? "월별 수익/지출 추이"
		: `카테고리별 ${props.tab} 합계`;
});

const expenseCategories = [
	"식비",
	"생활비",
	"의류",
	"교통비",
	"저축",
	"의료비",
	"정기결제",
	"미용",
	"교육",
];
const incomeCategories = ["용돈", "월급", "주식", "이자"];

const chartOptions = computed(() => {
	if (!props.data || props.data.length === 0) return {};

	if (props.tab === "지출") {
		const expenseData = props.data.filter((item) => item.type === -1);
		const grouped = Object.fromEntries(
			expenseCategories.map((cat) => [cat, 0])
		);
		expenseData.forEach((item) => {
			grouped[item.category] += item.amount;
		});

		return {
			xAxis: {
				type: "category",
				data: expenseCategories,
			},
			yAxis: { type: "value" },
			series: [
				{
					name: "지출",
					type: "bar",
					data: expenseCategories.map((cat) => grouped[cat]),
					barCategoryGap: "50%",
					itemStyle: { color: "#FF675B" },
					// 마우스 오버 시
					emphasis: {
						itemStyle: {
							color: "#FF4233",
							borderColor: "#FF4233",
							borderWidth: 6,
							shadowBlur: 13,
							shadowColor: "rgba(255, 99, 87, 0.3)",
						},
					},
					label: {
						show: true,
						position: "top",
						color: "#333",
						fontWeight: "bold",
						formatter: "{c}원",
					},
				},
			],
			tooltip: { trigger: "axis" },
			legend: { data: ["지출"] },
		};
	} else if (props.tab === "수익") {
		const incomeData = props.data.filter((item) => item.type === 1);
		const grouped = Object.fromEntries(incomeCategories.map((cat) => [cat, 0]));
		incomeData.forEach((item) => {
			grouped[item.category] += item.amount;
		});

		return {
			xAxis: { type: "value" },
			yAxis: {
				type: "category",
				data: incomeCategories,
			},
			series: [
				{
					name: "수익",
					type: "bar",
					data: incomeCategories.map((cat) => grouped[cat]),
					barCategoryGap: "50%",
					itemStyle: { color: "#479FFF" },
					emphasis: {
						itemStyle: {
							color: "#057CFF",
							borderColor: "#057CFF",
							borderWidth: 6,
							shadowBlur: 13,
							shadowColor: "rgba(88, 166, 255, 0.3)",
						},
					},
					label: {
						show: true,
						position: "right",
						color: "#333",
						fontWeight: "bold",
						formatter: "{c}원",
					},
				},
			],
			tooltip: { trigger: "axis" },
			legend: { data: ["수익"] },
		};
	} else if (props.tab === "전체") {
		const startMonth = dayjs().subtract(5, "month").startOf("month");
		const months = Array.from({ length: 6 }).map((_, i) =>
			startMonth.add(i, "month").format("YYYY-MM")
		);

		const grouped = {};
		props.data.forEach((item) => {
			const month = dayjs(item.date).format("YYYY-MM");
			if (!grouped[month]) grouped[month] = { income: 0, expense: 0 };
			if (item.type === 1) grouped[month].income += item.amount;
			else if (item.type === -1) grouped[month].expense += item.amount;
		});

		const incomeSeries = months.map((m) => grouped[m]?.income || 0);
		const expenseSeries = months.map((m) => grouped[m]?.expense || 0);

		return {
			xAxis: {
				type: "category",
				data: months,
			},
			yAxis: { type: "value" },
			tooltip: { trigger: "axis" },
			legend: { data: ["수익", "지출"] },
			series: [
				{
					name: "수익",
					type: "line",
					data: incomeSeries,
					itemStyle: { color: "#479FFF" },
					emphasis: {
						focus: "series",
						itemStyle: {
							// color: '#479FFF',
							borderColor: "#057CFF",
							borderWidth: 3,
							shadowBlur: 13,
							shadowColor: "rgba(88, 166, 255, 0.3)",
						}, // 마우스오버 시 점 커짐
					},
				},
				{
					name: "지출",
					type: "line",
					data: expenseSeries,
					itemStyle: { color: "#FF675B" },
					emphasis: {
						focus: "series",
						itemStyle: {
							// color: '#479FFF',
							borderColor: "#FF4233",
							borderWidth: 3,
							shadowBlur: 13,
							shadowColor: "rgba(255, 99, 87, 0.3)",
						}, // 마우스오버 시 점 커짐
					},
				},
			],
		};
	}

	return {};
});

onMounted(() => {
	window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
	window.removeEventListener("resize", handleResize);
});

const handleResize = () => {
	chartRef.value?.resize?.();
};
</script>

<style scoped>
.card-body {
	padding: 1.5rem;
}
</style>
