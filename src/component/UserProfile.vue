<template>
  <div id="my">
    <div id="profile">
      <img src="@/assets/images/character.png" alt="" />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <div id="users">
        <p id="user__name">{{ my.name }}</p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <p
          id="user__info"
          :class="{ female: my.gender === '여성', male: my.gender === '남성' }"
        >
          {{ calAge }}대 {{ my.gender }}
        </p>
      </div>
    </div>
    <i
      class="fa-solid fa-gear"
      style="color: #cdcdcd; font-size: 40px; cursor: pointer"
      @click="changeModal"
    ></i>
    <teleport to="#modal">
      <SettingModal
        v-if="isModal"
        @close="isModal = false"
        @update-user="updateHandler"
      />
    </teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import SettingModal from '@/component/SettingModal.vue';
import { loginStore } from '@/stores/LoginStore';

const store = loginStore();
const isModal = ref(false);
const changeModal = () => {
  isModal.value = true;
};
const my = reactive({
  email: '',
  name: '',
  birth: '',
  gender: '',
  budget: 0,
});

onMounted(async () => {
  console.log('정보를 찾습니다.');
  try {
    await store.getMine();
    console.log('내 정보 찾기 성공');
    my.email = store.myEmail;
    my.name = store.myName;
    my.birth = store.myBirth;
    my.gender = store.myGender;
    my.budget = store.budget;
    console.log(my);
  } catch (e) {
    console.log(e);
  }
});

const calAge = computed(() => {
  const nowyear = new Date().getFullYear();
  const birthyear = new Date(my.birth).getFullYear();
  console.log(birthyear);
  const agearea = nowyear - birthyear + 1;
  return Math.floor(agearea / 10) * 10;
});

const updateHandler = async () => {
  await store.getMine();
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

#user__info.female {
  font-size: 20px;
  font-weight: 700;
  color: #ff738f;
}

#user__info.male {
  font-size: 20px;
  font-weight: 700;
  color: #73ccff;
}

img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
