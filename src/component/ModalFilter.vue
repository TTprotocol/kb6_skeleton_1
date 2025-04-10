<template>
  <teleport to="body">
    <div class="modal d-block" tabindex="-1" @click.self="$emit('close')">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">상세 필터링</h5>
            <button type="button" class="btn-close" @click="$emit('close')" />
          </div>
          <div class="modal-body">
            <div v-if="categories.income && categories.expense">
              <div v-if="categories.income.length > 0" class="mb-3">
                <h6 class="fw-bold text-muted">수익</h6>
                <div class="d-flex flex-wrap gap-2 mb-3">
                  <button
                    v-for="cat in categories.income"
                    :key="'income-' + cat"
                    class="btn"
                    :class="
                      isSelected(cat) ? 'btn-primary' : 'btn-outline-secondary'
                    "
                    @click="toggleCategory(cat)"
                  >
                    {{ cat }}
                  </button>
                </div>
              </div>

              <div v-if="categories.expense.length > 0" class="mb-3">
                <h6 class="fw-bold text-muted">지출</h6>
                <div class="d-flex flex-wrap gap-2">
                  <button
                    v-for="cat in categories.expense"
                    :key="'expense-' + cat"
                    class="btn"
                    :class="
                      isSelected(cat) ? 'btn-primary' : 'btn-outline-secondary'
                    "
                    @click="toggleCategory(cat)"
                  >
                    {{ cat }}
                  </button>
                </div>
              </div>
            </div>

            <div v-else>
              <div class="d-flex flex-wrap gap-2">
                <button
                  v-for="cat in categories"
                  :key="cat"
                  class="btn"
                  :class="
                    isSelected(cat) ? 'btn-primary' : 'btn-outline-secondary'
                  "
                  @click="toggleCategory(cat)"
                >
                  {{ cat }}
                </button>
              </div>
            </div>

            <!-- 정렬 옵션 -->
            <div class="mt-4">
              <!-- 날짜 정렬 -->
              <h6 class="fw-bold text-muted">날짜 정렬</h6>
              <div class="d-flex flex-wrap gap-2">
                <button
                  v-for="option in dateSortOptions"
                  :key="option.value"
                  class="btn"
                  :class="
                    localSort.date === option.value
                      ? 'btn-primary'
                      : 'btn-outline-secondary'
                  "
                  @click="localSort.date = option.value"
                >
                  {{ option.label }}
                </button>
              </div>

              <!-- 금액 정렬 -->
              <h6 class="mt-4 fw-bold text-muted">금액 정렬</h6>
              <div class="d-flex flex-wrap gap-2">
                <button
                  v-for="option in amountSortOptions"
                  :key="option.value"
                  class="btn"
                  :class="
                    localSort.amount === option.value
                      ? 'btn-primary'
                      : 'btn-outline-secondary'
                  "
                  @click="localSort.amount = option.value"
                >
                  {{ option.label }}
                </button>
              </div>
            </div>
          </div>

          <div class="modal-footer justify-content-between">
            <button class="btn btn-outline-secondary" @click="reset">
              초기화
            </button>

            <div>
              <button class="btn btn-secondary me-2" @click="$emit('close')">
                닫기
              </button>
              <button class="btn btn-primary" @click="apply">적용</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup>
import { ref, reactive } from 'vue';

const props = defineProps({
  categories: Object,
  selected: Array,
  sort: Object,
});

const localSelected = ref([...props.selected]);
const localSort = ref({
  date: props.sort?.date ?? 'date-desc',
  amount: props.sort?.amount ?? '',
});

const emit = defineEmits(['update:selected', 'update:sort', 'close']);

const dateSortOptions = [
  { label: '날짜 최신순', value: 'date-desc' },
  { label: '날짜 오래된 순', value: 'date-asc' },
];

const amountSortOptions = [
  { label: '금액 높은순', value: 'amount-desc' },
  { label: '금액 낮은순', value: 'amount-asc' },
];

const reset = () => {
  localSelected.value = [];
  localSort.value = {
    date: 'date-desc',
    amount: '',
  };
};

const toggleCategory = (category) => {
  const index = localSelected.value.indexOf(category);
  if (index === -1) {
    localSelected.value.push(category);
  } else {
    localSelected.value.splice(index, 1);
  }
};

const isSelected = (category) => {
  return localSelected.value.includes(category);
};

const apply = () => {
  emit('update:selected', localSelected.value);
  emit('update:sort', localSort.value);
  emit('close');
};

console.log('props.sort:', props.sort);
</script>
