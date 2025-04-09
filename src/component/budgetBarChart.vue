<template>
  <div style="height: 180px">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
<script setup>
import { computed } from 'vue';
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
  transactions: Array,
  userEmail: String,
});

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth(); // 0 ~ 11

const usedAmount = computed(() =>
  (props.transactions || [])
    .filter((item) => {
      const date = new Date(item.date);
      return (
        item.user === props.userEmail &&
        item.type === -1 &&
        date.getFullYear() === currentYear &&
        date.getMonth() === currentMonth
      );
    })
    .reduce((sum, item) => sum + item.amount, 0)
);

const percentUsed = computed(() =>
  ((usedAmount.value / props.budget) * 100).toFixed(1)
);

const chartData = computed(() => ({
  labels: [''],
  datasets: [
    {
      label: `지출: ${usedAmount.value.toLocaleString()}원`,
      data: [usedAmount.value],
      backgroundColor: 'rgb(255, 193, 7)',
      borderRadius: 10,
      barThickness: 30,
    },
    {
      label: `예산: ${props.budget.toLocaleString()}원`,
      data: [props.budget],
      backgroundColor: 'rgba(230, 230, 230, 1)',
      borderRadius: 10,
      barThickness: 30,
    },
  ],
}));

const chartOptions = computed(() => ({
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
      text: `이번 달 소비 달성률: ${percentUsed.value}%`,
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
}));
</script>
