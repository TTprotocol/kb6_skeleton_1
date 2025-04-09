<template>
	<div class="date-picker flex items-center gap-2 mb-4">
		<input type="date" v-model="start" @input="$emit('update:start', start)" />
		<span>~</span>
		<input type="date" v-model="end" @input="$emit('update:end', end)" />
	</div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
	start: String,
	end: String,
});

const emit = defineEmits(["update:start", "update:end"]);

const start = ref(props.start);
const end = ref(props.end);

watch(
	() => props.start,
	(val) => (start.value = val)
);
watch(
	() => props.end,
	(val) => (end.value = val)
);
</script>

<style scoped>
.date-picker input {
	padding: 6px;
	border: 1px solid #ccc;
	border-radius: 4px;
}
</style>
