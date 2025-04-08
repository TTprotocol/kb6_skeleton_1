<template>
  <div id="app">
    <div id="login">
      <div id="login__header">
        <h1>반갑습니다.</h1>
        <br /><br />
        <h1>간편하게&nbsp;</h1>
        <h1 id="login__h1">로그인&nbsp;</h1>
        <h1>해보세요!</h1>
      </div>
      <div style="height: 80px"></div>
      <div id="login__tools">
        <button id="sign__up">
          <img src="@/assets/images/kakaotalk.png" />
        </button>
        <button id="sign__up">
          <img src="@/assets/images/naver.png" />
        </button>
        <button id="sign__up">
          <img src="@/assets/images/google.png" />
        </button>
      </div>
      <div style="height: 48px"></div>
      <div id="login__body">
        <button id="id__login">아이디로 로그인하기</button>
        <br /><br />
        <div id="text__button">
          <p>아직 회원이 아닌가요?&nbsp;&nbsp;</p>
          <router-link id="text__link" to="/signup">회원가입하기</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
#app {
  width: 100%;
  height: 100vh;
  position: relative;
  font-family: 'Noto Sans KR', sans-serif;
}

#login {
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
  background: #fcfcfc;
}

#login__header h1 {
  display: inline;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
}

#login__body p {
  display: inline;
}

#login__h1 {
  color: #809bff;
}

#id__login {
  background-color: rgba(128, 155, 255, 0.75);
  color: white;
  font-weight: 700;
  font-size: 16px;
  border-radius: 10px;
  padding: 16px;
  border: none;
  height: auto;
  width: 500px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

#login__tools {
  display: flex;
  justify-content: center;
}

#sign__up {
  border: none;
  background-color: #fcfcfc;
  margin: 0;
}

#text__link {
  font-weight: bold;
  text-decoration: none;
  color: black;
  text-decoration: underline;
  font-weight: 700;
}

#text__button {
  display: flex;
  justify-content: center;
  margin: 0;
}

img {
  height: 60px;
  width: 60px;
  margin: 0;
}
</style>
