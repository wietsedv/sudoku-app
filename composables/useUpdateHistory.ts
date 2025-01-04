export enum ActionType {
  Digit,
  CenterMark,
  CornerMark,
}

interface CellAction {
  index: number;
  type: ActionType;
  before: number[];
  after: number[];
}

export type ActionList = CellAction[][];

export const useUpdateHistory = (previousActions: Ref<ActionList>, nextActions: Ref<ActionList>) => {
  function updateHistory() {
    if (previousActions.value.at(-1)?.length) {
      previousActions.value.push([]);
      nextActions.value = [];
    }
  }

  function recordAction(index: number, type: ActionType, before: number[], after: number[]) {
    previousActions.value.at(-1)?.push({ index, type, before, after });
  }

  return { updateHistory, recordAction };
};
