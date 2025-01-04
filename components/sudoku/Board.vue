<template>
  <svg viewBox="-4 -4 908 908" class="font-mono max-w-full h-[40rem] w-[40rem] transition-colors">
    <slot />
  </svg>
</template>

<style scoped>
svg {
  pointer-events: all;
}

svg:deep(path) {
  shape-rendering: geometricprecision;
  vector-effect: non-scaling-stroke;
}

svg:deep(text) {
  user-select: none;
  pointer-events: none;
}
</style>
