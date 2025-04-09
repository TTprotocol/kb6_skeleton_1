<template>
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
</template>

<script setup>
import { ref } from 'vue';
import SettingModal from '../component/SettingModal.vue';

const isModal = ref(false);
const changeModal = () => {
  isModal.value = true;
};
</script>

<style scoped>
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
</style>
