// type UndoFn<State> = (state: State) => State;
namespace momentoWithFunction {
  type CommandFn<State> = (state: State) => State;

  function createCommandStack<State>(state: State) {
    const stack: string[] = [JSON.stringify(state)];

    return {
      execute(command: CommandFn<State>) {
        const currentState = JSON.parse(stack[stack.length - 1]);
        const newState = command(currentState);
        stack.push(JSON.stringify(newState));
        return newState;
      },

      undo() {
        if (stack.length > 1) {
          stack.pop();
        }
        return JSON.parse(stack[stack.length - 1]);
      },
    };
  }

  const addOne: CommandFn<number> = (state) => state + 1;

  const subtractOne: CommandFn<number> = (state) => state - 1;

  const createSetValue = (value: number): CommandFn<number> => {
    return () => value;
  };

  const setTo42 = createSetValue(42);

  const cStack = createCommandStack(0);
  console.log(cStack.execute(addOne));
  console.log(cStack.undo());
  console.log(cStack.execute(subtractOne));
  console.log(cStack.undo());
  console.log(cStack.execute(setTo42));
  console.log(cStack.undo());
}
