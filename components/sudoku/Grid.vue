<script setup lang="ts">
defineProps<{ empty?: boolean }>();

let d = "";
for (let i = 0; i <= 900; i += 100) {
  d += `M0 ${i} L900 ${i} M${i} 0 L${i} 900 `;
}

function boxPath(i: number) {
  const x = (i % 3) * 300;
  const y = ((i / 3) >> 0) * 300;
  return `M${x} ${y} L${x + 300} ${y} L${x + 300} ${y + 300} L${x} ${y + 300} Z`;
}
</script>

<template>
  <g :class="{ empty }">
    <path :d />
    <path v-for="(_, i) in 9" :key="i" :d="boxPath(i)" class="box" />
  </g>
</template>

<style scoped>
path {
  stroke-width: 1;
  fill: none;
  stroke: #000;
  pointer-events: none;
}

.empty path {
  stroke: #4b5563;
}

path.box {
  stroke-width: 4;
}
</style>
