export const useUpdateMarks = (
  marks: Ref<Set<number>[]>,
  digits: Ref<number[]>,
  selection: Ref<Set<number>>,
  history: Ref<ActionHistory>,
  actionType: ActionType
) => {
  const { updateHistory, recordAction } = useUpdateHistory(history);

  function addMark(digit: number) {
    let added = false;
    for (const i of selection.value) {
      if (digits.value[i] === 0 && !marks.value[i].has(digit)) {
        const before = [...marks.value[i]];
        marks.value[i].add(digit);
        added = true;
        recordAction(i, actionType, before, [...marks.value[i]]);
      }
    }
    updateHistory();
    return added;
  }

  function clearMarks(digit: number) {
    for (const i of selection.value) {
      if (digits.value[i] === 0 && marks.value[i].has(digit)) {
        const before = [...marks.value[i]];
        marks.value[i].delete(digit);
        recordAction(i, actionType, before, [...marks.value[i]]);
      }
    }
    updateHistory();
  }

  function clearAllMarks(): boolean {
    let cleared = false;
    for (const i of selection.value) {
      if (digits.value[i] === 0 && marks.value[i].size > 0) {
        recordAction(i, actionType, [...marks.value[i]], []);
        marks.value[i].clear();
        cleared = true;
      }
    }
    updateHistory();
    return cleared;
  }

  return { addMark, clearMarks, clearAllMarks };
};
