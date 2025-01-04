function getBox(r: number, c: number) {
  return ~~(r / 3) * 3 + ~~(c / 3);
}

export const useValidate = (digits: Ref<number[]>) => {
  const duplicates = computed(() => {
    const duplicates = Array.from({ length: 81 }, () => false);
    for (let digit = 1; digit < 10; digit++) {
      const indices = digits.value.flatMap((d, i) => (d === digit ? i : []));
      for (let i = 0; i < indices.length; i++) {
        for (let j = i + 1; j < indices.length; j++) {
          const a = indices[i];
          const b = indices[j];
          const rowA = ~~(a / 9);
          const rowB = ~~(b / 9);
          const colA = a % 9;
          const colB = b % 9;
          if (rowA === rowB || colA === colB || getBox(rowA, colA) === getBox(rowB, colB)) {
            duplicates[a] = true;
            duplicates[b] = true;
          }
        }
      }
    }
    return duplicates;
  });

  return { duplicates };
};
