<script setup lang="ts">
const time = ref(0);

onMounted(() => {
  setInterval(() => (time.value += 1), 1000);
});
</script>

<template>
  <div class="text-right font-mono">{{ Math.floor(time / 60) }}:{{ (time % 60).toString().padStart(2, "0") }}</div>
</template>
