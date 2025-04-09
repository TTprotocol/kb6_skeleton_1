<template>
	<div id="app">
		<main id="main" class="container my-4">
			<section class="section row border p-4">
				<article id="article__header" class="article col-12 mb-3">
					<h2>섹션1</h2>
				</article>
				<article
					id="article__formContainer"
					class="article col-12 card p-4 mb-3"
				>
					<form action="" id="article__form" class="row g-3">
						<div class="col-9 d-flex align-items-center mb-3">
							<label
								for="amount"
								class="form-label me-3 mb-0"
								style="min-width: 80px"
							>
								금액 :
							</label>
							<input
								id="amount"
								type="text"
								class="form-control"
								v-model="item.amountFormat"
								@input="amountFormatter($event)"
							/>
							<img
								src="@/assets/error.png"
								alt=""
								class="warnimage ms-2"
								title="숫자만 입력해 주세요"
							/>
						</div>
						<div class="col-3 d-flex align-items-center mb-3">
							<label
								for="type"
								class="form-label me-3 mb-0"
								style="min-width: 80px"
							>
								분류 :
							</label>
							<div
								class="btn-group"
								role="group"
								aria-label="Income or Expense"
							>
								<input
									type="radio"
									class="btn-check"
									name="type"
									id="btn-income"
									autocomplete="off"
									value="1"
									v-model="item.type"
								/>
								<label
									class="btn btn-outline-success"
									for="btn-income"
									@click="changeType(1)"
								>
									수입
								</label>
								<input
									type="radio"
									class="btn-check"
									name="type"
									id="btn-expense"
									autocomplete="off"
									value="-1"
									v-model="item.type"
								/>
								<label
									class="btn btn-outline-danger"
									for="btn-expense"
									@click="changeType(-1)"
								>
									지출
								</label>
							</div>
						</div>
						<div class="col-3 d-flex align-items-center mb-3">
							<label
								for="category"
								class="form-label me-3 mb-0"
								style="min-width: 80px"
							>
								카테고리 :
							</label>
							<select
								id="category"
								class="form-select w-30"
								v-model="item.selectedCategory"
							>
								<option
									v-for="(category, index) in item.categoryType"
									:value="category"
									:key="index"
								>
									{{ category }}
								</option>
							</select>
						</div>
						<div class="col-9 d-flex align-items-center mb-3">
							<label
								for="description"
								class="form-label me-3 mb-0"
								style="min-width: 80px"
							>
								사용 내역 :
							</label>
							<input
								id="description"
								type="text"
								class="form-control"
								v-model="item.description"
							/>
						</div>
						<div class="col-12 d-flex align-items-center mb-3">
							<label
								for="memo"
								class="form-label me-3 mb-0"
								style="min-width: 80px"
							>
								메모 :
							</label>
							<input
								id="memo"
								type="text"
								class="form-control"
								v-model="item.memo"
							/>
						</div>
						<div class="col-12 d-flex align-items-center mb-3">
							<label
								for="date"
								class="form-label me-3 mb-0"
								style="min-width: 80px"
							>
								날짜 :
							</label>
							<VueDatePicker
								v-model="item.date"
								locale="ko"
								model-type="yyyy-MM-dd"
								auto-apply
								:format="format"
								:enable-time-picker="false"
							/>
						</div>
					</form>
				</article>
				<article
					id="article__button"
					class="col-12 d-flex justify-content-between"
				>
					<button class="btn btn-primary" @click="save">저장</button>
					<button class="btn btn-secondary" @click="router.push('/account')">
						취소
					</button>
				</article>
			</section>
		</main>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { getAccountListStore } from "@/stores/GetAccountListStore.js";
import { reactive } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const router = useRouter();
const currentRoute = useRoute();
const store = getAccountListStore();
const { fetchAllList, fetchCategory, createData, updateData, deleteData } =
	store;
fetchCategory();

let item = reactive({
	amount: 0,
	amountFormat: "0",
	type: 1,
	categoryList: "",
	categoryType: [],
	selectedCategory: "",
	description: "",
	memo: "",
	date: `${new Date().getFullYear}-${
		new Date().getMonth() + 1
	}-${new Date().getDate()}`,
});

const listId = currentRoute.params.id;

// 목록에서 가져온 id로 해당 항목 데이터 조회
const findItem = async () => {
	await fetchAllList();
	if (listId !== undefined || listId !== "0000") {
		const allList = store.allList.filter((item) => item.id === listId)[0];
		const categoryList = store.categoryList;

		if (allList) {
			item.amount = allList.amount;
			item.amountFormat = allList.amount.toLocaleString();
			item.categoryList = categoryList;
			item.categoryType =
				allList.type > 0 ? categoryList.income : categoryList.expense;
			item.type = allList.type;
			item.selectedCategory = allList.category;
			item.description = allList.description;
			item.memo = allList.memo;
			item.date = allList.date;
		}
	} else {
		const categoryList = store.categoryList;
		console.log("categoryList : ", categoryList);

		item.categoryList = categoryList;
		item.categoryType = categoryList.income;
		item.selectedCategory = categoryList.income[0];
	}
};

findItem();

// 금액에 형식을 지정 (1000자리마다 쉼표 추가)
const amountFormatter = (e) => {
	const input = e.target.value;
	const amount = Number(input.replace(/,/g, ""));
	const regex = /^[0-9]*$/g;

	if (regex.test(amount)) {
		console.log("Number(amount) : ", amount);
		item.amount = amount;
		item.amountFormat = amount.toLocaleString();
	} else {
		item.amountFormat = Number(input.replace(/\D/gi, "")).toLocaleString();
	}
};

// 분류의 수입/지출을 변경할 때마다 카테고리 항목을 변경
const changeType = (type) => {
	item.type = type;
	type > 0
		? (item.categoryType = item.categoryList.income)
		: (item.categoryType = item.categoryList.expense);
};

const format = (date) => {
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();

	return `${year}-${month}-${day}`;
};

// 저장 로직
const save = () => {
	console.log("item : ", item);
};
</script>

<style scoped>
.warnimage {
	width: 18px;
	height: 18px;
	position: relative;
}
</style>
