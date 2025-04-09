<template>
  <div id="app">
    <div id="loginwithid">
      <header>
        <h1>로그인해주세요.</h1>
      </header>
      <form @submit.prevent="submitLogin">
        <main>
          <article>
            <LoginId
              :userId="userId"
              :password="password"
              @id-change="handleIdChange"
              @password-change="handlePasswordChange"
            />
          </article>
        </main>
        <section>
          <input
            type="submit"
            value="로그인"
            id="submit-btn"
            @click="submitLogin"
          />
        </section>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LoginId from '@/component/LoginId.vue';

const userId = ref('');
const password = ref('');

const handleIdChange = (val) => {
  userId.value = val;
};

const handlePasswordChange = (val) => {
  password.value = val;
};

const submitLogin = () => {
  console.log('로그인 시도:', userId.value, password.value);
};
</script>

<style>
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
