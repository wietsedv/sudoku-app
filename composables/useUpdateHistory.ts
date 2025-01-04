export enum ActionType {
  Digit,
  CenterMark,
  CornerMark,
}

interface CellAction {
  index: number;
  type: ActionType;
  before: number | number[];
  after: number | number[];
}

export type ActionHistory = CellAction[][];

export const useUpdateHistory = (history: Ref<ActionHistory>) => {
  function updateHistory() {
    if (history.value.at(-1)?.length) {
      history.value.push([]);
    }
  }

  function recordAction(index: number, type: ActionType, before: number | number[], after: number | number[]) {
    history.value.at(-1)?.push({ index, type, before, after });
  }

  return { updateHistory, recordAction };
};
