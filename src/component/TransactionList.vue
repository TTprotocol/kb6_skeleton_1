<template>
  <div>
    <h4>{{ userName }}님의 최근 거래 내역</h4>
    <br />

    <table v-if="recentTransactions.length > 0" class="transaction-table">
      <thead>
        <tr>
          <th>날짜</th>
          <th>카테고리</th>
          <th>금액</th>
          <th>설명</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in recentTransactions" :key="index">
          <td>{{ item.date }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.amount.toLocaleString() }}원</td>
          <td>{{ item.description }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>거래 내역이 없습니다.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  userEmail: String,
  userName: String,
  transactions: Array,
});

// 거래 내역 정렬 후 상위 5개만 추출
const recentTransactions = computed(() =>
  (props.transactions || [])
    .filter((t) => t.user === props.userEmail)
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // 최신순
    .slice(0, 5)
);
</script>

<style scoped>
.transaction-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.transaction-table th,
.transaction-table td {
  border: 1px solid #ccc;
  padding: 8px 12px;
  text-align: left;
}

.transaction-table th {
  background-color: rgb(255, 193, 7);
}
</style>
