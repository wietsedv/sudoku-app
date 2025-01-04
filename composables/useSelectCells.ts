export const useSelectCells = (selection: Ref<Set<number>>) => {
  const lastSelection = ref<number>(40);

  function modifierPressed(event: MouseEvent | KeyboardEvent) {
    return event.ctrlKey || event.shiftKey || event.metaKey || event.altKey;
  }

  function mouseDown(event: MouseEvent) {
    if (event.button === 0 && !modifierPressed(event)) {
      selection.value.clear();
    }
    const index = (event.target as HTMLInputElement).getAttribute("index");
    if (index !== null) {
      const i = parseInt(index);
      if ((event.button === 2 || modifierPressed(event)) && selection.value.has(i)) {
        selection.value.delete(i);
      } else {
        selection.value.add(i);
        lastSelection.value = i;
      }
    }
  }

  function mouseOver(event: MouseEvent) {
    if (event.buttons === 0) {
      return;
    }
    const target = event.target as HTMLInputElement;
    if (target.hasAttribute("edge")) {
      return;
    }
    const index = target.getAttribute("index");
    if (index !== null) {
      const i = parseInt(index);
      selection.value.add(i);
      lastSelection.value = i;
    }
  }

  function keyDown(event: KeyboardEvent) {
    let index = null;
    if (event.ctrlKey || event.metaKey) {
      switch (event.code) {
        case "KeyA":
          for (let i = 0; i < 81; i++) {
            selection.value.add(i);
          }
          return;
        default:
          return;
      }
    }
    switch (event.code) {
      case "Escape":
        selection.value.clear();
        return;
      case "KeyW":
      case "ArrowUp":
        index = lastSelection.value - 9;
        break;
      case "KeyA":
      case "ArrowLeft":
        index = lastSelection.value % 9 === 0 ? lastSelection.value + 8 : lastSelection.value - 1;
        break;
      case "KeyS":
      case "ArrowDown":
        index = lastSelection.value + 9;
        break;
      case "KeyD":
      case "ArrowRight":
        index = lastSelection.value % 9 === 8 ? lastSelection.value - 8 : lastSelection.value + 1;
        break;
      default:
        break;
    }
    if (index === null) {
      return;
    } else if (index < 0) {
      index += 81;
    } else if (index > 80) {
      index -= 81;
    }
    if (!modifierPressed(event)) {
      selection.value.clear();
    }
    selection.value.add(index);
    lastSelection.value = index;
  }

  return { mouseDown, mouseOver, keyDown };
};
