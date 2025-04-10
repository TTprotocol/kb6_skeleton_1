<template>
  <div id="print__user">
    <p style="font-weight: 700">아이디</p>
    <p>{{ my.email }}</p>
    <p style="font-weight: 700">생년월일</p>
    <p>{{ my.year }}년 {{ my.month }}월 {{ my.day }}일</p>
  </div>
</template>

<script setup>
import { loginStore } from '@/stores/LoginStore';
import { reactive, onMounted } from 'vue';

const store = loginStore();
const my = reactive({ email: '', year: '', month: '', day: '' });

onMounted(async () => {
  console.log('정보를 찾습니다.');
  try {
    await store.getMine();
    console.log('내 정보 찾기 성공');
    my.email = store.myEmail;
    my.year = new Date(store.myBirth).getFullYear();
    my.month = new Date(store.myBirth).getMonth() + 1;
    my.day = new Date(store.myBirth).getDate();
    console.log(my);
  } catch (e) {
    console.log(e);
  }
});
</script>

<style scoped>
#print__user {
  padding: 0 48px;
}
</style>
