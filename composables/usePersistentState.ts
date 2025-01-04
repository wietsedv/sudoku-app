export const usePersistentState = (givens: Ref<number[]>) => {
  const digits = ref<number[]>([...givens.value]);
  const centerMarks = ref<Set<number>[]>(Array.from({ length: 81 }, () => new Set()));
  const cornerMarks = ref<Set<number>[]>(Array.from({ length: 81 }, () => new Set()));

  const key = computed(() => `save-${givens.value.join("")}`);

  onMounted(() => {
    watch(
      givens,
      () => {
        const storedState = localStorage.getItem(key.value);
        if (storedState) {
          const state = JSON.parse(storedState);
          digits.value = state.digits;
          centerMarks.value = state.centerMarks.map((array: number[]) => new Set(array));
          cornerMarks.value = state.cornerMarks.map((array: number[]) => new Set(array));
        } else {
          digits.value = [...givens.value];
          centerMarks.value = Array.from({ length: 81 }, () => new Set());
          cornerMarks.value = Array.from({ length: 81 }, () => new Set());
        }
      },
      { immediate: true }
    );
    watch(
      [digits, centerMarks, cornerMarks],
      () => {
        localStorage.setItem(
          key.value,
          JSON.stringify({
            digits: digits.value,
            centerMarks: centerMarks.value.map((set) => Array.from(set)),
            cornerMarks: cornerMarks.value.map((set) => Array.from(set)),
          })
        );
      },
      { deep: true }
    );
  });

  return { digits, cornerMarks, centerMarks };
};
