<template>
  <div id="signup__form">
    <p>성별</p>
    <select :value="gender" @change="changeGender">
      <option>여성</option>
      <option>남성</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['gender']);
const emit = defineEmits(['update-gender']);
const gender = ref('여성');

const changeGender = (e) => {
  gender = e.target.value;
};
</script>

<style scoped>
#signup__form {
  margin: 0 32px;
}

input {
  margin: 8px 0;
  border: none;
  text-decoration: underline rgb(216, 216, 216);
  background-color: #fcfcfc;
}

select {
  margin: 8px 0;
}
</style>
