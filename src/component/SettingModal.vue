<template>
  <div class="modal">
    <div class="box">
      <div class="top">
        <h1>정보 수정</h1>
        <i
          class="fa-solid fa-x"
          @click="closeModal"
          style="cursor: pointer"
        ></i>
      </div>
      <br />
      <p>비밀번호 확인</p>
      <input
        type="text"
        v-model="originalpassword"
        placeholder="현재 비밀번호를 입력해주세요."
      />
      <p>새로운 비밀번호 입력</p>
      <input
        type="text"
        v-model="newpassword"
        placeholder="현재 비밀번호를 입력해주세요."
      />
      <p>생년월일</p>
      <select>
        <option disabled>년</option>
        <option>2020</option>
      </select>
      <select>
        <option disabled>월</option>
        <option>1</option>
      </select>
      <select>
        <option disabled>일</option>
        <option>1</option>
      </select>
      <button>수정</button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue';

const emit = defineEmits(['close']);
const originalpassword = ref('');
const newpassword = ref('');

const closeModal = () => {
  emit('close');
};
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

.top {
  display: flex;
}
</style>
