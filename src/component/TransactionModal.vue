<template>
  <transition name="fade">
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-content">
        <h3>거래 추가</h3>
        <form @submit.prevent="submitTransaction">
          <input
            v-model="form.amount"
            type="number"
            placeholder="금액"
            required
          />
          <select v-model="form.type" required>
            <option :value="1">수입</option>
            <option :value="-1">지출</option>
          </select>
          <select v-model="form.category" required>
            <option disabled value="">카테고리 선택</option>
            <option
              v-for="(cat, index) in categoryOptions"
              :key="index"
              :value="cat"
            >
              {{ cat }}
            </option>
          </select>
          <input v-model="form.description" placeholder="설명" required />
          <input v-model="form.memo" placeholder="메모" />
          <input v-model="form.date" type="date" required />
          <!-- <button type="submit">저장</button>
        <button type="button" @click="$emit('close')">닫기</button> -->
          <div class="button-group">
            <button type="submit" class="btn primary">저장</button>
            <button type="button" @click="$emit('close')" class="btn secondary">
              닫기
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const emit = defineEmits(['close', 'submitted']);
const props = defineProps({
  userEmail: String,
});

const form = ref({
  amount: '',
  type: 1,
  category: '',
  description: '',
  memo: '',
  user: props.userEmail, // 로그인된 사용자 이메일
  date: '',
});

const categories = ref({ income: [], expense: [] });

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/categories');
    categories.value = res.data;
  } catch (err) {
    console.error('카테고리 불러오기 실패:', err);
  }
});

const categoryOptions = computed(() => {
  return form.value.type === 1
    ? categories.value.income
    : categories.value.expense;
});

const submitTransaction = async () => {
  try {
    console.log('form.value f/: ', form.value);
    await axios.post('http://localhost:3000/periodicData', form.value);
    emit('submitted'); // 부모에게 알려줌
    emit('close'); // 모달 닫기
  } catch (err) {
    console.error('추가 실패:', err);
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 350px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn.primary {
  background-color: #4caf50;
  color: white;
}

.btn.primary:hover {
  background-color: #43a047;
}

.btn.secondary {
  background-color: #e0e0e0;
  color: #333;
}

.btn.secondary:hover {
  background-color: #d5d5d5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
