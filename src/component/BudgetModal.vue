<template>
  <div class="budget_modal">
    <div class="box">
      <i class="fa-solid fa-x" @click="closeModal" style="cursor: pointer"></i>
      <h1>예산 설정하기</h1>
      <input
        type="text"
        v-model.number="newbudget"
        placeholder="새로운 예산을 설정해주세요."
      />
      <button @click="changeBudget">예산 설정하기</button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue';

const newbudget = ref(0);
const emit = defineEmits(['close', 'setting-budget']);

const closeModal = () => {
  emit('close');
};

const changeBudget = () => {
  emit('setting-budget', newbudget.value);
  emit('close');
};
</script>

<style scoped>
.budget_modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 8px;
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
  background-color: rgba(128, 155, 255, 0.75);
  color: white;
  padding: 8px;
  width: auto;
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
