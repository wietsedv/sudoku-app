<script setup lang="ts">
defineProps<{ marks: Set<number>[]; digits: number[] }>();

function coords(i: number) {
  return {
    x: (i % 9) * 100 + 50,
    y: ((i / 9) >> 0) * 100 + 50,
  };
}
</script>

<template>
  <g>
    <template v-for="(_, i) in 81">
      <text
        v-if="digits[i] === 0 && marks[i].size > 0"
        :key="i"
        v-bind="coords(i)"
        class="fill-blue-600"
        :class="{ small: marks[i].size > 6 }"
        >{{ [...marks[i]].toSorted().join("") }}</text
      >
    </template>
  </g>
</template>

<style scoped>
text {
  font-size: 26px;
  text-anchor: middle;
  dominant-baseline: central;
}

text.small {
  font-size: 18px;
}
</style>
