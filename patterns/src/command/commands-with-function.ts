type UndoFn<State> = (state: State) => State;
type CommandFn<State> = (state: State) => [State, UndoFn<State>];

function createCommandStack<State>(state: State) {
  const stack: UndoFn<State>[] = [];
  let _state = state;

  return {
    execute(command: CommandFn<State>) {
      const [newState, undoFn] = command(_state);

      _state = newState;
      stack.push(undoFn);
      return _state;
    },

    undo() {
      const command = stack.pop();
      if (command) {
        _state = command(_state);
      }
      return _state;
    },
  };
}

const addOne: CommandFn<number> = (state) => [state + 1, (state) => state - 1];
const subtractOne: CommandFn<number> = (state) => [
  state - 1,
  (state) => state + 1,
];

const createSetValue = (value: number): CommandFn<number> => {
  return (state) => {
    const originalValue = state;
    return [value, () => originalValue];
  };
};

const setTo42 = createSetValue(42);

const cStack = createCommandStack(0);
console.log(cStack.execute(addOne));
console.log(cStack.undo());
console.log(cStack.execute(subtractOne));
console.log(cStack.undo());
console.log(cStack.execute(setTo42));
console.log(cStack.undo());
