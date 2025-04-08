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
								:value="item.amountFormat"
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
								<label class="btn btn-outline-success" for="btn-income">
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
								<label class="btn btn-outline-danger" for="btn-expense">
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
							<select id="category" class="form-select w-30">
								<option value="">선택하세요</option>
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
							<input id="date" type="text" class="form-control" />
						</div>
					</form>
				</article>
				<article
					id="article__button"
					class="col-12 d-flex justify-content-between"
				>
					<button class="btn btn-primary">저장</button>
					<button class="btn btn-secondary">취소</button>
				</article>
			</section>
		</main>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { getAccountListStore } from "@/stores/GetAccountListStore.js";
import { reactive } from "vue";

const currentRoute = useRoute();
const store = getAccountListStore();

const { fetchAllList, fetchCategory, createData, updateData, deleteData } =
	store;

fetchAllList();

let item = reactive({
	amount: 0,
	amountFormat: "",
	type: "",
	category: "",
	description: "",
	memo: "",
	date: "",
});

const listId = currentRoute.params.id;

const findItem = async () => {
	await store.fetchAllList();
	console.log("store.allList : ", store.allList);
	const temp = store.allList.filter((item) => item.id === listId)[0];
	temp.amount = temp.amount.toLocaleString();
	if (temp) {
		item.amount = temp.amount;
		item.amountFormat = temp.amount.toLocaleString();
		item.type = temp.type;
		item.category = temp.category;
		item.description = temp.description;
		item.memo = temp.memo;
		item.date = temp.date;
	}
};

findItem();
</script>

<style scoped></style>
