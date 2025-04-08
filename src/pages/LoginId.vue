<template>
  <div id="app">
    <div id="loginwithid">
      <header>
        <h1>로그인해주세요.</h1>
      </header>
      <form>
        <main>
          <article>
            <!-- <div style="height: 64px"></div> -->
            <div id="login__form">
              <p>아이디</p>
              <input type="text" placeholder="아이디를 입력해주세요." />
              <p>비밀번호</p>
              <input
                type="password"
                v-model="password"
                placeholder="비밀번호를 입력해주세요."
              />
            </div>
          </article>
        </main>
        <section>
          <input type="submit" value="로그인" id="submit-btn" />
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
const gender = ref('여성');
</script>

<style scoped>
#app {
  width: 100%;
  height: 100vh;
  position: relative;
  font-family: 'Noto Sans KR', sans-serif;
}

#loginwithid {
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
}

form {
  margin: auto;
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

#checkid {
  border-radius: 10px;
  padding: 16px;
  border: none;
  background-color: #cdcdcd;
  color: white;
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
