<template>
    <div id="login__form">
      <p>아이디(이메일)</p>
      <input
        type="text"
        :value="userId"
        @input="onIdInput"
        placeholder="아이디를 입력해주세요."
      />
      <p>비밀번호</p>
      <input
        type="password"
        :value="password"
        @input="onPasswordInput"
        placeholder="비밀번호를 입력해주세요."
      />
    </div>
  </template>
  
  <script setup>
  const props = defineProps(['userId', 'password']);
  const emit = defineEmits(['id-change', 'password-change']);
  
  const onIdInput = (event) => {
    emit('id-change', event.target.value);
  };
  
  const onPasswordInput = (event) => {
    emit('password-change', event.target.value);
  };
  </script>
  
  <style scoped>
  #login__form {
    margin: 0 32px;
  }
  #login__form p {
    font-weight: 700;
    margin: 8px 0;
  }
  input {
    margin: 8px 0;
    border: none;
    text-decoration: underline rgb(216, 216, 216);
    background-color: #fcfcfc;
  }
  </style>
  