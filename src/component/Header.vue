<template>
  <div class="header">
    <nav class="nav">
      <router-link to="/main" class="nav-link">홈</router-link>
      <router-link to="/account" class="nav-link">거래내역</router-link>
      <router-link to="/setting" class="nav-link">사용자 설정</router-link>
    </nav>
  </div>
</template>

<script setup></script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  margin-bottom: 30px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 40px;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 16px;
}

.router-link-active {
  color: #f1c500;
  font-weight: bold;
}
</style>
