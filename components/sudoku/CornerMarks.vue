<script setup lang="ts">
defineProps<{ marks: Set<number>[]; digits: number[] }>();

function coords(i: number, j: number) {
  const x = [20, 80, 20, 80, 50, 50, 20, 80, 35][j];
  const y = [22, 22, 78, 78, 22, 78, 50, 50, 50][j];
  return {
    x: (i % 9) * 100 + x,
    y: ((i / 9) >> 0) * 100 + y,
  };
}
</script>

<template>
  <g>
    <template v-for="(_, i) in 81">
      <template v-if="digits[i] === 0 && marks[i].size > 0">
        <text v-for="(m, j) in [...marks[i]].toSorted()" :key="j" v-bind="coords(i, j)" class="fill-blue-600">{{
          m
        }}</text>
      </template>
    </template>
  </g>
</template>

<style scoped>
text {
  font-size: 24px;
  text-anchor: middle;
  dominant-baseline: central;
}
</style>
