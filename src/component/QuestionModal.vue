<template>
  <div class="question_modal">
    <div class="box">
      <i class="fa-solid fa-x" @click="closeModal" style="cursor: pointer"></i>
      <ul>
        <li>Github @mizzomi</li>
        <li>Github @ketiHSW</li>
        <li>Github @TTprotocol</li>
        <li>Github @Cho2eunseo</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue';

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
.question_modal {
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
