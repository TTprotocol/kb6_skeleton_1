<template>
	<div id="app">
		<div id="signup">
			<header>
				<h1>정보를 설정해주세요.</h1>
			</header>
			<form @submit.prevent>
				<main>
					<article>
						<div style="height: 64px"></div>
						<div id="signup__form">
							<div id="idcheck">
								<p>아이디(이메일)</p>
								<p
									id="idcheckmessage"
									v-if="message"
									:class="{
										accept: message === '가입 가능한 아이디입니다.',
										reject: message === '이미 존재하는 아이디입니다.',
									}"
								>
									&nbsp; &nbsp;&nbsp;{{ message }}
								</p>
							</div>
							<div style="display: flex; justify-content: space-between">
								<input
									type="email"
									v-model="id"
									placeholder="아이디를 입력해주세요."
									class="form-control border border-secondary"
									style="width: 65%"
								/>
								<div id="idbox"></div>
								<button id="checkid" @click="checkIdHandler(id)">
									중복 확인
								</button>
							</div>
							<!-- @click="findIdHandler" -->
							<p>비밀번호</p>
							<input
								type="password"
								v-model="password"
								placeholder="비밀번호를 입력해주세요."
								class="form-control border border-secondary"
							/>
							<p>비밀번호 확인</p>
							<input
								type="password"
								v-model="checkpassword"
								placeholder="비밀번호를 확인해주세요."
								class="form-control border border-secondary"
							/>
							<p v-if="password !== checkpassword" style="color: #ff738f">
								비밀번호가 다릅니다.
							</p>
							<p>생년월일</p>
							<!-- <select v-model="year">
								<option disabled>년</option>
								<option v-for="item in years" :key="item" :value="item">
									{{ item }}
								</option>
							</select>
							&nbsp;
							<select v-model="month">
								<option disabled>월</option>
								<option v-for="item in months" :key="item" :value="item">
									{{ item }}
								</option>
							</select>
							&nbsp;
							<select v-model="day">
								<option disabled>일</option>
								<option v-for="item in days" :key="item" :value="item">
									{{ item }}
								</option>
							</select> -->

							<VueDatePicker
								v-model="date"
								locale="ko"
								model-type="yyyy-MM-dd"
								auto-apply
								:format="format"
								:enable-time-picker="false"
							/>
						</div>
					</article>
					<article>
						<div style="height: 64px"></div>
						<div id="signup__form">
							<p>이름</p>
							<input
								type="text"
								v-model="name"
								placeholder="이름을 입력해주세요."
								class="form-control border border-secondary"
							/>
							<p>성별</p>
							<select v-model="gender" class="form-control select">
								<option>여성</option>
								<option>남성</option>
							</select>
							<p>예산 설정(변경 가능)</p>
							<input
								type="text"
								v-model.number="budget"
								placeholder="예산을 입력해주세요."
								class="form-control border border-secondary"
							/>
						</div>
						<div
							id="terms"
							class="mt-5"
							style="display: flex; justify-content: space-between"
						>
							<div>
								<input type="checkbox" value="term1" v-model="terms" />
								<button id="text__button1" @click="changeModal">
									이용약관
								</button>
								<teleport to="#term_modal">
									<Term1Modal
										v-if="isModal"
										@close="isModal = false"
										@agree-term="agreeTerm1"
									/>
								</teleport>
							</div>
							<div>
								<input type="checkbox" value="term2" v-model="terms" />
								<button id="text__button2" @click="changeModal2">
									개인정보처리방침
								</button>
								<teleport to="#term_modal">
									<Term2Modal
										v-if="isModal2"
										@close="isModal2 = false"
										@agree-term="agreeTerm2"
									/>
								</teleport>
							</div>
						</div>
					</article>
				</main>
				<section>
					<button
						type="submit"
						id="submit-btn"
						:disabled="!isValid"
						@click="signupHandler"
					>
						회원가입
					</button>
				</section>
			</form>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
// import axios from 'axios';
import Term1Modal from "@/component/Term1Modal.vue";
import Term2Modal from "@/component/Term2Modal.vue";
import { loginStore } from "@/stores/LoginStore";

