<!-- src/components/TransactionTable.vue -->
<template>
	<div class="table-responsive">
		<table class="table table-hover align-middle">
			<thead class="table-light">
				<tr>
					<th scope="col">
						<input type="checkbox" @change="toggleAll" />
					</th>
					<th scope="col">날짜</th>
					<th scope="col">카테고리</th>
					<th scope="col">내용</th>
					<th scope="col" class="text-end">금액</th>
					<th scope="col">메모</th>
				</tr>
			</thead>

			<tbody>
				<tr v-for="(item, index) in data" :key="index">
					<td>
						<input type="checkbox" :value="item" v-model="checkedItems" />
					</td>
					<td>{{ item.date }}</td>
					<td>{{ item.category }}</td>
					<td>{{ item.description }}</td>
					<td
						:class="[
							'text-end',
							props.currentTab === '전체'
								? item.type === 1
									? 'text-primary'
									: 'text-danger'
								: '',
						]"
					>
						{{ item.amount.toLocaleString() }}
					</td>
					<td>{{ item.memo }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
const props = defineProps({
	data: Array,
	currentTab: String,
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
