<template>
  <div class="sign">
    <form @submit.prevent>
      <main>
        <article>
          <div style="height: 64px"></div>
          <div id="signup__form">
            <p>아이디</p>
            <input
              type="text"
              v-model="id"
              placeholder="아이디를 입력해주세요."
            />
            <div id="idbox"></div>
            <button id="checkid">중복 확인</button>
            <!-- @click="findIdHandler" -->
            <p>비밀번호</p>
            <input
              type="password"
              v-model="password"
              placeholder="비밀번호를 입력해주세요."
            />
            <p>비밀번호 확인</p>
            <input
              type="password"
              v-model="checkpassword"
              placeholder="비밀번호를 확인해주세요."
            />
            <p v-if="password !== checkpassword" style="color: #ff738f">
              비밀번호가 다릅니다.
            </p>
            <p>생년월일</p>
            <select v-model="year">
              <option disabled>년</option>
              <option v-for="item in props.years" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
            &nbsp;
            <select v-model="month">
              <option disabled>월</option>
              <option v-for="item in props.months" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
            &nbsp;
            <select v-model="day">
              <option disabled>일</option>
              <option v-for="item in props.days" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
          </div>
        </article>
        <article>
          <div style="height: 64px"></div>
          <div id="signup__form">
            <p>성별</p>
            <select v-model="gender">
              <option>여성</option>
              <option>남성</option>
            </select>
          </div>
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
              <Ter2Modal v-if="isModal2" @close="isModal2 = false" />
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
</template>

<script setup>
import { ref } from 'vue';
import Term1Modal from './Term1Modal.vue';
const props = defineProps(['years', 'months', 'days']);

const year = ref('년');
const month = ref('월');
const day = ref('일');

const changeModal = () => {
  isModal.value = true;
};
const changeModal2 = () => {
  isModal2.value = true;
};
</script>

<style>
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
select {
  margin: 8px 0;
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
  text-decoration: none;
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
