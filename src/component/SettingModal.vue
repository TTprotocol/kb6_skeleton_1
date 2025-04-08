<template>
  <div class="modal">
    <div class="box">
      <i class="fa-solid fa-x" @click="closeModal" style="cursor: pointer"></i>
      <h1>정보 수정</h1>
      <p>비밀번호 확인</p>
      <input
        type="password"
        v-model="originalpassword"
        placeholder="현재 비밀번호를 입력해주세요."
      />
      <p>새로운 비밀번호 입력</p>
      <input
        type="password"
        v-model="newpassword"
        placeholder="새로운 비밀번호를 입력해주세요."
      />
      <p>생년월일</p>
      <div class="birth">
        <select v-model="year">
          <option disabled>년</option>
          <option v-for="item in years" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
        <select v-model="month">
          <option disabled>월</option>
          <option v-for="item in months" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
        <select v-model="day">
          <option disabled>일</option>
          <option v-for="item in days" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
      <p>성별</p>
      <select v-model="gender">
        <option>여성</option>
        <option>남성</option>
      </select>
      <button>수정</button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref, onMounted } from 'vue';

const emit = defineEmits(['close']);
const originalpassword = ref('');
const newpassword = ref('');
const year = ref('년');
const month = ref('월');
const day = ref('일');
const gender = ref('여성');
const years = ref([]);
const months = ref([]);
const days = ref([]);

const closeModal = () => {
  emit('close');
};

onMounted(() => {
  const nowYear = new Date().getFullYear();
  for (let i = 0; i < 100; i++) {
    let date = nowYear - i;
    years.value.push(date);
  }
  for (let i = 1; i < 13; i++) {
    months.value.push(i);
  }
  for (let i = 1; i < 32; i++) {
    days.value.push(i);
  }
});
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  background-color: white;
  border: double 3px gray;
  width: 300px;
  height: 400px;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}

.box h1 {
  font-size: 24px;
  font-weight: 700;
}

i {
  position: absolute;
  top: 16px;
  right: 16px;
}

button {
  border: none;
  border-radius: 10px;
  background-color: #cdcdcd;
  color: white;
  padding: 4px;
  width: 100px;
  margin: 8px;
}

p {
  margin: 4px;
}
input {
  margin: 4px;
  width: 230px;
}
select {
  margin: 4px;
}
</style>
