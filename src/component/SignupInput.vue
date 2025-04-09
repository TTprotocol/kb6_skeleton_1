<template>
  <div id="signup__form">
    <p>아이디</p>
    <input
      type="text"
      :value="id"
      @input="onIdInput"
      placeholder="아이디를 입력해주세요."
    />
    <div id="idbox"></div>

    <button id="checkid">중복 확인</button>

    <p>비밀번호</p>
    <input
      type="password"
      :value="password"
      @input="onPasswordInput"
      placeholder="비밀번호를 입력해주세요."
    />

    <p>비밀번호 확인</p>
    <input
      type="password"
      :value="checkpassword"
      @input="onCheckpasswordInput"
      placeholder="비밀번호를 확인해주세요."
    />

    <p v-if="password !== checkpassword" style="color: #ff738f">
      비밀번호가 다릅니다.
    </p>
  </div>
</template>

<script setup>
const props = defineProps(['id', 'password', 'checkpassword']);
const emit = defineEmits([
  'update-id',
  'update-password',
  'update-checkpassword',
]);

const onIdInput = (e) => emit('update-id', e.target.value);
const onPasswordInput = (e) => emit('update-password', e.target.value);
const onCheckpasswordInput = (e) => emit('update-password', e.target.value);
</script>

<style scoped>
#signup__form {
  margin: 0 32px;
}

#signup__form p {
  font-weight: 700;
  margin: 8px 0;
}

input {
  margin: 8px 0;
  border: none;
  text-decoration: underline rgb(216, 216, 216);
  background-color: #fcfcfc;
}

#checkid {
  border-radius: 10px;
  padding: 16px;
  border: none;
  background-color: rgba(128, 155, 255, 0.75);
  color: white;
}

#idbox {
  width: 16px;
  display: inline-block;
}
</style>
