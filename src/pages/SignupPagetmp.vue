<template>
  <div id="app">
    <div id="signup">
      <header>
        <h1>정보를 설정해주세요.</h1>
      </header>
      <form @submit.prevent>
        <main>
          <article>
            <SignupInput
              :id="id"
              :password="password"
              :checkpassword="checkpassword"
            />
            <SignupBirth :years="years" :months="months" :days="days" />
          </article>
          <article>
            <SignupGender :gender="gender" />
            <div id="terms">
              <input type="checkbox" value="term1" v-model="terms" />
              <button id="text__button1" @click="changeModal">약관 1</button>
              <teleport to="#term_modal">
                <Term1Modal v-if="isModal" @close="isModal = false" />
              </teleport>
              <br /><br />
              <input type="checkbox" value="term2" v-model="terms" />
              <button id="text__button2" @click="changeModal2">약관 2</button>
              <teleport to="#term_modal">
                <Term2Modal v-if="isModal2" @close="isModal2 = false" />
              </teleport>
            </div>
          </article>
        </main>
        <section>
          <input
            type="submit"
            value="회원가입"
            id="submit-btn"
            :disabled="!isValid"
          />
        </section>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
// import axios from 'axios';
// import Signup from '@/component/Signup.vue';
// import Term1Modal from '@/component/Term1Modal.vue';
import SignupInput from '@/component/SignupInput.vue';
import SignupBirth from '@/component/SignupBirth.vue';
import SignupGender from '@/component/SignupGender.vue';
import Term1Modal from '@/component/Term1Modal.vue';
import Term2Modal from '@/component/Term2Modal.vue';
const gender = ref('여성');
const year = ref('년');
const month = ref('월');
const day = ref('일');
const years = ref([]);
const months = ref([]);
const days = ref([]);
const id = ref('');
const password = ref('');
const checkpassword = ref('');
const terms = ref([]);
const isModal = ref(false);
const isModal2 = ref(false);

onMounted(() => {
  const nowYear = new Date().getFullYear();
  for (let i = 0; i < 100; i++) {
    let date = nowYear - i;
    years.value.push(date);
  }
  for (let i = 1; i < 13; i++) {
    months.value.push(i);
  }
  for (let i = 1; i < 32; i++) {
    days.value.push(i);
  }
});

const isValid = computed(() => {
  return (
    id.value.trim() != '' &&
    password.value.trim() != '' &&
    checkpassword.value.trim() != '' &&
    password.value === checkpassword.value &&
    year.value !== '년' &&
    month.value !== '월' &&
    day.value !== '일' &&
    gender.value !== '' &&
    terms.value.length === 2
  );
});

// const findIdHandler = async (id) => {
//   let response = await axios.get()
// };
</script>

<style scoped>
#app {
  width: 100%;
  height: 100vh;
  position: relative;
  font-family: 'Noto Sans KR', sans-serif;
}

#signup {
  position: absolute;
  width: 80%;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 48px;
  padding-bottom: 128px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: #fcfcfc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

header h1 {
  display: inline;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
}

main {
  display: flex;
  flex-direction: row;
  gap: 32px;
}

main article {
  flex: 1;
}

#submit-btn {
  position: absolute;
  bottom: 64px;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  border-radius: 10px;
  width: 300px;
  height: 50px;
  background-color: rgba(128, 155, 255, 0.75);
  color: white;
  font-weight: 700;
}

#submit-btn:disabled {
  background-color: #cdcdcd;
  cursor: not-allowed;
}

#terms {
  padding-left: 32px;
  margin: 16px 0;
}

#text__button1 {
  border: none;
  background-color: #fcfcfc;
  text-decoration: underline;
  font-weight: 700;
}

#text__button2 {
  border: none;
  background-color: #fcfcfc;
  text-decoration: underline;
  font-weight: 700;
}
</style>
