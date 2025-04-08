<template>
  <div>
    <h3>{{ userName }}님의 거래 내역</h3>
    <ul>
      <li v-for="(item, index) in userTransactions" :key="index">
        {{ item.date }} - {{ item.category }}: {{ item.amount }}원 ({{
          item.description
        }})
      </li>
    </ul>
  </div>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps({
  userEmail: String,
  userName: String,
  transactions: Array,
});

const userTransactions = computed(() =>
  props.transactions.filter((t) => t.user === props.userEmail)
);
</script>
