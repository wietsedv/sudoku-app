export const useKeyboardInput = (
  givens: Ref<number[]>,
  digits: Ref<number[]>,
  centerMarks: Ref<Set<number>[]>,
  cornerMarks: Ref<Set<number>[]>,
  selection: Ref<Set<number>>,
  history: Ref<ActionHistory>
) => {
  const { addDigit, clearDigits } = useUpdateDigits(digits, givens, selection, history);
  const {
    addMark: addCenterMark,
    clearMarks: clearCenterMarks,
    clearAllMarks: clearAllCenterMarks,
  } = useUpdateMarks(centerMarks, digits, selection, history, ActionType.CenterMark);
  const {
    addMark: addCornerMark,
    clearMarks: clearCornerMarks,
    clearAllMarks: clearAllCornerMarks,
  } = useUpdateMarks(cornerMarks, digits, selection, history, ActionType.CornerMark);

  function keyDown(event: KeyboardEvent) {
    if (selection.value.size === 0) {
      return;
    }
    switch (event.code) {
      case "Digit1":
      case "Digit2":
      case "Digit3":
      case "Digit4":
      case "Digit5":
      case "Digit6":
      case "Digit7":
      case "Digit8":
      case "Digit9":
      case "Numpad1":
      case "Numpad2":
      case "Numpad3":
      case "Numpad4":
      case "Numpad5":
      case "Numpad6":
      case "Numpad7":
      case "Numpad8":
      case "Numpad9":
        const digit = parseInt(event.code.slice(-1));
        if (event.altKey) {
          addDigit(digit);
        } else if ((event.ctrlKey || event.metaKey) && event.shiftKey) {
          const addedCenter = addCenterMark(digit);
          const addedCorner = addCornerMark(digit);
          if (!addedCenter && !addedCorner) {
            clearCenterMarks(digit);
            clearCornerMarks(digit);
          }
        } else if (event.ctrlKey || event.metaKey) {
          if (!addCenterMark(digit)) clearCenterMarks(digit);
        } else if (event.shiftKey || selection.value.size > 1) {
          if (!addCornerMark(digit)) clearCornerMarks(digit);
        } else {
          addDigit(digit);
        }
        break;
      case "Backspace":
      case "Delete":
        if (event.altKey) {
          clearDigits();
        } else if ((event.ctrlKey || event.metaKey) && event.shiftKey) {
          clearAllCenterMarks();
          clearAllCornerMarks();
        } else if (event.ctrlKey || event.metaKey) {
          clearAllCenterMarks();
        } else if (event.shiftKey) {
          clearAllCornerMarks();
        } else {
          if (!clearDigits()) if (!clearAllCornerMarks()) clearAllCenterMarks();
        }
        break;
      default:
        break;
    }
  }
  return { keyDown };
};
