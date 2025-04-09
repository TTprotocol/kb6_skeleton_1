<template>
  <div id="signup__form">
    <p>생년월일</p>
    <select :value="year" @change="handleYearChange">
      <option disabled>년</option>
      <option v-for="year in years" :key="year" :value="year">
        {{ year }}
      </option>
    </select>
    &nbsp;
    <select :value="month" @change="handleMonthChange">
      <option disabled>월</option>
      <option v-for="month in months" :key="month" :value="month">
        {{ month }}
      </option>
    </select>
    &nbsp;
    <select :value="day" @change="handleDayChange">
      <option disabled>일</option>
      <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['years', 'months', 'days']);
const emit = defineEmits(['update-year', 'update-month', 'update-day']);
const year = ref('년');
const month = ref('월');
const day = ref('일');
const handleYearChange = (e) => {
  emit('update-year', e.target.value);
};

const handleMonthChange = (e) => {
  emit('update-month', e.target.value);
};

const handleDayChange = (e) => {
  emit('update-day', e.target.value);
};
</script>

<style scoped>
#signup__form {
  margin: 0 32px;
}

input {
  margin: 8px 0;
  border: none;
  text-decoration: underline rgb(216, 216, 216);
  background-color: #fcfcfc;
}

select {
  margin: 8px 0;
}
</style>
