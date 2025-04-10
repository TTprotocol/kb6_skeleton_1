<template>
  <!-- <div class="modal">
		<div class="box">
			<i class="fa-solid fa-x" @click="closeModal" style="cursor: pointer"></i>
			<h1>정보 수정</h1>
			<p>비밀번호 확인</p>
			<input
				type="password"
				v-model="originalpassword"
				placeholder="현재 비밀번호를 입력해주세요."
			/>
			<p>새로운 비밀번호 입력</p>
			<input
				type="password"
				v-model="newpassword"
				placeholder="새로운 비밀번호를 입력해주세요."
			/>
			<p>생년월일</p>
			<div class="birth">
				<select v-model="year">
					<option disabled>년</option>
					<option v-for="item in years" :key="item" :value="item">
						{{ item }}
					</option>
				</select>
				<select v-model="month">
					<option disabled>월</option>
					<option v-for="item in months" :key="item" :value="item">
						{{ item }}
					</option>
				</select>
				<select v-model="day">
					<option disabled>일</option>
					<option v-for="item in days" :key="item" :value="item">
						{{ item }}
					</option>
				</select>
			</div>
			<p>성별</p>
			<select v-model="gender">
				<option>여성</option>
				<option>남성</option>
			</select>
			<button>수정</button>
		</div>
	</div> -->
  <div
    class="modal fade show d-block"
    tabindex="-1"
    style="background-color: rgba(0, 0, 0, 0.4)"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-4">
        <!-- 닫기 버튼 -->
        <div class="d-flex justify-content-end">
          <i
            class="fa-solid fa-x text-muted"
            style="cursor: pointer"
            @click="closeModal"
          ></i>
        </div>

        <h1 class="fs-4 fw-bold text-center mb-3">정보 수정</h1>

        <div class="mb-2">
          <label class="form-label">비밀번호 확인</label>
          <input
            type="password"
            class="form-control"
            style="width: 100%"
            v-model="originalpassword"
            placeholder="현재 비밀번호를 입력해주세요."
          />
        </div>

        <div class="mb-2">
          <label class="form-label">새로운 비밀번호 입력</label>
          <input
            type="password"
            class="form-control"
            style="width: 100%"
            v-model="newpassword"
            placeholder="새로운 비밀번호를 입력해주세요."
          />
        </div>

        <div class="mb-2">
          <label class="form-label">생년월일</label>
          <div class="d-flex justify-content-between">
            <select v-model="year" class="form-select me-1">
              <option disabled>년</option>
              <option v-for="item in years" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
            <select v-model="month" class="form-select me-1">
              <option disabled>월</option>
              <option v-for="item in months" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
            <select v-model="day" class="form-select">
              <option disabled>일</option>
              <option v-for="item in days" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">성별</label>
          <select v-model="gender" class="form-select">
            <option>여성</option>
            <option>남성</option>
          </select>
        </div>

        <button class="btn btn-secondary w-100" @click="submitEdit">
          수정
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref, onMounted, reactive } from 'vue';
import { loginStore } from '@/stores/LoginStore';
const emit = defineEmits(['close']);
const originalpassword = ref('');
const newpassword = ref('');
const year = ref('');
const month = ref('');
const day = ref('');
const gender = ref('');
const years = ref([]);
const months = ref([]);
const days = ref([]);
const store = loginStore();

const my = reactive({ email: '', year: '', month: '', day: '' });

onMounted(async () => {
  console.log('정보를 찾습니다.');
  try {
    await store.getMine();
    console.log('내 정보 찾기 성공');
    my.email = store.myEmail;
    my.year = new Date(store.myBirth).getFullYear();
    my.month = new Date(store.myBirth).getMonth() + 1;
    my.day = new Date(store.myBirth).getDate();
    my.gender = store.myGender;
    year.value = my.year;
    month.value = my.month;
    day.value = my.day;
    gender.value = my.gender;
  } catch (e) {
    console.log(e);
  }
});

const closeModal = () => {
  emit('close');
};

const submitEdit = async () => {
  try {
    const set = await store.settingUser(
      originalpassword.value,
      newpassword.value,
      year.value,
      month.value,
      day.value,
      gender.value
    );
    if (set) console.log('정보 수정 성공');
    await store.getMine();
    const birthDate = new Date(store.myBirth);
    year.value = birthDate.getFullYear();
    month.value = birthDate.getMonth() + 1;
    day.value = birthDate.getDate();
    gender.value = store.myGender;
  } catch (e) {
    console.log('수정 실패');
    console.log(e);
  }
};

onMounted(() => {
  const nowYear = new Date().getFullYear();
  for (let i = 0; i < 100; i++) {
    let date = nowYear - i;
    years.value.push(date);
  }
  for (let i = 1; i < 13; i++) {
    months.value.push(i);
  }
  for (let i = 1; i < 32; i++) {
    days.value.push(i);
  }
});
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  background-color: white;
  border: double 3px gray;
  width: 300px;
  height: 400px;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}

.box h1 {
  font-size: 24px;
  font-weight: 700;
}

i {
  position: absolute;
  top: 16px;
  right: 16px;
}

button {
  border: none;
  border-radius: 10px;
  background-color: #cdcdcd;
  color: white;
  padding: 4px;
  width: 100px;
  margin: 8px;
}

p {
  margin: 4px;
}
input {
  margin: 4px;
  width: 230px;
}
select {
  margin: 4px;
}
</style>
