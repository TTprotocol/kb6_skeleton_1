<template>
	<div class="bg-white rounded shadow-md p-4 mb-4">
		<h3 class="text-lg font-semibold mb-2">카테고리별 {{ tab }} 합계</h3>
		<v-chart :option="chartOptions" class="w-full h-96" autoresize />
	</div>
</template>

<script setup>
import { computed } from "vue";
import { use } from "echarts/core";
import VChart from "vue-echarts";
import {
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	GridComponent,
} from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

use([
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	GridComponent,
	BarChart,
	CanvasRenderer,
]);

const { data, tab } = defineProps({
	data: Array, // filteredData
	tab: String, // currentTab (지출 / 수입 / 전체)
});

// 카테고리별 금액 합계 계산
const categoryTotals = computed(() => {
	const totals = {};
	data.forEach((item) => {
		if (!totals[item.category]) {
			totals[item.category] = 0;
		}
		totals[item.category] += item.amount;
	});
	return totals;
});

// ECharts 옵션 구성
const chartOptions = computed(() => {
	const categories = Object.keys(categoryTotals.value);
	const values = Object.values(categoryTotals.value);

	return {
		tooltip: {
			trigger: "axis",
			axisPointer: { type: "shadow" },
		},
		xAxis: {
			type: "category",
			data: categories,
			axisTick: { alignWithLabel: true },
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				name: "합계",
				type: "bar",
				data: values,
				itemStyle: {
					color: tab === "수입" ? "#4e73df" : "#e74c3c", // 파랑 or 빨강
				},
				label: {
					show: true,
					position: "top",
					formatter: "{c}원",
				},
			},
		],
	};
});
</script>
