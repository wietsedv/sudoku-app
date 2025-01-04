<script setup lang="ts">
const selection = defineModel<Set<number>>({ required: true });

const { mouseDown, mouseOver, keyDown } = useSelectCells(selection);

function coords(i: number) {
  return {
    x: (i % 9) * 100,
    y: ((i / 9) >> 0) * 100,
    width: 100,
    height: 100,
  };
}

function edgePath(i: number) {
  const c = i % 9;
  const r = (i / 9) >> 0;
  const x = c * 100;
  const y = r * 100;
  const o = 30;
  const tl = c === 0 || r === 0 ? "" : `M${x} ${y} L${x + o} ${y} L${x} ${y + o} Z`;
  const tr = c === 8 || r === 0 ? "" : `M${x + 100 - o} ${y} L${x + 100} ${y} L${x + 100} ${y + o} Z`;
  const bl = c === 0 || r === 8 ? "" : `M${x} ${y + 100 - o} L${x + o} ${y + 100} L${x} ${y + 100} Z`;
  const br = c === 8 || r === 8 ? "" : `M${x + 100} ${y + 100 - o} L${x + 100} ${y + 100} L${x + 100 - o} ${y + 100} Z`;
  return `${tl} ${tr} ${bl} ${br}`;
}
</script>

<template>
  <g @mousedown.stop="mouseDown" @contextmenu.prevent @mouseover="mouseOver" @keydown.prevent="keyDown" tabindex="-1">
    <rect
      v-for="(_, i) in 81"
      :key="i"
      :index="i"
      v-bind="coords(i)"
      class="fill-transparent"
      :class="{ '!fill-blue-200': selection.has(i) }"
    />
    <path v-for="(_, i) in 81" :key="i" :index="i" edge :d="edgePath(i)" class="fill-transparent" />
  </g>
</template>

<style scoped>
rect,
path {
  pointer-events: fill;
}
</style>
