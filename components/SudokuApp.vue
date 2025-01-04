<script setup lang="ts">
const props = defineProps<{ givens: number[] }>();
const givens = toRef(() => props.givens);

const selection = ref<Set<number>>(new Set());

const empty = computed(() => givens.value.every((el) => el === 0));

const { digits, centerMarks, cornerMarks } = usePersistentState(givens);

const history = ref<ActionHistory>([]);

watch(givens, () => (history.value = [[]]), { immediate: true });

const { keyDown } = useKeyboardInput(givens, digits, centerMarks, cornerMarks, selection, history);
</script>

<template>
  <div class="h-screen flex flex-col justify-center content-center p-2" @mousedown="selection.clear()">
    <SudokuBoard class="flex-1 mx-auto" @keydown.prevent="keyDown">
      <SudokuSelection v-model="selection" />
      <SudokuGrid :empty />
      <SudokuCornerMarks :marks="cornerMarks" :digits />
      <SudokuCenterMarks :marks="centerMarks" :digits />
      <SudokuDigits :digits :givens />
    </SudokuBoard>
    <slot />
  </div>
</template>
