<template>
  <div id="app">
    <main id="main">
      <section class="section">
        <!-- 꽉 찬 카드 -->
        <div class="card full-width">
          <h2>ㅇㅇㅇ님의 4월 소비 달성률</h2>
        </div>

        <!-- 절반 너비 카드 두 개 -->
        <div class="card-container">
          <div class="card half-width">
            <!-- <h2>ㅇㅇㅇ님의 최근 거래 내역</h2> -->
            <!-- <p>왼쪽 카드입니다.</p> -->
            <TransactionList
              v-if="loginUser"
              :userEmail="loginUser.email"
              :userName="loginUser.name"
              :transactions="state.periodicData"
            />
          </div>
          <div class="card half-width">
            <h2>ㅇㅇㅇ님의 소비 트렌드</h2>
            <!-- <p>오른쪽 카드입니다.</p> -->
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { reactive, computed, provide, onMounted } from 'vue';
import axios from 'axios';
import TransactionList from '@/component/TransactionList.vue';

const state = reactive({
  income: [],
  expense: [],
  users: [],
  periodicData: [],
});

const loginUser = computed(() => state.users.find((u) => u.login === true));

onMounted(async () => {
  try {
    // 수입 카테고리
    const incomeRes = await axios.get(
      'http://localhost:3000/income_categories'
    );
    state.income = incomeRes.data.income;

    // 지출 카테고리
    const expenseRes = await axios.get(
      'http://localhost:3000/expense_categories'
    );
    state.expense = expenseRes.data.expense;

    // 사용자 목록
    const userRes = await axios.get('http://localhost:3000/users');
    state.users = userRes.data;
    console.log(`유저 목록 : ${state.users}`);

    // 정기 데이터
    const periodicRes = await axios.get('http://localhost:3000/periodicData');
    state.periodicData = periodicRes.data;
  } catch (err) {
    console.error('데이터 불러오기 실패:', err);
  }
});
</script>

<style scoped>
#app {
  margin: 10px;
  padding: 10px;
  box-sizing: border-box;
}
#main {
  display: flex;
  justify-content: space-between;
  border: 1px solid blue;
  height: 70vh;
  margin: 10px;
  padding: 10px;
  box-sizing: border-box;
}
.section {
  width: 80%;
  border: 1px solid red;
}
.section {
  padding: 20px;
}

.card {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

/* 꽉 찬 카드 */
.full-width {
  width: 100%;
}

/* 절반 크기 카드 컨테이너 */
.card-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

/* 절반 너비 카드 */
.half-width {
  flex: 1;
  min-width: 300px; /* 반응형 대응 */
}
</style>
