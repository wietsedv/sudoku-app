export const useUpdateDigits = (
  digits: Ref<number[]>,
  givens: Ref<number[]>,
  selection: Ref<Set<number>>,
  history: Ref<ActionHistory>
) => {
  const { updateHistory, recordAction } = useUpdateHistory(history);

  function addDigit(digit: number) {
    for (const i of selection.value) {
      if (givens.value[i] === 0 && digits.value[i] !== digit) {
        recordAction(i, ActionType.Digit, digits.value[i], digit);
        digits.value[i] = digit;
      }
    }
    updateHistory();
  }

  function clearDigits(): boolean {
    let cleared = false;
    for (const i of selection.value) {
      if (givens.value[i] === 0 && digits.value[i] !== 0) {
        recordAction(i, ActionType.Digit, digits.value[i], 0);
        digits.value[i] = 0;
        cleared = true;
      }
    }
    updateHistory();
    return cleared;
  }
  return { addDigit, clearDigits };
};
