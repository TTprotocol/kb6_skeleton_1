<template>
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
        <input v-model="form.category" placeholder="카테고리" required />
        <input v-model="form.description" placeholder="설명" required />
        <input v-model="form.memo" placeholder="메모" />
        <input v-model="form.date" type="date" required />
        <button type="submit">저장</button>
        <button type="button" @click="$emit('close')">닫기</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
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

console.log(`form.value : ${form.amount}`);

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
</style>
