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
            <UserProfile />
            <UserInfo />
          </div>
        </article>
        <article>
          <SettingList />
        </article>
      </main>
      <section></section>
    </div>
  </div>
</template>

<script setup>
import UserProfile from '@/component/UserProfile.vue';
import UserInfo from '@/component/UserInfo.vue';
import SettingList from '@/component/SettingList.vue';
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

main {
  display: flex;
  flex-direction: row;
  gap: 32px;
  align-items: center;
}

#settings {
  border-radius: 10px;
  background-color: white;
  height: 312px;
  width: 400px;
}
</style>
