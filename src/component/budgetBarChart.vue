<template>
  <div style="height: 180px">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const props = defineProps({
  budget: Number,
  usedAmount: Number,
});

const percentUsed = ((props.usedAmount / props.budget) * 100).toFixed(1);

// 차트 데이터: 예산 대비 사용률로 바 1개만 표시
const chartData = {
  labels: [''],
  datasets: [
    {
      label: `지출: ${props.usedAmount.toLocaleString()}원`,
      data: [props.usedAmount],
      backgroundColor: 'rgb(255, 193, 7)', // 지출 강조색
      borderRadius: 10,
      barThickness: 30,
    },
    {
      label: `예산: ${props.budget.toLocaleString()}원`,
      data: [props.budget],
      backgroundColor: 'rgba(230, 230, 230, 1)', // 흐린 배경
      borderRadius: 10,
      barThickness: 30,
    },
  ],
};

const chartOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      min: 0,
      max: props.budget,
      display: false,
      grid: { display: false },
    },
    y: {
      display: false,
    },
  },
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        font: {
          size: 12,
        },
        boxWidth: 12,
      },
    },
    title: {
      display: true,
      text: `이번 달 소비 달성률: ${percentUsed}%`,
      font: {
        size: 24,
        weight: 'bold',
      },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.dataset.label}`;
        },
      },
    },
  },
};
</script>
