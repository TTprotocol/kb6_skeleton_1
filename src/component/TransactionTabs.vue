<!-- src/components/FilterTabs.vue -->
<template>
  <div class="btn-group mb-4">
    <button
      v-for="tab in tabs"
      :key="tab"
      :class="[
        'btn',
        tab === modelValue ? 'btn-primary' : 'btn-outline-primary',
      ]"
      @click="$emit('update:modelValue', tab)"
    >
      {{ tab }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
});
defineEmits(['update:modelValue']);

const tabs = ['지출', '수익', '전체'];
</script>

<style scoped>
.tab {
  padding: 8px 16px;
  margin-right: 8px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
}
.tab.active {
  background: #ddd;
  font-weight: bold;
}
</style>
