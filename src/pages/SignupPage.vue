<template>
  <div id="app">
    <div id="signup">
      <header>
        <h1>정보를 설정해주세요.</h1>
      </header>
      <form>

      <main>
        <article>
          <div style="height: 64px"></div>
          <div id="signup__form">
            <p>아이디</p>
            <input type="text" placeholder="아이디를 입력해주세요." />
            <div id="idbox"></div>
            <button id="checkid">중복 확인</button>
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
              <option>2020</option>
            </select>
            &nbsp;
            <select v-model="month">
              <option disabled>월</option>
              <option>1</option>
            </select>
            &nbsp;
            <select v-model="day">
              <option disabled>일</option>
              <option>1</option>
            </select>
          </div>
        </article>
        <article>
          <div style="height: 64px"></div>
          <div id="terms">
            <input type="checkbox" value="term1" /> 약관 1 <br /><br />
            <input type="checkbox" value="term2" /> 약관 2
          </div>
        </article>
      </main>
      <section>
        <input type="submit" value="회원가입" id="submit-btn">회원가입</input>
      </section>
    </form>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const password = ref('');
const checkpassword = ref('');
const year = ref('년');
const month = ref('월');
const day = ref('일');
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

#idbox {
  width: 16px;
  display: inline-block;
}

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
  background-color: #cdcdcd;
  color: white;
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
</style>
