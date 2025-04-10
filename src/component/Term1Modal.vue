<template>
  <div class="term_modal">
    <div class="box">
      <i class="fa-solid fa-x" @click="closeModal" style="cursor: pointer"></i>
      <h1>이용약관</h1>
      <p>
        본 어플은 개인의 자산 관리를 목적으로 제공됩니다. 기록된 데이터는 본인의
        장부 용도로만 사용되며, 해당 정보를 외부에 제공하지 않습니다. 사용자의
        요청 시 언제든지 탈퇴 및 데이터 삭제가 가능합니다.
      </p>
      <button @click="agreeTerm">동의</button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['close', 'agree-term']);

const closeModal = () => {
  emit('close');
};

const agreeTerm = () => {
  emit('agree-term', true);
  emit('close');
};
</script>

<style scoped>
.term_modal {
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
