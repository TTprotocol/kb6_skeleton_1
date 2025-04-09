<template>
  <div>
    <div style="height: 72px"></div>
    <button id="menus__btn" @click="changeModal">공지사항</button>
    <teleport to="#notice_modal">
      <NoticeModal v-if="isModal" @close="isModal = false" />
    </teleport>
    <button id="menus__btn">음</button>
    <button id="menus__btn">정보</button>
    <button id="menus__btn" @click="changeModal4">문의하기</button>
    <teleport to="#question_modal">
      <QuestionModal v-if="isModal4" @close="isModal4 = false" />
    </teleport>
    <button id="menus__btn">설정</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NoticeModal from './NoticeModal.vue';
import QuestionModal from './QuestionModal.vue';

const isModal = ref(false);
const isModal4 = ref(false);

const changeModal = () => {
  isModal.value = true;
};

const changeModal4 = () => {
  isModal4.value = true;
};
</script>

<style scoped>
#menus__btn {
  width: 378px;
  border-radius: 10px;
  background-color: white;
  padding: 16px;
  margin: 4px 0;
  font-size: 16px;
  font-weight: 700;
  border: none;
  text-align: start;
}
button {
  padding: 0;
  margin: 0;
}
</style>
