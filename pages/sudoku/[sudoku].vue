<script setup lang="ts">
import { computed } from "vue";

const route = useRoute();
const givens = computed(() => Array.from(route.params.sudoku.toString().replaceAll(".", "0")).map(Number));
</script>

<template>
  <SudokuApp :givens />
</template>
