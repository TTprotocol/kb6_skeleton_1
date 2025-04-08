<template>
  <div>
    <h3>{{ userName }}님의 최근 거래 내역</h3>

    <table v-if="pagedTransactions.length > 0" class="transaction-table">
      <thead>
        <tr>
          <th>날짜</th>
          <th>카테고리</th>
          <th>금액</th>
          <th>설명</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in pagedTransactions" :key="index">
          <td>{{ item.date }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.amount.toLocaleString() }}원</td>
          <td>{{ item.description }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>거래 내역이 없습니다.</p>

    <!-- 페이지네이션 -->
    <div v-if="totalPages > 1" class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">이전</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        다음
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  userEmail: String,
  userName: String,
  transactions: Array,
});

// 전체 필터링된 거래
const userTransactions = computed(() =>
  (props.transactions || []).filter((t) => t.user === props.userEmail)
);

// 페이지네이션
const itemsPerPage = 5;
const currentPage = ref(1);

const totalPages = computed(() =>
  Math.ceil(userTransactions.value.length / itemsPerPage)
);

const pagedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return userTransactions.value.slice(start, start + itemsPerPage);
});

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
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
  background-color: #f2f2f2;
}

.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pagination button {
  padding: 5px 10px;
  cursor: pointer;
}
</style>
