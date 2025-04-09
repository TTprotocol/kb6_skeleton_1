<!-- CategoryPieChart.vue -->
<template>
  <div class="trend-container">
    <h4 class="trend-title">{{ userName }}님의 소비 트렌드</h4>

    <div class="chart-wrapper">
      <Pie :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
<script setup>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const props = defineProps({
  transactions: Array, // 전체 트랜잭션
  userEmail: String,
  userName: String,
});

// ✅ 현재 날짜에서 "이번 달" 년/월 구하기
const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth(); // 0~11

// ✅ 1. 이번 달 지출만 필터링
const expenses = (props.transactions || []).filter((item) => {
  const date = new Date(item.date);
  return (
    item.type === -1 &&
    item.user === props.userEmail &&
    date.getFullYear() === currentYear &&
    date.getMonth() === currentMonth
  );
});

// ✅ 2. 카테고리별 합산
const categoryTotals = {};
expenses.forEach((item) => {
  categoryTotals[item.category] =
    (categoryTotals[item.category] || 0) + item.amount;
});

// ✅ 3. 차트 데이터 준비
const chartData = {
  labels: Object.keys(categoryTotals),
  datasets: [
    {
      label: '카테고리별 지출',
      data: Object.values(categoryTotals),
      backgroundColor: [
        '#FF6384',
        '#FFCE56',
        '#36A2EB',
        '#8E44AD',
        '#2ECC71',
        '#F39C12',
        '#E74C3C',
        '#3498DB',
        '#95A5A6',
        '#1ABC9C',
      ],
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: '카테고리별 이번 달 지출 비율',
    },
  },
};
</script>

<style scoped>
.trend-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.trend-title {
  text-align: left;
  width: 100%;
  margin-bottom: 10px;
}

.chart-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 300px; /* 💡 차트 크기 조절 */
  margin: 0 auto;
}
</style>
