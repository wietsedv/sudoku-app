<script setup lang="ts">
const props = defineProps<{ digits: number[]; givens: number[] }>();

const digits = toRef(() => props.digits);

const { duplicates } = useValidate(digits);

const complete = computed(() => !digits.value.includes(0) && !duplicates.value.includes(true));

function coords(i: number) {
  return {
    x: (i % 9) * 100 + 50,
    y: ((i / 9) >> 0) * 100 + 50,
  };
}
</script>

<template>
  <g>
    <template v-for="(_, i) in 81" :key="i">
      <text
        v-if="digits[i] > 0"
        v-bind="coords(i)"
        :class="{
          'fill-green-600': givens[i] === 0 && complete,
          'fill-blue-600': givens[i] === 0 && !complete && !duplicates[i],
          'fill-red-600': givens[i] === 0 && duplicates[i],
        }"
        >{{ digits[i] }}</text
      >
    </template>
  </g>
</template>

<style scoped>
text {
  font-size: 70px;
  text-anchor: middle;
  dominant-baseline: central;
  transition: all;
}
</style>