const store = loginStore();
const router = useRouter();
const password = ref("");
const checkpassword = ref("");
const date = ref(
	`${new Date().getFullYear()}-${
		new Date().getMonth() + 1
	}-${new Date().getDate()}`
);
const name = ref("");
const gender = ref("여성");
// const years = ref([]);
// const months = ref([]);
// const days = ref([]);
const id = ref("");
const terms = ref([]);
const isModal = ref(false);
const isModal2 = ref(false);
const message = ref("");
const budget = ref("");

// onMounted(() => {
// 	const nowYear = new Date().getFullYear();
// 	for (let i = 0; i < 100; i++) {
// 		let date = nowYear - i;
// 		years.value.push(date);
// 	}
// 	for (let i = 1; i < 13; i++) {
// 		months.value.push(i);
// 	}
// 	for (let i = 1; i < 32; i++) {
// 		days.value.push(i);
// 	}
// });

const changeModal = () => {
	isModal.value = true;
};
const changeModal2 = () => {
	isModal2.value = true;
};

const agreeTerm1 = () => {
	if (!terms.value.includes("term1")) terms.value.push("term1");
};

const agreeTerm2 = () => {
	if (!terms.value.includes("term2")) terms.value.push("term2");
};

const isValid = computed(() => {
	return (
		id.value.trim() != "" &&
		password.value.trim() != "" &&
		checkpassword.value.trim() != "" &&
		password.value === checkpassword.value &&
		// year.value !== "년" &&
		// month.value !== "월" &&
		// day.value !== "일" &&
		date.value !== "" &&
		gender.value !== "" &&
		terms.value.length === 2 &&
		message.value === "가입 가능한 아이디입니다."
	);
});

const checkIdHandler = async (id) => {
	try {
		if (id.length > 0) {
			const response = await store.checkId(id);
			console.log(response);
			if (response) {
				console.log("가입 가능!");
				message.value = "가입 가능한 아이디입니다.";
			} else {
				console.log("가입 불가능!");
				message.value = "이미 존재하는 아이디입니다.";
			}
		}
	} catch (e) {
		console.log(e);
	}
};

const signupHandler = async () => {
	try {
		// const birthStr = `${year.value}-${month.value}-${day.value}`;
		await store.createData(
			{
				email: id.value,
				password: password.value,
				birth: date.value,
				name: name.value,
				budget: budget.value,
				gender: gender.value,
				login: false,
			},
			() => {
				alert("회원가입 성공!");
				router.push("/loginid");
			}
		);
	} catch (e) {
		console.log(e);
	}
};

const format = (date) => {
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();

	return `${year}-${month}-${day}`;
};
</script>

<style scoped>
#app {
	width: 100%;
	height: 95vh;
	position: relative;
	font-family: "Noto Sans KR", sans-serif;
}

#signup {
	position: absolute;
	width: 80%;
	height: auto;
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

#idcheck {
	display: flex;
}

#checkid {
	border-radius: 10px;
	padding: 16px;
	border: none;
	background-color: rgba(128, 155, 255, 0.75);
	color: white;
}

select {
	margin: 8px 0;
}

main {
	display: flex;
	flex-direction: row;
	/* flex-wrap: wrap; */
	gap: 32px;
	justify-content: space-between;
}

article {
	width: 400px;
	justify-content: start;
}

/* main article {
  flex: 1;
} */

#submit-btn {
	/* position: absolute; */
	margin: 0 auto;
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

#submit-btn:disabled {
	background-color: #cdcdcd;
	cursor: not-allowed;
}

#terms {
	padding-left: 32px;
	margin: 16px 0;
}

#text__button1 {
	border: none;
	background-color: #fcfcfc;
	text-decoration: underline;
	font-weight: 700;
}

#text__button2 {
	border: none;
	background-color: #fcfcfc;
	text-decoration: underline;
	font-weight: 700;
}

#idcheckmessage {
	display: flex;
	align-items: flex-end;
}

#idcheckmessage.accept {
	font-size: 14px;
	color: rgb(56, 56, 255);
}

#idcheckmessage.reject {
	font-size: 14px;
	color: rgb(254, 110, 110);
}
</style>
