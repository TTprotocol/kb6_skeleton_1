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
      <div id="login__tools"></div>
      <br />
      <div id="login__body">
        <button id="id__login">아이디로 로그인하기</button>
        <br /><br />
        <p>아직 회원이 아닌가요?</p>
        <button id="sign__up">회원가입하기</button>
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
  border: 1px solid red;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
}

#login__header h1 {
  display: inline;
}

#login__body p {
  display: inline;
}

#login__h1 {
  color: #ffff3c;
  text-shadow: 2px 2px rgb(203, 203, 203);
}

#id__login {
  background-color: #ffff3c;
  border-radius: 10px;
  padding: 10px;
  border: none;
}

#sign__up {
  border: none;
  font-weight: bold;
  text-decoration: underline;
  background-color: white;
}
</style>
