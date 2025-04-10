<template>
  <div class="term2_modal">
    <div class="box">
      <i class="fa-solid fa-x" @click="closeModal" style="cursor: pointer"></i>
      <h1>개인정보처리방침</h1>
      <p>
        1. 수집하는 개인정보 항목: 이메일, 비밀번호, 이름, 생년월일, 성별, 예산
        정보 등 회원가입 시 입력한 정보 2. 개인정보의 수집 및 이용 목적: 본인
        확인 및 사용자 맞춤 기능 제공, 가계부 기록 및 분석 서비스 제공 3.
        개인정보의 보유 및 이용 기간: 회원 탈퇴 시 즉시 파기
      </p>
      <button @click="agreeTerm">동의</button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue';

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

const agreeTerm = () => {
  emit('agree-term', true);
  emit('close');
};
</script>

<style scoped>
.term2_modal {
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
  background-color: rgba(128, 155, 255, 0.75);
  color: white;
  padding: 4px;
  width: 100px;
  margin: 8px;
}

p {
  margin: 4px;
  padding: 4px;
}
input {
  margin: 4px;
  width: 230px;
}
select {
  margin: 4px;
}
</style>
