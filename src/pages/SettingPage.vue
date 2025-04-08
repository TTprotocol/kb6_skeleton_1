<template>
  <div id="app">
    <div id="setting">
      <header>
        <h1>마이페이지</h1>
      </header>
      <main>
        <article>
          <div style="height: 72px"></div>
          <div id="settings">
            <div id="my">
              <div id="profile">
                <img src="@/assets/images/kakaotalk.png" alt="" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div id="users">
                  <p id="user__name">은서</p>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <p id="user__info">20대 여성</p>
                </div>
              </div>
              <i
                class="fa-solid fa-gear"
                style="color: #cdcdcd; font-size: 40px; cursor: pointer"
                @click="changeModal"
              ></i>
              <teleport to="#modal">
                <SettingModal v-if="isModal" @close="isModal = false" />
              </teleport>
            </div>
            <div id="print__user">
              <p style="font-weight: 700">아이디</p>
              <p>ex_id</p>
              <p style="font-weight: 700">생년월일</p>
              <p>2000년 9월 13일</p>
            </div>
          </div>
        </article>
        <article>
          <div style="height: 72px"></div>
          <div id="menus">공지사항</div>
          <div id="menus">알림 설정</div>
          <div id="menus">정보</div>
          <div id="menus">문의하기</div>
          <div id="menus">어플리케이션 설정</div>
        </article>
      </main>
      <section></section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SettingModal from '../component/SettingModal.vue';

const password = ref('');
const checkpassword = ref('');
const year = ref('년');
const month = ref('월');
const day = ref('일');
const isModal = ref(false);
const changeModal = () => {
  isModal.value = true;
};
</script>

<style scoped>
#app {
  width: 100%;
  height: 100vh;
  position: relative;
  font-family: 'Noto Sans KR', sans-serif;
}

#setting {
  position: absolute;
  width: 80%;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 48px;
  padding-bottom: 112px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: #fcfcfc;
  display: flex;
}

header h1 {
  display: inline;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
}

#settings {
  border-radius: 10px;
  background-color: white;
  height: 312px;
  width: 400px;
}

main {
  display: flex;
  flex-direction: row;
  gap: 32px;
  /* flex-direction: column; */
  align-items: center;
}

#menus {
  width: 378px;
  border-radius: 10px;
  background-color: white;
  padding: 16px;
  margin: 8px 0;
  font-size: 16px;
  font-weight: 700;
}

#my {
  padding: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#profile {
  display: flex;
  align-items: center;
}

#users {
  display: flex;
  align-items: end;
}

#user__name {
  font-size: 24px;
  font-weight: 700;
}

#user__info {
  font-size: 20px;
  font-weight: 700;
  color: #ff738f;
}

#print__user {
  padding: 0 48px;
}
</style>
