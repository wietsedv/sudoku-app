<script setup lang="ts">
const props = defineProps<{ givens: number[] }>();
const givens = toRef(() => props.givens);

const selection = ref<Set<number>>(new Set());

const empty = computed(() => givens.value.every((el) => el === 0));

const { digits, centerMarks, cornerMarks } = usePersistentState(givens);

const previousActions = ref<ActionList>([]);
const nextActions = ref<ActionList>([]);

watch(
  givens,
  () => {
    previousActions.value = [[]];
    nextActions.value = [];
  },
  { immediate: true }
);

const { keyDown } = useKeyboardInput(givens, digits, centerMarks, cornerMarks, selection, previousActions, nextActions);
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

    <div class="flex justify-between">
      <a :href="'https://www.sudokuwiki.org/sudoku.htm?bd=' + digits.join('')" target="_blank">SudokuWiki Solver</a>
      <SudokuTimer class="right" />
    </div>
  </div>
</template>
