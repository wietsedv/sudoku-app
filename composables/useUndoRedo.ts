export const useUndoRedo = (
  digits: Ref<number[]>,
  centerMarks: Ref<Set<number>[]>,
  cornerMarks: Ref<Set<number>[]>,
  previousActions: Ref<ActionList>,
  nextActions: Ref<ActionList>
) => {
  function replaceCell(index: number, type: ActionType, values: number[]) {
    switch (type) {
      case ActionType.CenterMark:
        centerMarks.value[index] = new Set(values);
        break;
      case ActionType.CornerMark:
        cornerMarks.value[index] = new Set(values);
        break;
      case ActionType.Digit:
        digits.value[index] = values[0] || 0;
        break;
    }
  }

  function undoAction() {
    previousActions.value.pop();

    const actions = previousActions.value.pop();
    if (actions) {
      for (const cellAction of actions) {
        replaceCell(cellAction.index, cellAction.type, cellAction.before);
      }
      nextActions.value.push(actions);
    }

    previousActions.value.push([]);
  }

  function redoAction() {
    const actions = nextActions.value.pop();
    if (actions) {
      for (const cellAction of actions) {
        replaceCell(cellAction.index, cellAction.type, cellAction.after);
      }
      previousActions.value.pop();
      previousActions.value.push(actions);
      previousActions.value.push([]);
    }
  }

  return { undoAction, redoAction };
};
