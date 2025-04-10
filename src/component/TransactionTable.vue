<!-- src/components/TransactionTable.vue -->
<template>
	<div id="table" class="table-responsive" style="height: 100%">
		<table class="table table-hover align-middle table-sm align-middle">
			<thead class="table-light">
				<tr>
					<th scope="col" style="width: 40px">
						<input type="checkbox" @change="toggleAll" />
					</th>
					<th scope="col">날짜</th>
					<th scope="col">카테고리</th>
					<th scope="col">내용</th>
					<th scope="col" class="text-end">금액</th>
					<th scope="col">메모</th>
					<th scope="col">삭제</th>
				</tr>
			</thead>

			<tbody>
				<tr
					v-for="(item, index) in pageData"
					:key="index"
					@click="router.push(`/account/${item.id}`)"
				>
					<td>
						<input type="checkbox" :value="item" v-model="checkedItems" />
					</td>
					<td>{{ item.date }}</td>
					<td>{{ item.category }}</td>
					<td>{{ item.description }}</td>
					<td
						:class="[
							'text-end',
							item.type === 1 ? 'text-primary' : 'text-danger',
						]"
					>
						{{ item.amount.toLocaleString() }}
					</td>
					<td class="text-truncate" style="max-width: 150px">
						{{ item.memo }}
					</td>
					<td>
						<button class="btn btn-danger fw-bold" @click="deleteData(item.id)">
							삭제
						</button>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="d-flex justify-content-around align-items-center mt-3">
			<button
				class="btn btn-outline-primary"
				@click="prevPage"
				:disabled="store.currentPage === 1"
			>
				이전
			</button>
			<span>Page {{ store.currentPage }}</span>
			<button class="btn btn-outline-primary" @click="nextPage">다음</button>
		</div>
	</div>
</template>

<script setup>
import { getAccountListStore } from "@/stores/GetAccountListStore";
import { computed, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = getAccountListStore();
const { fetchAllList, fetchPageList, nextPage, prevPage, deleteData } = store;

fetchAllList();
fetchPageList();

const props = defineProps({
	data: Array,
	currentTab: String,
});

const pageData = computed(() => {
	return store.pageList.sort((a, b) => (a.date > b.date ? -1 : 1));
});

const emit = defineEmits(["update:checkedItems"]);

const checkedItems = defineModel("checkedItems");

// 전체 선택
const toggleAll = (event) => {
	if (event.target.checked) {
		checkedItems.value = [...props.data];
	} else {
		checkedItems.value = [];
	}
};
</script>

<style scoped></style>
