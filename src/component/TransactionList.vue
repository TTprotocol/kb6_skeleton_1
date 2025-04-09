<template>
  <div>
    <h4>{{ userName }}님의 최근 거래 내역</h4>
    <div class="button-row">
      <button class="open-modal-btn" @click="showModal = true">+ 추가</button>
    </div>

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
    <TransactionModal
      v-if="showModal"
      :userEmail="props.userEmail"
      @close="showModal = false"
      @submitted="fetchDataAgain"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import TransactionModal from './TransactionModal.vue';
import axios from 'axios';

const emit = defineEmits(['refresh']);
const props = defineProps({
  userEmail: String,
  userName: String,
  transactions: Array,
});

const showModal = ref(false);

const fetchDataAgain = async () => {
  try {
    const res = await axios.get('http://localhost:3000/periodicData');
    emit('refresh', res.data); // 상위에서 처리하도록 전달
  } catch (err) {
    console.error('데이터 다시 불러오기 실패:', err);
  }
};

// 거래 내역 정렬 후 상위 5개만 추출
const recentTransactions = computed(() =>
  (props.transactions || [])
    .filter((t) => t.user === props.userEmail)
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // 최신순
    .slice(0, 5)
);
</script>

<style scoped>
.button-row {
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  margin-bottom: 10px;
}

.open-modal-btn {
  padding: 6px 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

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
