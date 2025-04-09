<template>
	<div
		class="footer-bar d-flex justify-between align-items-center px-4 py-2 shadow"
	>
		<div class="footer-text">
			💰 총합: <strong>{{ total.toLocaleString() }}</strong> 원
			<span v-if="checkedItems.length > 0" class="ms-3">
				✅ 선택 합계: <strong>{{ checkedTotal.toLocaleString() }}</strong> 원
			</span>
		</div>
		<div class="ms-auto">
			<button class="btn btn-danger fw-bold" @click="$emit('add')">
				내역 추가
			</button>
		</div>
	</div>
</template>

<script setup>
defineProps({
	total: Number,
	checkedTotal: Number,
	checkedItems: Array,
});

defineEmits(["add"]);
</script>

<style scoped>
.footer-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #f8f9fa; /* Bootstrap bg-light */
	border-top: 1px solid #ddd;
	height: 60px;
	z-index: 100;
}
</style>
